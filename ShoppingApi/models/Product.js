const mongoose = require('mongoose')


const Size = new mongoose.Schema({

    name:{
        type:String,
        required:true
    }

})

const Color = new mongoose.Schema({

    name:{
        type:String,
        required:true
    }   
    
})


const ProductImage = new mongoose.Schema({

    url:{
        type:String,
        required:true
    }   
    
})



const Product = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    slug:{
        type:String,
        required:true
    },
    mrp:{
        type:Number,
        required:true
    },
    isTop:{
        type:Boolean,
        required:true
    },
    recent:{
        type:Boolean,
        required:true
    },
    sellingPrice:{
        type:Number,
        required:true
    },



    images:[{type: mongoose.Schema.Types.ObjectId, ref:"ProductImage"}],

    category:{type: mongoose.Schema.Types.ObjectId, ref:"Category"},

    colors:[{type: mongoose.Schema.Types.ObjectId, ref:"Color"}],

    sizes:[{type: mongoose.Schema.Types.ObjectId, ref:"Size"}],

})


module.exports = {
    Size: mongoose.model("Size", Size),
    Color: mongoose.model("Color", Color),
    Product: mongoose.model("Product", Product),
    ProductImage: mongoose.model("ProductImage", ProductImage)
};