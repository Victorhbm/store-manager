const { validateAllProducts } = require('../schemas/saleSchema');

function validateSale(req, res, next) {
  const { code, message } = validateAllProducts(req.body);

  if (message) return res.status(code).json({ message });

  next();
}

module.exports = {
  validateSale,
};
