const productModels = require('../models/productModels');

const getAllProducts = async () => {
  const products = await productModels.getAllProducts();

  return products;
};

const getProductById = async (id) => {
  const product = await productModels.getProductById(id);

  if (!product) return { error: true, code: 404, message: 'Product not found' };

  return { error: false, code: 200, product };
};

module.exports = {
  getAllProducts,
  getProductById,
};
