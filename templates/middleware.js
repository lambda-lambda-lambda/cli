'use strict';

const config = require(`${APP_ROOT}/config.json`);
  
/**
 * Middleware description.
 */
module.exports = (req, res, next) => {

  next(); // Run subsequent handler.
};
