const routes = require('express').Router();
const routesUser = require('./users');
const routesCards = require('./cards');
const { requestLogger, errorLogger } = require('../middlewares/logger');

// routes.use(requestLogger);

routes.use('/', routesUser);
routes.use('/', routesCards);

module.exports = routes;
