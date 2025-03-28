const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser');
require("dotenv").config();
const path = require('path');
const db = require('./config/db.js')
const categoryRoute = require('./routes/CategoryRoute.js')
const productRoute = require('./routes/ProductRoute.js')
const authRoute = require('./routes/AuthRoute.js')
const cartRoute = require('./routes/CartRoute.js')




const app = express()


app.use(bodyParser.json())
app.use(cors())
app.use(cookieParser());
app.use(express.json())

db();

app.use('/', categoryRoute)
app.use('/', productRoute)
app.use('/', authRoute)
app.use('/', cartRoute)



//public/upload klasörüne client tarafından /upload olarak ulaşıp resim görüntelemek için
app.use('/upload', express.static(path.join(__dirname, 'public/upload')));



const PORT = 5000
app.listen(PORT, (err) => {
    if (!err) console.log('server is runnig on port', PORT)
})
