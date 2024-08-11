const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const checkauth = require('../middleware/authMiddleware');

router.post('/products',checkauth(),productController.createProduct);
router.get('/products', checkauth(),productController.getProducts);
router.get('/products/:id', checkauth(),productController.getProductById);

module.exports = router;
