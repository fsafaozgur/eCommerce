const mongoose = require('mongoose')

const db = () => {

    mongoose.connect(process.env.MONGODB_URI)
    .then(() =>{
        console.log('successfully connected to mongodb')
    })
    .catch((error)=>{
        console.log(error)
    })

} 




module.exports = db;