const connection = require('./connection');

const getAll = async () => {
  const products = await connection.query(`
    SELECT * FROM StoreManager.products
  `);
  return products[0];
};

const getByPk = async (id) => {
  const product = await connection.query(`
    SELECT * FROM StoreManager.products
    WHERE id = ?
  `, [id]);

  return product[0][0];
};

module.exports = {
  getAll,
  getByPk,
};
