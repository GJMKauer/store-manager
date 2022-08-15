const connection = require('./connection');

const createSale = async () => {
  const [newSaleProduct] = await connection.query(`
    INSERT INTO StoreManager.sales (id, date) 
    VALUES (default, default)
  `);

  return newSaleProduct;
};

const getAllSales = async () => {
  const [allSales] = await connection.query(`
    SELECT
      DISTINCT sp.sale_id AS saleId, sp.product_id AS productId, sp.quantity, s.date
    FROM
      StoreManager.sales_products AS sp
        INNER JOIN
      StoreManager.sales AS s
    ORDER BY sale_id ASC, product_id ASC
  `);

  return allSales;
};

const getSaleByPk = async (id) => {
  const [sale] = await connection.query(`
    SELECT
      DISTINCT sp.product_id AS productId, sp.quantity, s.date
    FROM
      StoreManager.sales_products AS sp
        INNER JOIN
      StoreManager.sales AS s
    WHERE sp.sale_id = ?
  `, [id]);

  return sale;
};

const deleteSale = async (id) => {
  const [deletedSale] = await connection.query(`
    DELETE FROM StoreManager.sales
    WHERE id = ?
  `, [id]);

  return deletedSale;
};

module.exports = {
  createSale,
  getAllSales,
  getSaleByPk,
  deleteSale,
};
