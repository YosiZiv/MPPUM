const { Product } = require('../models');
const { validateProductInput } = require('../core/validation/product');
exports.createProduct = async (req, res, next) => {
  const {
    user: { _id: userId },
    body,
  } = req;
  const errors = validateProductInput(req.body);

  if (Object.keys(errors).length) {
    return res.status(403).json({ errors });
  }
  const newProduct = await new Product({
    ...body,
    userId,
  });

  await newProduct
    .save()
    .then(dbProduct => {
      if (!dbProduct) {
        errors.global = 'something went wrong :/';
        return res.status(400).json();
      }
      res
        .status(200)
        .json({ product: newProduct, message: 'product create success' });
    })
    .catch(error => {
      console.log(error);
      errors.global = 'something went wrong :/';
      return res.status(500).json({ errors });
    });
};

exports.getProductsByUserId = (req, res, next) => {
  const {
    user: { _id: userId },
  } = req;
  const errors = {};
  Product.find({ userId })
    .then(products => {
      if (!products) {
        errors.global = 'User Has No Products';
        return res.status(400).json({ errors });
      }
      return res.status(201).json({ products });
    })
    .catch(err => {
      if (err) {
        errors.global = 'something went wrong';
        return res.status(400).json({ errors });
      }
    });
};

exports.getProductById = (req, res, next) => {
  const { user: { _id: userId }, params:{ productId } }
  const errors = {};
  findById(productId).then((product) => { 
    if (!product) {
      errors.global = 'No such product';
      
    }
    return res.status(200).json({ product });
   }).catch((err) => { });
};

exports.deleteProduct = async (req, res, next) => {
  const {
    params: { productId },
    user: { _id: userId },
  } = req;
  const errors = {};
  const condition = { _id: productId, userId };
  const update = { $set: { isDelete: true } };
  Product.findOneAndUpdate(condition, update, (err, deletedProduct) => {
    if (err) {
      errors.global = 'Something went wrong while deleting the product';
      return res.status(400).json({ errors });
    }
    return res.status(200).json({ msg: 'Product is deleted', deletedProduct });
  });
};
