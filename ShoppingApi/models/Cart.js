const mongoose = require('mongoose')

const Cart = new mongoose.Schema({

    quantity: {
        type: Number,
        required:true
    },
    
    amount: {
        type: Number,
        required:true
    },

    size: {
        type: String,
        required:true
    },

    color:{
        type:mongoose.Schema.Types.ObjectId, 
        ref:'Color'
    },

    product:{
        type:mongoose.Schema.Types.ObjectId,
         ref:'Product'
    },

    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }

})



module.exports = mongoose.model('Cart', Cart)