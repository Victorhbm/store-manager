const { validate, checkIfNameExists } = require('../schemas/productSchema');

const validateProduct = async (req, res, next) => {
  const { name, quantity } = req.body;
  const { message, code } = validate(name, quantity);

  if (message) return res.status(code).json({ message });

  next();
};

const validateName = async (req, res, next) => {
  const { name } = req.body;
  const { message, code } = await checkIfNameExists(name);

  if (message) return res.status(code).json({ message });

  next();
};

module.exports = {
  validateProduct,
  validateName,
};
