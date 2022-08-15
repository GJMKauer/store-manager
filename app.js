const express = require('express');

const ProductsController = require('./controllers/ProductsController');
const SalesController = require('./controllers/SalesController');

const {
  getProductByPkValidations,
  createProductValidations } = require('./middlewares/ProductsMiddleware');
const {
  productIdValidations,
  quantityValidations,
  saleValidations,
} = require('./middlewares/SalesMiddleware');

const app = express();

app.use(express.json());

// não remova esse endpointGK, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.get('/products', ProductsController.getAllProducts);

app.get('/products/:id', getProductByPkValidations, ProductsController.getProductByPk);

app.post('/products', createProductValidations, ProductsController.createProduct);

app.put('/products/:id',
  getProductByPkValidations, createProductValidations, ProductsController.updateProduct);

app.delete('/products/:id', getProductByPkValidations, ProductsController.deleteProduct);

app.get('/sales', SalesController.getAllSales);

app.get('/sales/:id', saleValidations, SalesController.getSaleByPk);

app.post('/sales', productIdValidations, quantityValidations, SalesController.createSale);

app.delete('/sales/:id', saleValidations, SalesController.deleteSale);

// não remova essa exportação, é para o avaliador funcionar
// você pode registrar suas rotas normalmente, como o exemplo acima
// você deve usar o arquivo index.js para executar sua aplicação 
module.exports = app;