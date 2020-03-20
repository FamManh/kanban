const express = require('express')
const bodyParser = require('body-parser');
const morgan = require('morgan')
const passport = require('passport')
const routes = require('../api/routes')
const {logs } = require('./vars')
const strategies = require('./passport')
const error = require('../middlewares/error')
const { ValidationError } = require("express-validation");
const cors = require('cors')

/**
 * Express instance
 * @public
 */
const app = express();

app.use(cors());

// request logging. dev: console | production: file
app.use(morgan(logs));

// parse body params and attach them to req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// enable authentication
app.use(passport.initialize());
passport.use('jwt', strategies.jwt);

// mount api v1 routes
app.use('/api/v1', routes);

// if error is not an instanceOf APIError, convert it.
app.use(error.converter);

// catch 404 and forward to error handler
app.use(error.notFound);

// error handler, send stacktrace only during development
app.use(error.handler);

module.exports = app;
