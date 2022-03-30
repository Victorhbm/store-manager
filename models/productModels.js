const connection = require('./mysql-connection');

const getAllProducts = async () => {
  const [products] = await connection.execute(
    'SELECT * FROM products',
  );

  return products;
};

module.exports = {
  getAllProducts,
};
