const { getProductByName } = require('../models/productModels');

const errors = {
  nameBlank: '"name" is required',
  nameLength: '"name" length must be at least 5 characters long',
  quantityBlank: '"quantity" is required',
  quantityInteger: '"quantity" must be greater than or equal to 1',
  alreadyExists: 'Product already exists',
};

const checkIfNameExists = async (name) => {
  const getProduct = await getProductByName(name);

  if (getProduct) {
    return { code: 409, message: errors.alreadyExists };
  }

  return {};
};

const validate = (name, quantity) => {
  switch (true) {
    case !name: return { code: 400, message: errors.nameBlank };
    case name.length < 5: return { code: 422, message: errors.nameLength };
    case quantity <= 0: return { code: 422, message: errors.quantityInteger };
    case !quantity: return { code: 400, message: errors.quantityBlank };
    default: return {};
  }
};

module.exports = {
  validate,
  checkIfNameExists,
};
