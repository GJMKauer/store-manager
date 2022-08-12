const express = require('express');

const ProductsController = require('./controllers/ProductsController');

const app = express();

app.use(express.json());

// não remova esse endpointGK, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.get('/products', ProductsController.getAllProducts);

app.get('/products/:id', ProductsController.getProductByPk);

app.post('/products', ProductsController.createProduct);

// não remova essa exportação, é para o avaliador funcionar
// você pode registrar suas rotas normalmente, como o exemplo acima
// você deve usar o arquivo index.js para executar sua aplicação 
module.exports = app;