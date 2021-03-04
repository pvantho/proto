'use strict';

const logger = require('../../../config/winston');
const namesService = require ('../../../services/eateries/NamesService');
const schema = require ('../../schema.json');

const namesFilteredQuery = async (ctx) => {
  const service = namesService();
  const { name } = ctx.request.params;
  console.log('>> params = ', name);
  const result = await service.findNamesFiltered(name, schema.views['names']) ;
  const status = result ? 'success' : 'error';
  let total = 0;
  if (result) {
    total = result.length;
  }
  ctx.body = {status, total, result};
}

module.exports = () => {
  return namesFilteredQuery;
}
