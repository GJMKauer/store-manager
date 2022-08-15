const ProductsService = require('../services/ProductsService');

const getAllProducts = async (_req, res) => {
  const products = await ProductsService.getAllProducts();

  return res.status(200).json(products);
};

const getProductByPk = async (req, res) => {
  const { id } = req.params;

  const product = await ProductsService.getProductByPk(id);

  return res.status(200).json(product);
};

const createProduct = async (req, res) => {
  const { name } = req.body;

  const { insertId } = await ProductsService.createProduct(name);

  return res.status(201).json({ id: insertId, name });
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  await ProductsService.updateProduct(id, name);
  const product = await ProductsService.getProductByPk(id);

  return res.status(200).json(product);
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;

  await ProductsService.deleteProduct(id);

  return res.status(204).send();
};

module.exports = {
  getAllProducts,
  getProductByPk,
  createProduct,
  updateProduct,
  deleteProduct,
};
