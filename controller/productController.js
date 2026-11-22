const Product = require('../model/Product');

const createProduct = async (req, res, next) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (err) {
    next(err);
  }
};


const getProducts = async (req, res, next) => {
  try {
    const { category, sortBy, page = 1, limit = 10 } = req.query;

    const filter = category ? { category } : {};

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const sortOption = sortBy ? { [sortBy]: 1 } : { createdAt: -1 };

    const products = await Product.find(filter)
      .sort(sortOption)
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Product.countDocuments(filter);

    res.json({
      total,
      page: parseInt(page),
      totalPages: Math.ceil(total / parseInt(limit)),
      count: products.length,
      products
    });
  } catch (err) {
    next(err);
  }
};
const getProductById = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      res.status(404);
      throw new Error('Product not found');
    }
    res.json(product);
  } catch (err) {
    next(err);
  }
};

const updateProduct = async (req, res, next) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id, 
      req.body, 
      { new: true, runValidators: true }
    );
    if (!product) {
      res.status(404);
      throw new Error('Product not found');
    }
    res.json(product);
  } catch (err) {
    next(err);
  }
};

const deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      res.status(404);
      throw new Error('Product not found');
    }
    res.json({
      message: 'Product deleted',
      id: product._id
    });
  } catch (err) {
    next(err);
  }
};

const updateStock = async (req, res, next) => {
  try {
    const { change } = req.body; 
    if (change === undefined || typeof change !== 'number') {
      res.status(400);
      throw new Error('A valid numeric "change" value is required');
    }

    const product = await Product.findById(req.params.id);
    if (!product) {
      res.status(404);
      throw new Error('Product not found');
    }

    const newQuantity = product.quantity + change;
    if (newQuantity < 0) {
      res.status(400);
      throw new Error('action failed: quantity cannot drop below zero');
    }

    product.quantity = newQuantity;
    await product.save();

    res.json({
      message: 'Stock updated',
      product
    });
  } catch (err) {
    next(err);
  }
};
const getLowStockReport = async (_, res, next) => {
  try {
    
    const lowStockItems = await Product.aggregate([
      {
        $match: {
          $expr: { $lte: ["$quantity", "$reorderLevel"] }
        }
      }
    ]);

    res.json({
      count: lowStockItems.length,
      lowStockItems
    });
  } catch (err) {
    next(err);
  }
};

const getCategorySummary = async (_, res, next) => {
  try {
    const summary = await Product.aggregate([
      {
        $group: {
          _id: "$category",
          totalItems: { $sum: 1 },
          totalQuantity: { $sum: "$quantity" },
          totalStockValue: { $sum: { $multiply: ["$price", "$quantity"] } },
          avgPrice: { $avg: "$price" }
        }
      }
    ]);

    res.json({
      categories: summary.length,
      summary
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  updateStock,
  getLowStockReport,
  getCategorySummary
};