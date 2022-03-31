const { validate } = require('../schemas/productSchema');

function validateProduct(req, res, next) {
  const { name, quantity } = req.body;

  const { code, message } = validate(name, quantity);

  if (message) return res.status(code).json({ message });

  next();
}

module.exports = {
  validateProduct,
};
