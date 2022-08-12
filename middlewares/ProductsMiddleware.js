const ProductsService = require('../services/ProductsService');

const getProductByPkValidations = async (req, res, next) => {
  const { id } = req.params;

  const product = await ProductsService.getProductByPk(id);

  if (Array.isArray(product)) {
    return res.status(404).json({ message: 'Product not found' });
  }

  next();
};

const createProductValidations = async (req, res, next) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ message: '"name" is required' });
  }

  if (name.length < 5) {
    return res.status(422).json({ message: '"name" length must be at least 5 characters long' });
  }

  next();
};

module.exports = {
  getProductByPkValidations,
  createProductValidations,
};