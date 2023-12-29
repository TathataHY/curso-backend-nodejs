function logErrors(err, req, res, next) {
  // eslint-disable-next-line no-console
  console.error(err.message);
  next(err);
}

function boomErrorHandler(err, req, res, next) {
  if (err.isBoom) {
    const { output } = err;
    res.status(output.statusCode).json(output.payload);
  } else {
    next(err);
  }
}

// eslint-disable-next-line no-unused-vars
function errorHandler(err, req, res, next) {
  res.status(500).send('Something went wrong!');
}

module.exports = { logErrors, boomErrorHandler, errorHandler };
