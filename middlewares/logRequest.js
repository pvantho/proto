'use strict';

const logger = require ('../config/winston');

const logHttpRequest = async (ctx, next) => {
  logger.info(ctx.request.method + ' ' + ctx.request.url);
  await next();
}

module.exports =  () => {
 return logHttpRequest;
}
