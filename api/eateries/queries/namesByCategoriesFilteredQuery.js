'use strict';

const logger = require('../../../config/winston');
const namesService = require ('../../../services/eateries/NamesService');
const schema = require ('../../schema.json');

const namesByCategoriesFilteredQuery = async (ctx) => {
  const service = namesService();
  const { category } = ctx.request.params;
  console.log('>> params = ', category);
  const result = await service.findNamesByCategoriesFiltered(category, schema.views['names']) ;
  const status = result ? 'success' : 'error';
  let total = 0;
  if (result) {
    total = result.length;
  }
  ctx.body = {status, total, result};
}

module.exports = () => {
  return namesByCategoriesFilteredQuery;
}
