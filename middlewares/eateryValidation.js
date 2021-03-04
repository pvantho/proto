'use strict';

const {dtoType} = require('../models/eatery');
const dtoValidation = require('./dtoValidation');

const eateryValidation = async (ctx, next) => {
  const { query }  = ctx.request;
  ctx.request.querySanitised =  dtoValidation(query, dtoType());
  await  next();
}

module.exports = () => {
  return eateryValidation;
}
