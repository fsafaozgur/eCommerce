const Category = require('../models/Category.js')




const createCategory = async(req, res, next) => {
    try {
        const category = await Category.create(req.body)
        res.status(201).json({category})
    } catch (error) {
        res.status(500).json({message: error})
    }
}


const deleteCategory = async(req, res, next) => {
    try {
        await Category.findByIdAndDelete(req.params.id)
        res.status(200).json({message: 'category successfully deleted'})
    } catch (error) {
        res.status(500).json({message: 'fail to delete'})

    }


}


const updateCategory = async(req, res, next) => {
    try {
        await Category.findByIdAndUpdate(req.params.id, {$set: req.body}, {new:true})
        res.status(200).json({message: 'category successfully updated'})
    } catch (error) {
        res.status(500).json({message: 'fail to update'})

    }


}


const getSingleCategory = async(req, res, next) => {
    try {
        const category = await Category.findById(req.params.id)
        res.status(200).json(category)
    } catch (error) {
        res.status(500).json({message: error})

    }


}



const getAllCategory = async(req, res, next) => {
    try {
        const categories = await Category.find()
        res.status(200).json(categories)
    } catch (error) {
        res.status(500).json({message: error})

    }

}


module.exports = {createCategory, deleteCategory, updateCategory, getSingleCategory, getAllCategory}