const { getProductById, updateProduct } = require('../models/productModels');
const { getSaleById } = require('../models/saleModels');

const errors = {
  productIdBlank: '"productId" is required',
  quantityBlank: '"quantity" is required',
  quantityInteger: '"quantity" must be greater than or equal to 1',
};

const validate = (productId, quantity) => {
  switch (true) {
    case !productId: return { code: 400, message: errors.productIdBlank };
    case !quantity: return { code: 400, message: errors.quantityBlank };
    case quantity <= 0: return { code: 422, message: errors.quantityInteger };
    default: return {};
  }
};

const validateAllProducts = (products) => {
  let result = {};

  products.every(({ productId, quantity }) => {
    const verifyProduct = validate(productId, quantity);

    if (verifyProduct.message) {
      result = verifyProduct;
      return false;
    }

    return true;
  });

  return result;
};

const validateAmount = async (products) => {
  let result = true;

  await Promise.all(products.map(async (prod) => {
    const { quantity } = await getProductById(prod.productId);
    if (prod.quantity > quantity) {
      result = false;
    }
  }));

  return result;
};

const updateProductsQuantity = async (products) => {
  await Promise.all(products.map(async ({ productId, quantity }) => {
    const getProductInfo = await getProductById(productId);
    const newQuantity = getProductInfo.quantity - quantity;

    await updateProduct(productId, getProductInfo.name, newQuantity);
  }));
};

const updateProductsOnDelete = async (id) => {
  const getSaleInfo = await getSaleById(id);
  
  await Promise.all(getSaleInfo.map(async ({ productId, quantity }) => {
    const getProductInfo = await getProductById(productId);
    const newQuantity = getProductInfo.quantity + quantity;

    await updateProduct(productId, getProductInfo.name, newQuantity);
  }));
};

module.exports = {
  validateAllProducts,
  validateAmount,
  updateProductsQuantity,
  updateProductsOnDelete,
};