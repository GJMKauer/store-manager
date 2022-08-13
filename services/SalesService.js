const SalesProductsModel = require('../models/SalesProductsModel');

const createSale = async (salesList) => SalesProductsModel.createSaleProduct(salesList);

module.exports = {
  createSale,
};
