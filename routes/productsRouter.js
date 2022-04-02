const express = require('express');
const productControllers = require('../controllers/productControllers');
const { validateProduct, validateName } = require('../middlewares/productMiddlewares');

const router = express.Router();

router.get('/', productControllers.getAllProducts);

router.get('/:id', productControllers.getProductById);

router.post(
  '/',
  validateProduct,
  validateName,
  productControllers.createProduct,
);

router.put(
  '/:id',
  validateProduct,
  validateName,
  productControllers.updateProduct,
);

router.delete(
  '/:id',
  productControllers.deleteProduct,
);

module.exports = router;