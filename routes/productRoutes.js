const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/products",authMiddleware('admin'),productController.createProduct);
router.get("/products", productController.getProducts);
router.get("/products/:id", productController.getProductById);

module.exports = router;
