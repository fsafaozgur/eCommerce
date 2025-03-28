const express = require('express')
const {createCart, deleteCart, getAllCarts} = require('../controllers/CartController.js')
const {verifyUser} = require('../middleware/verify.js')


const router = express.Router()

router.post('/createCart', verifyUser, createCart)
router.delete('/deleteCart/:id', verifyUser, deleteCart)
router.get('/getAllCarts', verifyUser, getAllCarts)



module.exports = router