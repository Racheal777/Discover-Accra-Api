const express = require('express')
const { Sequelize, DataTypes} = require('sequelize')
const db = require('../Models')
//

const User = db.users


const saveUser = async (req, res, next) => {

    //search the database to see if user exist
    try {
        const username = await User.findOne({
            where: {
                userName : req.body.userName
            }
        })
        if(username){
            return res.json(409).send('username already taken')
        }
    
        //checking if email already exist
        const emailcheck = await User.findOne({
            where: {
                email: req.body.email
            }
        })
        if(emailcheck){
            return res.json(409).send("Authentication failed")
        }
    
        next() 
         
    } catch (error) {
        console.log(error)
    }
    
}


//exporting module
module.exports = {
    saveUser
}