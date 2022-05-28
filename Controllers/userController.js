//importing modules

const bcrypt = require("bcrypt");
const db = require("../Models");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const crypto = require("crypto");

// Assigning users to the variable User
const User = db.users;
const Token = db.tokens;

//signing a user up
//hashing users password before its saved to the database with bcrypt
const signup = async (req, res) => {
  try {
    const { userName, email, password, isVerified } = req.body;
    const data = {
      userName,
      email,
      password: await bcrypt.hash(password, 10),
      isVerified,
    };
    //saving the user
    const user = await User.create(data);

    //if user details is captured
    //generate token with the user's id and the secretKey in the env file
    // set cookie with the token generated
    if (user) {
      let setToken = await Token.create({
        userId: user.id,
        token: crypto.randomBytes(16).toString("hex"),
      });

      if (setToken) {
        //send email to the user
        const Transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: process.env.email,
            pass: process.env.emailpassword,
          },
        });

        //message
        let mailing = {
          from: "no-reply@example.com",
          to: `${email}`,
          subject: "Account Verification Link",
          text: `Hello, ${userName} Please verify your email by
                clicking this link :
                http://localhost:8080/api/users/verify-email/${user.id}/${setToken.token} `,
        };

        Transporter.sendMail(mailing, function (err, info) {
          if (err) {
            console.log(err);
          }
          if (info) {
            console.log(`Email sent to ${email} ${info.response}`);
            return res
              .status(200)
              .send(
                "A verification email has been sent to " +
                  email +
                  ". It will be expire after one day. If you not get verification Email click on resend token."
              );
          }
        });
      } else {
        return res.status(400).send("token not created");
      }

      console.log("user", JSON.stringify(user, null, 2));

      //send users details
      return res.status(201).send(user);
    } else {
      return res.status(409).send("Details are not correct");
    }
  } catch (error) {
    console.log(error);
  }
};

//verifying the email
const verifyEmail = async (req, res) => {
  try {
    // const { email } = req.body
    const token = req.params.token;

    //find user by token
    const usertoken = await Token.findOne({
      token,
      where: {
        userId: req.params.id,
      },
    });
    console.log(usertoken);
    if (!usertoken) {
      return res.status(400).send({
        msg: "Your verification link may have expired. Please click on resend for verify your Email.",
      });

      //if token exist, find the user with that token
    } else {
      const user = await User.findOne({ where: { id: req.params.id } });
      if (!user) {
        console.log(user);
        return res.status(401).send({
          msg: "We were unable to find a user for this verification. Please SignUp!",
        });

        //if user is already verified, tell the user to login
      } else if (user.isVerified) {
        return res
          .status(200)
          .send("User has been already verified. Please Login");

        //if user is not verified, change the verified to true
      } else {
        const updated = await User.update(
          { isVerified: true },
          {
            where: {
              id: usertoken.userId,
            },
          }
        );
        console.log(updated);

        //if not updated send error message
        if (!updated) {
          return res.status(500).send({ msg: err.message });
          //else send status of 200
        } else {
          return res
            .status(200)
            .send("Your account has been successfully verified");
        }
      }
    }
  } catch (error) {
    console.log(error);
  }
};

//login authentication

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    //find a user by their email
    const user = await User.findOne({ email });

    console.log(user);
    //if user email is found, compare password with bcrypt
    if (user) {
      //
      const isSame = await bcrypt.compare(password, user.password);

      //if password is the same
      //generate token with the user's id and the secretKey in the env file

      if (isSame) {
        //check if they are verified
        const verified = user.isVerified;
        if (verified) {
          let token = jwt.sign({ id: user.id }, process.env.secretKey, {
            expiresIn: 1 * 24 * 60 * 60 * 1000,
          });

          //if password matches wit the one in the database
          //go ahead and generate a cookie for the user
          res.cookie("jwt", token, {
            maxAge: 1 * 24 * 60 * 60,
            httpOnly: true,
          });
          console.log("user", JSON.stringify(user, null, 2));
          console.log(token);
          //send user data
          return res.status(201).send(user);
        } else {
          return res.status(401).send("User not verified");
        }
      } else {
        return res.status(401).send("Authentication failed");
      }
    } else {
      return res.status(401).send("Authentication failed");
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  signup,
  login,
  verifyEmail,
};
