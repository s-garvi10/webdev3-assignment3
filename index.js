const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const productRoutes = require('./routes/productRoutes');
const errorHandler = require('./middleware/errorHandler');
dotenv.config();

// connect to MongoDB
connectDB();

const app = express();

//middleware
app.use(express.json());

app.use('/api/products', productRoutes);

app.get('/', (_, res) => {
  res.send('Inventory and Data Management API is running...');
});

app.use(errorHandler);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});