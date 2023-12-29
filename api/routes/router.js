const express = require('express');

const { router: productsRouter } = require('./api/products.router');
const { router: usersRouter } = require('./api/users.router');
const { router: categoriesRouter } = require('./api/categories.router');

function routerAPI(app) {
  const apiRouter = express.Router();
  app.use('/api/v1', apiRouter);

  apiRouter.use('/products', productsRouter);
  apiRouter.use('/users', usersRouter);
  apiRouter.use('/categories', categoriesRouter);
}

module.exports = { routerAPI };
