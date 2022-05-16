//importing modules

const bcrypt = require('bcrypt')
const { Sequelize, DataTypes} = require('sequelize')
const db = require('../Models')
const { generateToken } = require('../Helpers/userHelpers')
const cookieParser = require('cookie-parser')
const userConfig = require('../Config/authConfig')
const jwt = require('jsonwebtoken')


//

const User = db.users

//signing a user up
const signup = async (req, res) => {
    try {
        const { userName, email, password } = req.body
        const data = {
            userName,
            email,
            password : await bcrypt.hash(password, 10)
        }
        const user = await User.create(data)  
        
        //if user details is captured
        //generate token and set cookie
        if(user){
            let token = jwt.sign({ id : user.id },userConfig.secret, {
                expiresIn: 1 * 24 * 60 * 60 * 1000
            })
            // const token = generateToken(user.id)
            res.cookie('jwt', token, { maxAge: 1 * 24 * 60 * 60 , httpOnly: true})
                console.log('user', JSON.stringify(user, null, 2))
                console.log(token)
         return res.status(201).send(user)

            
        }else{
            return res.status(409).send('Details are not correct')
        }
    } catch (error) {
        console.log(error)
    }
    
}

//login

const login = async (req, res) => {

    try {
        const { email, password } = req.body

        const user = await User.findOne({ email })

        //if user email is found, compare password
        if(user){
            const isSame = await bcrypt.compare(password, user.password)

            if(isSame){
                let token = jwt.sign({ id : user.id },userConfig.secret, {
                    expiresIn: 1 * 24 * 60 * 60 * 1000
                })
                // const token = generateToken(user.id)
                //if password matches wit the one in the database
        //go ahead and generate a cookie for the user
                res.cookie('jwt', token, { maxAge: 1 * 24 * 60 * 60 , httpOnly: true})
                    console.log('user', JSON.stringify(user, null, 2))
                    console.log(token)
             return res.status(201).send(user)  
            }else{
                return res.status(401).send('Authentication failed')
            }
        }else{
            return res.status(401).send('Authentication failed')
        }
        
       
        
    } catch (error) {
      console.log(error)  
    }
}


module.exports = {
    signup,
    login
}