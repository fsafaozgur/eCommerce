const Cart = require('../models/Cart.js')

const createCart = async(req, res, next) => {

    try {
        const cart = await Cart.create(req.body)
        res.status(201).json(cart)

    } catch (error) {
        res.status(500).json({message: error})
    }
}

const deleteCart = async(req, res, next) => {
    try {
        await Cart.findByIdAndDelete(req.params.id)
        res.status(200).json({message: 'car deleted successfully'})
    } catch (error) {
        res.status(500).json({message: error})
    }
}


const getAllCarts = async(req, res, next) => {
    try {
        const carts = await Cart.find()
        res.status(200).json(carts)
    } catch (error) {
        res.status(500).json({message: error})
    }
}

module.exports = {createCart, deleteCart, getAllCarts}