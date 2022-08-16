const ProductsModel = require('../models/ProductsModel');

const getAllProducts = async () => {
  const result = await ProductsModel.getAllProducts();

  return result;
};

const getProductByPk = async (id) => {
  const result = await ProductsModel.getProductByPk(id);

  return result;
};

const createProduct = async (name) => {
  const result = await ProductsModel.createProduct(name);

  return result;
};

const updateProduct = async (id, name) => {
  const result = await ProductsModel.updateProduct(id, name);

  return result;
};

const deleteProduct = async (id) => {
  const result = await ProductsModel.deleteProduct(id);

  return result;
};

const searchProduct = async (query) => {
  const result = await ProductsModel.searchProduct(query);

  return result;
};

module.exports = {
  getAllProducts,
  getProductByPk,
  createProduct,
  updateProduct,
  deleteProduct,
  searchProduct,
};
