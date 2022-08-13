const SalesService = require('../services/SalesService');

const createSale = async (req, res) => {
  const salesList = req.body;

  const { insertId } = await SalesService.createSale(salesList);

  return res.status(201).json({ id: insertId, itemsSold: salesList });
};

const getAllSales = async (_req, res) => {
  const sales = await SalesService.getAllSales();

  res.status(200).json(sales);
};

const getSaleByPk = async (req, res) => {
  const { id } = req.params;

  const sale = await SalesService.getSaleByPk(id);

  res.status(200).json(sale);
};

module.exports = {
  createSale,
  getAllSales,
  getSaleByPk,
};
