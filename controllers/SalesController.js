const SalesService = require('../services/SalesService');

const createSale = async (req, res) => {
  const salesList = req.body;

  const { insertId } = await SalesService.createSale(salesList);

  return res.status(201).json({ id: insertId, itemsSold: salesList });
};

module.exports = {
  createSale,
};
