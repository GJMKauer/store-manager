const SalesProductsModel = require('../models/SalesProductsModel');
const SalesModel = require('../models/SalesModel');

const createSale = async (salesList) => SalesProductsModel.createSaleProduct(salesList);

const getAllSales = async () => SalesModel.getAllSales();

const getSaleByPk = async (id) => SalesModel.getSaleByPk(id);

const deleteSale = async (id) => SalesModel.deleteSale(id);

module.exports = {
  createSale,
  getAllSales,
  getSaleByPk,
  deleteSale,
};
