require('dotenv').config();
const express = require('express');
const productControllers = require('./controllers/productControllers');
const { validateProduct, validateName } = require('./middlewares/productMiddlewares');
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
app.get('/sales', saleControllers.getAllSales);
app.get('/sales/:id', saleControllers.getSaleById);

app.listen(process.env.PORT, () => {
  console.log(`Escutando na porta ${process.env.PORT}`);
});
