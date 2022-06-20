//importing modules
const express = require('express')
const multer = require('multer')

//const upload = multer({dest: '../uploads'})

//multer function
// const uploading = async(req, res)



  //creating a function that accept another function
  //this function contains the destination the file should be saved
  //the destination requires a function which takes in req, fild and cb as 
  //parameters
  //the cb parameter takes in error and destination of the file 
//   const Storage = multer.diskStorage({
      
//     destination: function(req, file, cb) {
//       cb(null, '../uploads')  
//     },
    
//     //filename is the name of the file that will be saved
//     //the name will be saved in a variabe generated with math.random
//     filename: function(req, file, cb) {
       
//        const unique = file.originalname
//        console.log(unique)
//        cb(null, file.fieldname + unique)
   

//     console.log(file)
//     console.log('im running')
//     }
//   })

//   // after you are done with the function, you put it in the storage destination
//   //thus the file will be saved with it filename using the storage function

//   const upload = multer({storage: Storage})

//   console.log("upload", upload)


// module.exports = upload


const storage = multer.diskStorage({
    destination: function (req, file, cb){
        cb(null,'../uploads')
    },
    filename: function(req, file, cb){
        const uniqueSuffix = file.originalname
        cb(null, file.fieldname + uniqueSuffix)
        console.log(uniqueSuffix)
        


    },

})

const upload = multer({storage})

 module.exports = upload