const saleModels = require('../models/saleModels');
const saleSchema = require('../schemas/saleSchema');

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
  await saleSchema.updateProductsQuantity(products);
  const productCreated = await saleModels.createSale(products);

  return productCreated;
};

const updateSale = async (id, products) => {
  await saleSchema.updateProductsQuantity(products);
  const productUpdated = await saleModels.updateSale(id, products);

  return productUpdated;
};

const deleteSale = async (id) => {
  const sale = await saleModels.getSaleById(id);

  if (!sale) return { error: true, code: 404, message: 'Sale not found' };

  await saleSchema.updateProductsOnDelete(+id);
  await saleModels.deleteSale(id);

  return { error: false, code: 204 };
};

module.exports = {
  getAllSales,
  getSaleById,
  createSale,
  updateSale,
  deleteSale,
};
