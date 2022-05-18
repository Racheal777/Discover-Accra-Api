//importing modules

// const  Sequelize  = require('sequelize')
const {Sequelize, DataTypes} = require('sequelize')
const { dialect } = require('../Config/db.config')
const dbConfig = require('../Config/db.config')
const dotenv = require('dotenv').config()



//database connction
// const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
//     host: dbConfig.HOST,
//     Port: dbConfig.PORT,
//     dialect: dbConfig.dialect,
//     pool: {
//       max: dbConfig.pool.max,
//       min: dbConfig.pool.min,
//       acquire: dbConfig.pool.acquire,
//       idle: dbConfig.pool.idle
//     }
//   });

  const sequelize = new Sequelize(`postgres://postgres:${dbConfig.PASSWORD}@localhost:5433/discover`, {dialect: "posgres"})
//checking if connection is done


     sequelize.authenticate().then(() => {
         console.log(`Database connected to `)
     }).catch((err) => {
         console.log(err)
     })
    
     const db = {}

     db.Sequelize = Sequelize
     db.sequelize = sequelize

//connecting to model
db.users = require('./userModel') (sequelize, DataTypes)
db.hotels = require('./hotelModel') (sequelize, DataTypes)
db.restaurants = require('./dinerModel') (sequelize, DataTypes)
db.adventure = require('./adventureModel') (sequelize, DataTypes)
db.reviews = require('./reviews') (sequelize, DataTypes)
// db.users = require('./userModel') (sequelize, DataTypes)


//relationship
db.users.hasMany(db.reviews,{
  as: "review",
  foreignKey: "userId"
})

db.reviews.belongsTo(db.users, {
  as:  "user",
  foreignKey: "userId"
})

//hotel relationship
db.hotels.hasMany(db.reviews,{
  as: "review",
  foreignKey: "hotelId"
})

db.reviews.belongsTo(db.hotels, {
  as:  "hotel",
  foreignKey: "hotelId"
})

//restaurant relationship
db.restaurants.hasMany(db.reviews,{
  as: "review",
  foreignKey: "restaurantId"
})

db.reviews.belongsTo(db.restaurants, {
  as:  "restaurant",
  foreignKey: "restaurantId"
})

//adventure relationship
db.adventure.hasMany(db.reviews,{
  as: "review",
  foreignKey: "adventureId"
})

db.reviews.belongsTo(db.adventure, {
  as:  "adventure",
  foreignKey: "adventureId"
})

module.exports = db

