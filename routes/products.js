let Product = require('../models/product.model');
const router = require('express').Router();
const mongoose = require('mongoose');
var db = mongoose.connection;
let checkAdmin = require('../middleware/checkAdmin');
require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_SECRET);


// Normal Routes
router.route('/').get(async (req, res) => {
    await stripe.products.list({ limit: 10 })
        .then(products => {
            console.log(products);
            res.json(products);
        })
        .catch(err => res.status(400).json('Error: ' + err)); 
});

router.route('/:id').get(async (req, res) => {
    await stripe.products.retrieve(req.params.id)
        .then(product => res.json(product))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/price/:id').get(async (req, res) => {
    await stripe.prices.list({ product: req.params.id })
        .then(price => res.json(price))
        .catch(err => res.status(400).json('Error: ' + err)); 
});


/*
router.route('/category/:category').get((req, res) => {
    Product.find({ category : req.params.category })
        .then(products => res.json(products))
        .catch(err => res.status(400).json('Error: ' + err)); 
});


// Protected Routes 
router.route('/').post(checkAdmin, (req, res, next) => {
    const name = req.body.name;
    const synopsis = req.body.synopsis;
    const markdown = req.body.markdown;
    const price = Number(req.body.price);
    const category = req.body.category;
    const img = req.body.image;

    const newProduct = new Product({
        name,
        synopsis,
        markdown,
        price,
        category,
        img
    });

    newProduct.save()
    .then(() => res.json('Product added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').post(checkAdmin, (req, res, next) => {
    Product.findById(req.params.id)
        .then(product => {
            const name = req.body.name;
            const synopsis = req.body.synopsis;
            const markdown = req.body.markdown;
            const price = Number(req.body.price);
            const category = req.body.category;
            const img = req.body.image;

            product.save()
                .then(() => res.json('Product updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete(checkAdmin, (req, res, next) => {
    Product.findByIdAndDelete(req.params.id)
        .then(() => res.json('Product deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
});
*/

module.exports = router;

/*
router.route('/cart').get(async (req, res) => {
    const productList = req.query.products;

    // Attempt 1, also only gets one for each
    Product.find({'_id': { $in: productList }})
        .then(products => res.json(products))
        .catch(err => res.status(400).json('Error: ' + err));

    // Attempt 2
    let productID;
    let pendingProducts = productList.map(productID => {
        return Product.findById(productID)
            .then(product => {
                console.log(product);
                return product;
            })
            .catch(err => console.log(err));
    })

    await Promise.all(pendingProducts).then(fetchedProducts => {
        res.json(fetchedProducts);
        console.log('fetched products', fetchedProducts);
    })
    
});*/

// Boards (boards), INS Systems (ins), Survey Systems (survey)