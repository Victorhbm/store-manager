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

const createSale = async (products) => {
  const productCreated = await saleModels.createSale(products);

  return productCreated;
};

const updateSale = async (id, products) => {
  const productUpdated = await saleModels.updateSale(id, products);

  return productUpdated;
};

module.exports = {
  getAllSales,
  getSaleById,
  createSale,
  updateSale,
};
