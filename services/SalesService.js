const SalesProductsModel = require('../models/SalesProductsModel');
const SalesModel = require('../models/SalesModel');

const createSale = async (salesList) => {
  const result = await SalesProductsModel.createSaleProduct(salesList);

  return result;
};

const getAllSales = async () => {
  const result = await SalesModel.getAllSales();

  return result;
};

const getSaleByPk = async (id) => {
  const result = await SalesModel.getSaleByPk(id);

  return result;
};

const deleteSale = async (id) => {
  const result = await SalesModel.deleteSale(id);

  return result;
};

const updateSale = async (id, salesList) => {
  const result = await SalesProductsModel.updateSaleProduct(id, salesList);

  return result;
};

module.exports = {
  createSale,
  getAllSales,
  getSaleByPk,
  deleteSale,
  updateSale,
};
