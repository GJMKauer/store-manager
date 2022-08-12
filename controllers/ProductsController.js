const ProductsService = require('../services/ProductsService');

const getAll = async (_req, res) => {
  const products = await ProductsService.getAll();

  return res.status(200).json(products);
};

const getByPk = async (req, res) => {
  const { id } = req.params;

  const [product] = await ProductsService.getByPk(id);

  if (product.length === 0) {
    return res.status(404).json({ message: 'Product not found' });
  }

  return res.status(200).json(product[0]);
};

const create = async (req, res) => {
  const { name } = req.body;

  const newProduct = await ProductsService.create(name);

  return res.status(201).json({ id: newProduct[0].insertId, name });
};

module.exports = {
  getAll,
  getByPk,
  create,
};
