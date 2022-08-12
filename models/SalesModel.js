const connection = require('./connection');

const createSale = async () => {
  const [newSaleProduct] = await connection.query(`
    INSERT INTO StoreManager.sales (id, date) 
    VALUES (default, default)
  `);

  return newSaleProduct;
};

module.exports = {
  createSale,
};
