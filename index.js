require('dotenv').config();
const express = require('express');
const productControllers = require('./controllers/productControllers');
const { validateProduct, validateName } = require('./middlewares/productMiddlewares');
const { validateSale, validateProductsAmount } = require('./middlewares/saleMiddlewares');
const saleControllers = require('./controllers/saleControllers');

const app = express();

app.use(express.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.get('/products', productControllers.getAllProducts);
app.get('/products/:id', productControllers.getProductById);
app.post(
  '/products',
  validateProduct,
  validateName,
  productControllers.createProduct,
);
app.put(
  '/products/:id',
  validateProduct,
  validateName,
  productControllers.updateProduct,
);
app.delete(
  '/products/:id',
  productControllers.deleteProduct,
);
app.get('/sales', saleControllers.getAllSales);
app.get('/sales/:id', saleControllers.getSaleById);
app.post(
  '/sales',
  validateSale,
  validateProductsAmount,
  saleControllers.createSale,
);
app.put(
  '/sales/:id',
  validateSale,
  saleControllers.updateSale,
);
app.delete(
  '/sales/:id',
  saleControllers.deleteSale,
);

app.listen(process.env.PORT, () => {
  console.log(`Escutando na porta ${process.env.PORT}`);
});
