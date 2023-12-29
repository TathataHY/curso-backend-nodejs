const {
  logErrors,
  boomErrorHandler,
  errorHandler,
} = require('./middlewares/error.handler');
const { routerAPI } = require('./routes/router');
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Agregar middleware para analizar el cuerpo de la solicitud
app.use(express.json());

app.use((req, res, next) => {
  // eslint-disable-next-line no-console
  console.log(`${req.method} ${req.url}`);
  next();
});

// routing app
routerAPI(app);

// error handlers
app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Listening at http://localhost:${port}`);
});
