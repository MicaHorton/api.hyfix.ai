const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const marked = require('marked');
const createDomPurify = require('dompurify');
const { JSDOM } = require('jsdom');
const dompurify = createDomPurify(new JSDOM().window);

const productSchema = new Schema({
    name: { 
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 5
    },
    synopsis: {
        type: String,
        required: true,
        trim: true,
        minlength: 5
    },
    description: {
        type: String,
        required: false,
        trim: true,
        minlength: 5
    },
    markdown: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 5
    },
    sanatizedHtml: {
        type: String,
        required: false,
        unique: true,
        trim: true,
        minlength: 5
    },
    price: {
        type: Number,
        required: true,
        trim: true
    },
    category: {
        type: String,
        required: false
    },
    img: {
        type: String,
        required: false
    }
}, {
    timestamps: true,
});

productSchema.pre('validate', function(next) {    
    if (this.markdown) {
        this.sanatizedHtml = dompurify.sanitize(marked(this.markdown));
    }
    next()
})

const Product = mongoose.model('Product', productSchema);
module.exports = Product;

