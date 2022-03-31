const { validate, checkIfNameExists } = require('../schemas/productSchema');

const validateProduct = async (req, res, next) => {
  const { name, quantity } = req.body;

  const validation = validate(name, quantity);
  if (validation.message) return res.status(validation.code).json({ message: validation.message });

  const checkName = await checkIfNameExists(name);
  if (checkName.message) return res.status(checkName.code).json({ message: checkName.message });

  next();
};

module.exports = {
  validateProduct,
};
