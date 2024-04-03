const express = require('express');
const router = express.Router();
const functions = require('../controllers/productsController');

// here i created routes for products and single product
router.get('/:categoryname/products', functions.getTopProducts);
router.get('/:categoryname/products/:productid', functions.productDetails);
module.exports = router;