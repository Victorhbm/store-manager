const saleServices = require('../services/saleServices');

const getAllSales = async (_req, res) => {
  try {
    const sales = await saleServices.getAllSales();

    return res.status(200).json(sales);
  } catch (error) {
    return res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getAllSales,
};
