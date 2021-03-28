const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

// Connection Settings
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Open Connection
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }
);

const connection = mongoose.connection;
connection.once('open', () => {
    console.log('MongoDB database connection established successfully');
})

// Define Routers
const productRouter = require('./routes/products');
app.use('/products', productRouter);

const userRouter = require('./routes/users');
app.use('/users', userRouter);

const paymentRouter = require('./routes/payment');
app.use('/payment', paymentRouter);

// Listen & Export
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});

module.exports = app;