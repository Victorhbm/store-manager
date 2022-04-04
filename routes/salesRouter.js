const express = require('express');
const {
  validateSale,
  validateProductsAmount,
} = require('../middlewares/saleMiddlewares');
const saleControllers = require('../controllers/saleControllers');

const router = express.Router();

router.get('/', saleControllers.getAllSales);

router.get('/:id', saleControllers.getSaleById);

router.post(
  '/',
  validateSale,
  validateProductsAmount,
  saleControllers.createSale,
);

router.put(
  '/:id',
  validateSale,
  validateProductsAmount,
  saleControllers.updateSale,
);

router.delete(
  '/:id',
  saleControllers.deleteSale,
);

module.exports = router;