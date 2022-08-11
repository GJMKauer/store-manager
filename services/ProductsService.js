const ProductsModel = require('../models/ProductsModel');

const getAll = async () => {
  const products = await ProductsModel.getAll();

  return products;
};

const getByPk = async (id) => {
  const product = await ProductsModel.getByPk(id);

  if (!product) return null;

  return product;
};

module.exports = {
  getAll,
  getByPk,
};
