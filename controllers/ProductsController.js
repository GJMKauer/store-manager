const ProductsService = require('../services/ProductsService');

const getAllProducts = async (_req, res) => {
  const products = await ProductsService.getAllProducts();

  return res.status(200).json(products);
};

const getProductByPk = async (req, res) => {
  const { id } = req.params;

  const product = await ProductsService.getProductByPk(id);

  if (Array.isArray(product)) {
    return res.status(404).json({ message: 'Product not found' });
  }

  return res.status(200).json(product);
};

const createProduct = async (req, res) => {
  const { name } = req.body;

  const newProduct = await ProductsService.createProduct(name);

  return res.status(201).json({ id: newProduct.insertId, name });
};

module.exports = {
  getAllProducts,
  getProductByPk,
  createProduct,
};
