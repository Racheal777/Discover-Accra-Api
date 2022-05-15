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
// db.users = require('./userModel') (sequelize, DataTypes)

module.exports = db

