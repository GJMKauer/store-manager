const connection = require('./connection');
const SalesModel = require('./SalesModel');

const createSaleProduct = async (sales) => {
  const newSaleProduct = await SalesModel.createSale();

  await sales.forEach((async (sale) => {
    const { productId, quantity } = sale;
    await connection.query(`
      INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity)
      VALUES (?, ?, ?)
    `, [newSaleProduct.insertId, productId, quantity]);
  }));

  return newSaleProduct;
};

const updateSaleProduct = async (id, sales) => {
  await sales.forEach((async (sale) => {
    const { productId, quantity } = sale;
    await connection.query(`
      UPDATE StoreManager.sales_products
      SET
        quantity = ?
      WHERE sale_id = ? AND product_id = ?
    `, [quantity, id, productId]);
  }));
};

module.exports = {
  createSaleProduct,
  updateSaleProduct,
};
