const errors = {
  nameBlank: '"name" is required',
  nameLength: '"name" length must be at least 5 characters long',
  quantityBlank: '"quantity" is required',
  quantityInteger: '"quantity" must be greater than or equal to 1',
};

const validate = (name, quantity) => {
  switch (true) {
    case !name: return { code: 400, message: errors.nameBlank };
    case name.length < 5: return { code: 422, message: errors.nameLength };
    case !quantity: return { code: 400, message: errors.quantityBlank };
    case quantity <= 0: return { code: 422, message: errors.quantityInteger };
    default: return {};
  }
};

module.exports = {
  validate,
};
