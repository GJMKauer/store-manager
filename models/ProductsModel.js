const connection = require('./connection');

const getAllProducts = async () => {
  const [products] = await connection.query(`
    SELECT * FROM StoreManager.products
  `);
  return products;
};

const getProductByPk = async (id) => {
  const [[product]] = await connection.query(`
    SELECT * FROM StoreManager.products
    WHERE id = ?
  `, [id]);

  if (!product) return [[], []];

  return product;
};

const createProduct = async (name) => {
  const [newProduct] = await connection.query(`
    INSERT INTO StoreManager.products (name)
    VALUES (?)
  `, [name]);
  
  return newProduct;
};

const updateProduct = async (id, name) => {
  const [updatedProduct] = await connection.query(`
    UPDATE StoreManager.products
    SET
      name = ?
    WHERE id = ?
  `, [name, id]);

  return updatedProduct;
};

const deleteProduct = async (id) => {
  const [deletedProduct] = await connection.query(`
    DELETE FROM StoreManager.products
    WHERE id = ?
  `, [id]);

  return deletedProduct;
};

module.exports = {
  getAllProducts,
  getProductByPk,
  createProduct,
  updateProduct,
  deleteProduct,
};
