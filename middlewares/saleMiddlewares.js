const { validateAllProducts, validateAmount } = require('../schemas/saleSchema');

function validateSale(req, res, next) {
  const { code, message } = validateAllProducts(req.body);

  if (message) return res.status(code).json({ message });

  next();
}

async function validateProductsAmount(req, res, next) {
  const validation = await validateAmount(req.body);

  if (!validation) {
    return res.status(422).json({
      message: 'Such amount is not permitted to sell',
    });
  }

  next();
}

module.exports = {
  validateSale,
  validateProductsAmount,
};
