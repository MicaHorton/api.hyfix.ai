let Product = require('../models/product.model')
const router = require('express').Router()

const mongoose = require('mongoose')
var db = mongoose.connection
const stripe = require('stripe')(process.env.STRIPE_SECRET)

// let checkAdmin = require('../middleware/checkAdmin');
// require('dotenv').config();j

// Normal Routes
router.route('/').get(async (req, res) => {
    const prices = await stripe.prices.list()

    // Connect price object to product object
    // const new_prices = await Promise.all(prices.data.map(async price => {
    //     const product_object = await stripe.products.retrieve(price.product);
    //     price.product_object = product_object;
    //     return price;
    // }))

    const products = await Promise.all(
        prices.data.map(async (price) => {
            const product = await stripe.products.retrieve(price.product)
            product.price = price
            return product
        })
    )

    res.json(products)
})

// router.route('/:id').get(async (req, res) => {
//     await stripe.products.retrieve(req.params.id)
//         .then(product => res.json(product))
//         .catch(err => res.status(400).json('Error: ' + err));
// });

// router.route('/price/:id').get(async (req, res) => {
//     await stripe.prices.list({ product: req.params.id })
//         .then(price => res.json(price))
//         .catch(err => res.status(400).json('Error: ' + err));
// });

/*// Protected Routes
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

module.exports = router
