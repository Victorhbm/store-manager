const productModels = require('../models/productModels');

const getAllProducts = async () => {
  const products = await productModels.getAllProducts();

  return products;
};

module.exports = {
  getAllProducts,
};
