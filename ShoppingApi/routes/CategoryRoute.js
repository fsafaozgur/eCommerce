const express = require('express')
const {createCategory, deleteCategory, updateCategory, getSingleCategory, getAllCategory} = require('../controllers/CategoryController.js')
const {verifyAdmin} = require('../middleware/verify.js')

const router = express.Router()


router.post('/createCategory', verifyAdmin, createCategory)
router.delete('/deleteCategory/:id', verifyAdmin, deleteCategory)
router.put('/updateCategory/:id', verifyAdmin, updateCategory)
router.get('/getSingleCategory/:id', getSingleCategory)
router.get('/getAllCategory', verifyAdmin, getAllCategory)

module.exports = router