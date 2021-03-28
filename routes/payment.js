require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_SECRET);
const router = require('express').Router();
let Product = require('../models/product.model');

router.route('/public-key').get((req, res) => {
    res.json({ publicKey: process.env.STRIPE_PUBLIC_KEY });
});

router.route('/create-payment-intent').post(async (req, res) => {
    const products = req.body.products;

    let product;
    let amount = 0;
    for (product of products) {
            amount += product.price;
    }
    amount = Math.round(amount * 100);

    const options = {
            amount: amount,
            currency: 'USD'
    }

    try {
            const paymentIntent = await stripe.paymentIntents.create(options);
            res.json(paymentIntent);
    } catch (err) {
            res.json(err);
    }

});

module.exports = router;

