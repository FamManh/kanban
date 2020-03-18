Promise = require('bluebird');
const app = require('./src/config/express')
const mongoose = require("./src/config/mongoose");
const {port, env} = require('./src/config/vars');
const logger = require('./src/config/logger');

// open mongoose connection
mongoose.connect();


// listen to requests 
app.listen(port, ()=>logger.info(`Server started on port ${port} (${env})`));

/**
 * Exports express
 * @public
 */
module.exports = app;
