'use strict';
// Module containing only Queries ....


const eateriesService = require('../../../services/eateries/EateriesService');
const schema = require ('../../schema.json');
const eateriesQuery = async (ctx) => {
  const service = eateriesService();
  const result = await service.findEateries(ctx.request.querySanitised, schema) ;
  const status = result ? 'success' : 'error';
  let total = 0;
  if (result) {
    total = result.length;
  }
  ctx.body = {status, total, result};

}

module.exports = () => { return  eateriesQuery ;}
