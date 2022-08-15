const ProductsModel = require('../models/ProductsModel');

const getAllProducts = async () => ProductsModel.getAllProducts();

const getProductByPk = async (id) => ProductsModel.getProductByPk(id);

const createProduct = async (name) => ProductsModel.createProduct(name);

const updateProduct = async (id, name) => ProductsModel.updateProduct(id, name);

const deleteProduct = async (id) => ProductsModel.deleteProduct(id);

const searchProduct = async (query) => ProductsModel.searchProduct(query);

module.exports = {
  getAllProducts,
  getProductByPk,
  createProduct,
  updateProduct,
  deleteProduct,
  searchProduct,
};
