'use strict';

const Router = require('@lambda-lambda-lambda/router');
const config = require(`${APP_ROOT}/config.json`);

const accessControlHeaders = require(`${APP_ROOT}/middleware/AccessControlHeaders`);
const appConfigPlugin      = require(`${APP_ROOT}/middleware/AppConfigPlugin`);
const swaggerUIViewer      = require(`${APP_ROOT}/middleware/SwaggerUIViewer`);

const swaggerJson = require(`${APP_ROOT}/swagger.json`);

/**
 * @see AWS::Serverless::Function
 */
exports.handler = async (event, context, callback) => {
  const {request, response} = event.Records[0].cf;

  const router = new Router(request, response);
  router.setPrefix(config.router.prefix);

  // Middleware (in execution order).
  router.use(accessControlHeaders);
  router.use(appConfigPlugin(config));
  router.use(swaggerUIViewer(swaggerJson));

  // Send root response ({{appPrefix}}/)
  router.get('/', function(req, res) {

    // Redirect to Swagger viewer.
    res.setHeader('Location', `${config.router.prefix}/?swagger-ui=html`);
    res.status(301).send();
  });

  // .. everything else.
  router.default(function(req, res) {
    res.status(404).send();
  });

  return await router.response();
};
