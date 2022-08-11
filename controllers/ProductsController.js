const ProductsService = require('../services/ProductsService');

const getAll = async (_req, res) => {
  const products = await ProductsService.getAll();

  return res.status(200).json(products);
};

const getByPk = async (req, res) => {
  const { id } = req.params;

  const product = await ProductsService.getByPk(id);

  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }

  return res.status(200).json(product);
};

module.exports = {
  getAll,
  getByPk,
};
