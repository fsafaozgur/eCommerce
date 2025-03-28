const mongoose = require('mongoose')





const category = new mongoose.Schema({


    name:{
        type:String,
        required: true
    },
    slug:{
        type:String,
        required:true,
        unique:true
    },
    image:{
        type:String,
        required:true
    },

    image:{type: mongoose.Schema.Types.ObjectId, ref:"ProductImage"},


})





module.exports = mongoose.model('Category', category)