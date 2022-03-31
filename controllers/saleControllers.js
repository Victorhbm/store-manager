const saleServices = require('../services/saleServices');

const getAllSales = async (_req, res) => {
  try {
    const sales = await saleServices.getAllSales();

    return res.status(200).json(sales);
  } catch (error) {
    return res.status(500).json({ message: 'Server error' });
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
    return res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getAllSales,
  getSaleById,
};
