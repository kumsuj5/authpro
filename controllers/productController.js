const Product = require('../models/product');

// Save a new product
exports.createProduct = async (req, res) => {
    console.log(req.body)
    try {
        const product = new Product({
            name: req.body.name,
            price: req.body.price,
            description: req.body.description
        });
        const savedProduct = await product.save();
        res.status(201).json({message: 'product created successfully' ,savedProduct});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all products
exports.getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a single product by ID
exports.getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ message: 'Product not found' });
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
