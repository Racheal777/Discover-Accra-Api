//importing modules
const express = require('express')
const multer = require('multer')
const hotelController = require('../Controllers/hotelController')
const { addHotel } = hotelController
// const upload = require('../fileUploads/fileUpload')

const router = express.Router()

//addhotel endpoint
const storage = multer.diskStorage({
    destination: function (req, file, cb){
        cb(null,'public/uploads')
    },
    filename: function(req, file, cb){
        const uniqueSuffix = file.originalname
        cb(null, file.fieldname + uniqueSuffix)
        console.log(uniqueSuffix)
        console.log(file)
    },

})

const upload = multer({storage})

router.post('/addhotel', upload.array("images"), addHotel)




module.exports = router