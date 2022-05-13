//importing modules

// const  Sequelize  = require('sequelize')
const {Sequelize, DataTypes} = require('sequelize')
const dbConfig = require('../Config/db.config')


//database connction
const sequelize =  new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    pool :{
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
})

//checking if connection is done

     sequelize.authenticate().then(() => {
         console.log("Database connected")
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
