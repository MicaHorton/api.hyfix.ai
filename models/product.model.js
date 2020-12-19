const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    name: { 
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 5
    },
    description: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 5
    },
    price: {
        type: Number,
        required: true,
        trim: true
    },
    img: {
        type: String,
        required: false
    }
}, {
    timestamps: true,
});

const Product = mongoose.model('Product', productSchema);
module.exports = Product;

/*
img: {
    data: buffer,
    contentType: string
}
*/