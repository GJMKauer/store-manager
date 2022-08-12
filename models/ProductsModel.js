const connection = require('./connection');

const getAll = async () => {
  const [products] = await connection.query(`
    SELECT * FROM StoreManager.products
  `);
  return products;
};

const getByPk = async (id) => {
  const [[product]] = await connection.query(`
    SELECT * FROM StoreManager.products
    WHERE id = ?
  `, [id]);

  if (!product) return [[], []];

  return product;
};

const create = async (name) => {
  const [newProduct] = await connection.query(`
    INSERT INTO StoreManager.products (name)
    VALUES (?)
  `, [name]);
  
  return newProduct;
};

module.exports = {
  getAll,
  getByPk,
  create,
};
