
//importing modules
const express = require('express')
const sequelize = require('sequelize')
const dotenv = require('dotenv').config()
const cors = require('cors')
 const db = require('./Models')
 const cookieParser = require('cookie-parser')
 const userRoutes = require('./Routes/userRoutes')

//port
const PORT = process.env.PORT || 8080

//express
const app = express()

//middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

db.sequelize.sync({ force: false }).then(() => {
    console.log("db has been re sync")
})


//routes

app.use('/api/users', userRoutes)
//listening to server connection
app.listen(PORT, () => console.log(`Server is connected on ${PORT}`))



