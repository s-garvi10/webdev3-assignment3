const validateProductInput = (req, res, next) => {
  const { name, productCode, category, price, quantity, reorderLevel, supplier } = req.body;
  if (req.method === 'POST') {
    if (!name || !productCode || !category || price === undefined || quantity === undefined || reorderLevel === undefined || !supplier) {
      return res.status(400).json({ success: false, message: 'Please provide all required product fields.' });
    }
  }
  next();
};

module.exports = { validateProductInput };