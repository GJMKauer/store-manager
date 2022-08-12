const SalesProductsModel = require('../models/SalesProductsModel');

const createSale = async (salesList) => {
  const result = await SalesProductsModel.createSaleProduct(salesList);
  console.log(result);

  return result;
};

module.exports = {
  createSale,
};
