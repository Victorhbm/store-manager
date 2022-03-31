const connection = require('./mysql-connection');

const getAllProducts = async () => {
  const [products] = await connection.execute(
    'SELECT * FROM products',
  );

  return products;
};

const getProductById = async (id) => {
  const [product] = await connection.execute(
    'SELECT * FROM products WHERE id = ?',
    [id],
  );

  if (product.length === 0) return null;

  return product[0];
};

const getProductByName = async (name) => {
  const [product] = await connection.execute(
    'SELECT * FROM products WHERE name = ?',
    [name],
  );

  if (product.length === 0) return null;

  return product[0];
};

const createProduct = async (name, quantity) => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO products (name, quantity) VALUES (?, ?)',
    [name, quantity],
  );

  return {
    id: insertId,
    name,
    quantity,
  };
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  getProductByName,
};
