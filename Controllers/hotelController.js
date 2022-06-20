//importing modules

const db = require("../Models");
const upload = require('../fileUploads/fileUpload')


// Assigning users to the variable User

const Hotel = db.hotels

//function for the adding a hotel

const addHotel = async (req, res) => {
    try {
       const { hotelName, location, website, amenities, about } = req.body

       const data = {
           hotelName,
           location,
           website,
           amenities,
           about,
           images : req.file
       }

       const newHotel = await Hotel.create( data )
       console.log(newHotel)

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