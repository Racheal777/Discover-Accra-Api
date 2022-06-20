//importing modules
const multer = require('multer')
const db = require("../Models");
const upload = require('../fileUploads/fileUpload')


// Assigning users to the variable User

const Hotel = db.hotels

//function for the adding a hotel

const addHotel = async (req, res) => {
    // console.log("req.file",req)
    try {
       const { hotelName, location, website, amenities, about, images } = req.body
        
       const data = {
           hotelName,
           location,
           website,
           amenities,
           about,
           images
           
       }
       
       const newHotel = await Hotel.create( data )
       console.log(newHotel)
       console.log("data",data)
       console.log("req.body",req.body)
       console.log("heyyyaaaa", req.file)

    //    const saveHotel = await newHotel.create()
    //    console.log(saveHotel)
        
       res.status(201).send(newHotel)
    } catch (error) {
        console.log(error)
    }
}



module.exports = {
    addHotel
}