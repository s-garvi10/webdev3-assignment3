const express = require('express');
const router = express.Router();
const {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  updateStock,
  getLowStockReport,
  getCategorySummary
} = require('../controller/productController');
const { validateProductInput } = require('../middleware/validate');

router.get('/low-stock', getLowStockReport);
router.get('/summary', getCategorySummary);

router.route('/')
  .get(getProducts)
  .post(validateProductInput, createProduct);

module.exports = router;