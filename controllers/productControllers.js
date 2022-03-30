const productServices = require('../services/productServices');

const getAllProducts = async (_req, res) => {
  try {
    const products = await productServices.getAllProducts();

    return res.status(200).json(products);
  } catch (error) {
    return res.status(500).json({ message: 'Erro no servidor' });
  }
};

module.exports = {
  getAllProducts,
};
