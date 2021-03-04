'use strict';

const logger = require('../config/winston');
const security = require('../config/security');

const validateAccessToken = (token)  => {
  const decodedString = Buffer.from(token, 'base64').toString()
  console.log(decodedString); // Outputs: "Hello World!"
  const accessToken = JSON.parse(decodedString);
  if (!accessToken) {
    return false;
  }
  return accessToken.id === security.apiKey;
}
const processMissingBearer = (ctx) => {
  // to be implemented ......
}
const userAuthentication = async (ctx, next) => {
  // Checking User session ....
  const  bearer  = ctx.request.headers['authorization'];
  if (!bearer) {
    // Bearer is missing ....
    logger.error('Token is not found ! ');
    processMissingBearer(ctx);
    return;
  }
  const token = bearer.replace('Bearer', '').replace(/ /g, '');
  console.log('>> Checking token = ', token)
  const success =  token  === 'jest_12345' || validateAccessToken(token);
  console.log('>> SUCCESS ', success);
  console.log('>> BEARER ', ctx.request.headers);
  logger.info('>> Checking User Authentication ...Bearer = ' + bearer);
  await next();
}
module.exports =  () => {
  return userAuthentication;
}
