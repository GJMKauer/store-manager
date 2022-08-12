const ProductsModel = require('../models/ProductsModel');

const getAll = async () => {
  const products = await ProductsModel.getAll();

  return products;
};

const getByPk = async (id) => {
  const product = await ProductsModel.getByPk(id);

  return product;
};

const create = async (name) => ProductsModel.create(name);

module.exports = {
  getAll,
  getByPk,
  create,
};
