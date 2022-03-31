const saleModels = require('../models/saleModels');

const getAllSales = async () => {
  const sales = await saleModels.getAllSales();

  return sales;
};

const getSaleById = async (id) => {
  const sale = await saleModels.getSaleById(id);

  if (!sale) return { error: true, code: 404, message: 'Sale not found' };

  return { error: false, code: 200, sale };
};

module.exports = {
  getAllSales,
  getSaleById,
};
