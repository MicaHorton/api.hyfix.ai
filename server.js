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
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true }
);

const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

// Define Routers
const productRouter = require('./routes/product');
app.use('/products', productRouter);

const userRouter = require('./routes/user');
app.use(userRouter);

// Listen & Export
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});

module.exports = app;