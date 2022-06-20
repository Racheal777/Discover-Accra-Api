
//importing modules
const express = require('express')
const sequelize = require('sequelize')
const dotenv = require('dotenv').config()
const cookieParser = require('cookie-parser')
const helmet = require('helmet')
 const db = require('./Models')
 const multer = require('multer')
 const userRoutes = require ('./Routes/userRoutes')
 const hotelRoutes = require('./Routes/hotelRoutes')
 

//setting up your port
const PORT = process.env.PORT || 8070

//assigning the variable app to express
const app = express()

//middleware
app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(helmet())



//synchronizing the database and forcing it to false so we dont lose data
db.sequelize.sync({ force: true }).then(() => {
    console.log("db has been re sync")
})

//routes for the user API
app.use('/api/users', userRoutes)

//hotel routes
app.use('/api/hotels', hotelRoutes)



//listening to server connection
app.listen(PORT, () => console.log(`Server is connected on ${PORT}`))



