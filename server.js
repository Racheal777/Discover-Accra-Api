
//importing modules
const express = require('express')
const sequelize = require('sequelize')
const dotenv = require('dotenv').config()
const cors = require('cors')
 const db = require('./Models')

//port
const PORT = process.env.PORT || 8080

//express
const app = express()

//middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// db.sequelize.sync({ force: false }).then(() => {
//     console.log("db has been re sync")
// })

//listening to server connection
app.listen(PORT, () => console.log(`Server is connected on ${PORT}`))




