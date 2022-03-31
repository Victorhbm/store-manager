const productServices = require('../services/productServices');

const MESSAGE_ERROR = 'Server error';
const CODE_ISR = 500;

const getAllProducts = async (_req, res) => {
  try {
    const products = await productServices.getAllProducts();

    return res.status(200).json(products);
  } catch (error) {
    return res.status(CODE_ISR).json({ message: MESSAGE_ERROR });
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
    return res.status(CODE_ISR).json({ message: MESSAGE_ERROR });
  }
};

const createProduct = async (req, res) => {
  try {
    const { name, quantity } = req.body;

    const createdProduct = await productServices.createProduct(name, quantity);

    return res.status(201).json(createdProduct);
  } catch (error) {
    console.error(error);
    return res.status(CODE_ISR).json({ message: MESSAGE_ERROR });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, quantity } = req.body;
    const {
      error,
      code,
      message,
      productUpdated,
    } = await productServices.updateProduct(+id, name, quantity);

    const result = error ? { message } : productUpdated;

    return res.status(code).json(result);
  } catch (error) {
    console.error(error);
    return res.status(CODE_ISR).json({ message: MESSAGE_ERROR });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      error,
      code,
      message,
    } = await productServices.deleteProduct(+id);

    if (error) return res.status(code).json({ message });

    return res.status(code).send();
  } catch (error) {
    console.error(error);
    return res.status(CODE_ISR).json({ message: MESSAGE_ERROR });
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
