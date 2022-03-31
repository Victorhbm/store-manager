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

module.exports = {
  validate,
};