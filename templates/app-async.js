'use strict';

const Router = require('@lambda-lambda-lambda/router');
const config = require(`${APP_ROOT}/config.json`);

const accessControlHeaders = require(`${APP_ROOT}/middleware/AccessControlHeaders`);

/**
 * @see AWS::Serverless::Function
 */
exports.handler = async (event, context, callback) => {
  const {request, response} = event.Records[0].cf;

  const router = new Router(request, response);
  router.setPrefix(config.router.prefix);

  // Middleware (order is important).
  router.use(accessControlHeaders);

  // .. everything else.
  router.default(function(req, res) {
    res.status(404).send();
  });

  return await router.response();
};
