'use strict';

const namesService = require ('../../../services/eateries/NamesService');
const schema = require ('../../schema.json');

const namesQuery = async (ctx) => {
  const service = namesService();
  const result = await service.findAllNames(ctx.request.querySanitised, schema.views['names']) ;
  const status = result ? 'success' : 'error';
  let total = 0;
  if (result) {
    total = result.length;
  }
  ctx.body = {status, total, result};
}

module.exports = () => { return  namesQuery ;}
