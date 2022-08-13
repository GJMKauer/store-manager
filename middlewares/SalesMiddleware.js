const ProductsModel = require('../models/ProductsModel');
const SalesService = require('../services/SalesService');

const productIdValidations = async (req, res, next) => {
  const salesList = req.body;

  const allProducts = await ProductsModel.getAllProducts();

  const nullProductId = salesList.every((sale) => sale.productId);

  const validProductId = salesList
    .filter((sale) => sale.productId > allProducts[allProducts.length - 1].id);
  
  if (!nullProductId) {
    return res.status(400).json({ message: '"productId" is required' });
  }

  if (validProductId.length) {
    return res.status(404).json({ message: 'Product not found' });
  }

  next();
};

const quantityValidations = async (req, res, next) => {
  const salesList = req.body;

  const nullQuantity = salesList.every((sale) => sale.quantity || sale.quantity <= 0);

  const invalidQuantity = salesList.every((sale) => sale.quantity > 0);

  if (!nullQuantity) {
    return res.status(400).json({ message: '"quantity" is required' });
  }

  if (!invalidQuantity) {
    return res.status(422).json({ message: '"quantity" must be greater than or equal to 1' });
  }

  next();
};

const saleValidations = async (req, res, next) => {
  const { id } = req.params;

  const sale = await SalesService.getSaleByPk(id);

  if (!sale.length) {
    return res.status(404).json({ message: 'Sale not found' });
  }

  next();
};

module.exports = {
  productIdValidations,
  quantityValidations,
  saleValidations,
};