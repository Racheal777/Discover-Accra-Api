//importing modules
const express = require('express')
const hotelController = require('../Controllers/hotelController')
const { addHotel } = hotelController
const upload = require('../fileUploads/fileUpload')

const router = express.Router()

//addhotel endpoint

router.post('/addhotel', upload.array('images'), addHotel)




module.exports = router