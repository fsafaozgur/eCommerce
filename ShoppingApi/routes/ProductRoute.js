const express = require('express')
const {createProduct, getSingleProduct, getAllProducts, searchProducts, updateProduct, deleteProduct} = require('../controllers/ProductController.js')
const {verifyAdmin} = require('../middleware/verify.js')

const router = express.Router()


router.post('/createProduct', verifyAdmin, createProduct)
router.get('/getSingleProduct/:id', getSingleProduct)
router.get('/getAllProducts', getAllProducts)
router.get('/searchProducts', searchProducts)
router.put('/updateProduct/:id', verifyAdmin, updateProduct)
router.delete('/deleteProduct/:id', verifyAdmin, deleteProduct)




module.exports = router