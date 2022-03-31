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

const updateProduct = async (id, name, quantity) => {
  await connection.execute(
    'UPDATE products SET name = ?, quantity = ? WHERE id = ?',
    [name, quantity, id],
  );

  return {
    id,
    name,
    quantity,
  };
};

const deleteProduct = async (id) => {
  await connection.execute(
    'DELETE FROM products WHERE id = ?',
    [id],
  );
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  getProductByName,
  updateProduct,
  deleteProduct,
};
