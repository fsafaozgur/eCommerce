const {Size, Color, Product} = require('../models/Product.js')
const Category = require('../models/Category.js')


const createProduct = async(req, res, next) => {

    try {

        const product = await Product.create(req.body)

        res.status(201).json(product)

    } catch (error) {
        console.log(error)

        res.status(500).json({message: error})
    }

}


const updateProduct = async(req, res, next) => {

    try {

        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, {$set: req.body}, {new:true})

        res.status(200).json(updatedProduct)

    } catch (error) {
        console.log(error)

        res.status(500).json({message: error})
    }

}


const deleteProduct = async(req, res, next) => {

    try {

        await Product.findByIdAndDelete(req.params.id)

        res.status(200).json({message: 'product successfully deleted'})

    } catch (error) {
        console.log(error)

        res.status(500).json({message: error})
    }

}


const getSingleProduct = async(req, res, next) => {

    try {
        const product = await Product.findById(req.params.id)
        res.status(200).json(product)

    } catch (error) {
        res.status(500).json({message: error})
    }

}


const getAllProducts = async(req, res, next) => {
    try {
        const products = await Product.find()
        res.status(200).json(products)
    } catch (error) {
        res.status(500).json({message: error})
    }
} 


const searchProducts = async(req, res, next) => {


       try {

        let products = await Product.find()

        for (let key in req.query) {

                if (key == "category") {


                    const _category = await Category.findOne({slug: req.query[key].toString()})

                    if (!_category) return  res.status(500).json({message: 'category not found'})
                        
                    products = products.filter(product => product.category.toString() === _category._id.toString())

            }
            
                if (key == "color") {

                    const _color = await Color.findOne({name:req.query[key].toString()})

                    if (!_color) return  res.status(500).json({message: 'color not found'})

                    products = products.filter(product => product.colors.includes(_color._id.toString()))

                }
            
                if (key == "size") {

                    const _size = await Size.findOne({name:req.query[key].toString()})

                    if (!_size) return  res.status(500).json({message: 'size not found'})
        
                    products = products.filter(product => product.sizes.includes(_size._id.toString()))
            }

        }




            const _products = await Promise.all(products.map(async (product) => {
                const productColors = await Promise.all(product.colors.map(async (color) => {
                    return await Color.findOne({ _id: color.toString() });
                }));
            
                const productSizes = await Promise.all(product.sizes.map(async (size) => {
                    return await Size.findOne({ _id: size.toString() });
                }));

                const productCategory =  await Category.findOne({ _id: product.category.toString() });
            
                return {
                    id: product._id,
                    name: product.name,
                    description: product.description,
                    slug: product.slug,
                    mrp: product.mrp,
                    isTop: product.isTop,
                    recent: product.recent,
                    sellingPrice: product.sellingPrice,
                    category: productCategory,
                    colors: productColors,
                    sizes: productSizes
                };
            }));

            /*
            res.status(200).json({
                data: products.map(product => ({
                    id: product._id,
                    name: product.name,
                    description: product.description,
                    slug: product.slug,
                    mrp: product.mrp,
                    isTop: product.isTop,
                    recent: product.recent,
                    sellingPrice: product.sellingPrice,
                    category: _category,
                    colors: [_color],
                    sizes: [_size]
                }))
            });*/
            

            res.status(200).json({
                data: _products
            });

    }
    catch (error) {
        res.status(500).json({message: ''})
    }
    
    

}






module.exports = {createProduct, getSingleProduct, getAllProducts, searchProducts, updateProduct, deleteProduct}