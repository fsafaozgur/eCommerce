const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const User = require('../models/User.js')
const jwt = require('jsonwebtoken')

const SignUp = async(req, res, next) => {

    try {

        const {password, email} = req.body

        const user = await User.findOne({email: email})

        if (user) return res.status(500).json({message: 'user has already created'})

        if (password.length < 6) res.status(500).json ({message: 'password is too short'});
        const hashedPassword = await bcrypt.hash(password, 12)

        const newUser = await User.create({...req.body, password:hashedPassword})

        const token = await jwt.sign({id:newUser._id, isAdmin: newUser.isAdmin}, process.env.SECRET, {expiresIn:"1h"})

        res.cookie("token", token, {httpOnly:true}).status(201).json({
            token,
            newUser
        })

    } catch (error) {
        res.status(500).json({message: error})
    }
}


const Login = async(req, res, next) => {

    try {

        const {password, email} = req.body

        const user = await User.findOne({email: email})
        if (!user) return res.status(500).json({message: 'user not found'})

        const validPassword = await bcrypt.compare(password, user.password)

        if (!validPassword) return res.status(500).json({message: 'password is not correct'})

        const token = await jwt.sign({id:user._id, isAdmin: user.isAdmin}, process.env.SECRET, {expiresIn:"1h"})

        res.cookie("token", token, {httpOnly:true}).status(200).json({
            token,
            user
        })

    } catch (error) {
        res.status(500).json({message: error})
    }
}


module.exports = {SignUp, Login}
