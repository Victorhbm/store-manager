const saleServices = require('../services/saleServices');

const MESSAGE_ERROR = 'Server error';
const CODE_ISR = 500;

const getAllSales = async (_req, res) => {
  try {
    const sales = await saleServices.getAllSales();

    return res.status(200).json(sales);
  } catch (error) {
    return res.status(CODE_ISR).json({ message: MESSAGE_ERROR });
  }
};

const getSaleById = async (req, res) => {
  try {
    const { id } = req.params;
    const { error, code, message, sale } = await saleServices.getSaleById(+id);

    const result = error ? { message } : sale;

    return res.status(code).json(result);
  } catch (error) {
    console.error(error);
    return res.status(CODE_ISR).json({ message: MESSAGE_ERROR });
  }
};

const createSale = async (req, res) => {
  try {
    const createdProduct = await saleServices.createSale(req.body);

    return res.status(201).json(createdProduct);
  } catch (error) {
    console.error(error);
    return res.status(CODE_ISR).json({ message: MESSAGE_ERROR });
  }
};

module.exports = {
  getAllSales,
  getSaleById,
  createSale,
};
