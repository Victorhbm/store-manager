const productServices = require('../services/productServices');

const getAllProducts = async (_req, res) => {
  try {
    const products = await productServices.getAllProducts();

    return res.status(200).json(products);
  } catch (error) {
    return res.status(500).json({ message: 'Server error' });
  }
};

const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const { error, code, message, product } = await productServices.getProductById(+id);

    const result = error ? { message } : product;

    return res.status(code).json(result);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getAllProducts,
  getProductById,
};
