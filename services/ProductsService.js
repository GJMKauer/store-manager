const ProductsModel = require('../models/ProductsModel');

const getAllProducts = async () => {
  const products = await ProductsModel.getAllProducts();

  return products;
};

const getProductByPk = async (id) => {
  const product = await ProductsModel.getProductByPk(id);

  return product;
};

const createProduct = async (name) => ProductsModel.createProduct(name);

module.exports = {
  getAllProducts,
  getProductByPk,
  createProduct,
};
