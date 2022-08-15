const SalesService = require('../services/SalesService');

const createSale = async (req, res) => {
  const salesList = req.body;

  const { insertId } = await SalesService.createSale(salesList);

  return res.status(201).json({ id: insertId, itemsSold: salesList });
};

const getAllSales = async (_req, res) => {
  const sales = await SalesService.getAllSales();

  return res.status(200).json(sales);
};

const getSaleByPk = async (req, res) => {
  const { id } = req.params;

  const sale = await SalesService.getSaleByPk(id);

  return res.status(200).json(sale);
};

const deleteSale = async (req, res) => {
  const { id } = req.params;

  await SalesService.deleteSale(id);

  return res.status(204).send();
};

const updateSale = async (req, res) => {
  const { id } = req.params;
  const salesList = req.body;

  await SalesService.updateSale(id, salesList);

  return res.status(200).json({ saleId: id, itemsUpdated: salesList });
};

module.exports = {
  createSale,
  getAllSales,
  getSaleByPk,
  deleteSale,
  updateSale,
};
