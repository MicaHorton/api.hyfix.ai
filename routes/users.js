const router = require('express').Router();
const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
router.use(cookieParser());
require('dotenv').config();

const handleErrors = (err) => {
    console.log(err.message, err.code);
    let errors = { email: '', password: '' };

    // Email is not registered
    if (err.message === 'incorrect email') {
    errors.email = 'That email is not registered';
    }

    // Incorrect password
        if (err.message === 'incorrect password') {
             errors.password = 'That password is incorrect';
        }

    return errors;
}

const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
        return jwt.sign({ id }, process.env.TOKEN_SECRET, {
        expiresIn: maxAge
    });
};

router.post('/login', async (req, res) => {
    console.log('hello');
    const { email, password } = req.body;
    try {
        const user = await User.login(email, password);
        const token = createToken(user._id);

        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
        res.send(token);
        res.status(201).json({ user: user._id });
        console.log(token);

    } catch (err) {
        const errors = handleErrors(err);
        res.status(400).json({ errors });
    }

});

module.exports = router;