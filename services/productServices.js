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

const createProduct = async (name, quantity) => {
  const productCreated = await productModels.createProduct(name, quantity);

  return productCreated;
};

const updateProduct = async (id, name, quantity) => {
  const product = await productModels.getProductById(id);

  if (!product) return { error: true, code: 404, message: 'Product not found' };

  const productUpdated = await productModels.updateProduct(id, name, quantity);

  return { error: false, code: 200, productUpdated };
};

const deleteProduct = async (id) => {
  const product = await productModels.getProductById(id);

  if (!product) return { error: true, code: 404, message: 'Product not found' };

  await productModels.deleteProduct(id);

  return { error: false, code: 204 };
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
