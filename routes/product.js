let Product = require('../models/product.model');
const router = require('express').Router();
/*
const fs = require('fs');
const uploadImage = require('../middleware/uploadImage.js');*/


// Normal Routes

router.route('/').get((req, res) => {
  Product.find()
    .then(products => res.json(products))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/single/:id').get((req, res) => {
  Product.findById(req.params.id)
    .then(product => res.json(product))
    .catch(err => res.status(400).json('Error: ' + err));
});


router.route('/category/:category').get((req, res) => {
  //res.send(req.params.category);
  Product.find({ category : req.params.category })
    .then(products => res.json(products))
    .catch(err => res.status(400).json('Error: ' + err)); 
});

// Protected Routes (well, they should be)

router.route('/add').post((req, res) => {
  console.log(req.body);
  console.log(req.file);

  const name = req.body.name;
  const description = req.body.description;
  const price = Number(req.body.price);
  const category = req.body.category;

  /*
  const img = req.file.path;
  var img = fs.readFileSync(req.file.path);
  var encode_img = img.toString('base64');
  var final_img = {
      contentType:req.file.mimetype,
      image:new Buffer(encode_img,'base64')
  }; */

  const newProduct = new Product({
    name,
    description,
    price,
    category
  });

  newProduct.save()
  .then(() => res.json('Product added!'))
  .catch(err => res.status(400).json('Error: ' + err));

});
router.route('/:id').get((req, res) => {
  Product.findById(req.params.id)
    .then(product => res.json(product))
    .catch(err => res.status(400).json('Error: ' + err));
});
router.route('/:id').delete((req, res) => {
  Product.findByIdAndDelete(req.params.id)
    .then(() => res.json('Product deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
  Product.findById(req.params.id)
    .then(product => {
      product.name = req.body.name;
      proudct.description = req.body.description;
      product.price = Number(req.body.price);

      product.save()
        .then(() => res.json('Product updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;