const saleModels = require('../models/saleModels');

const getAllSales = async () => {
  const sales = await saleModels.getAllSales();

  return sales;
};

module.exports = {
  getAllSales,
};
