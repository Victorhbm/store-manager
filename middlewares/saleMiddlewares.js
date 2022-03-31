const { validate } = require('../schemas/saleSchema');

function validateSale(req, res, next) {
  const { productId, quantity } = req.body;

  const { code, message } = validate(productId, quantity);

  if (message) return res.status(code).json({ message });

  next();
}

module.exports = {
  validateSale,
};
