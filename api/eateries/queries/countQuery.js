'use strict';
// Module containing only Queries ....

const eateriesService = require('../../../services/eateries/EateriesService');
const schema = require ('../../schema.json');

const countQuery = async (ctx) => {

  const service = eateriesService();
  const result = await service.findEateriesCount(ctx.request.querySanitised, schema) ;
  const status = result ? 'success' : 'error';
  ctx.body = {status, result};

}

module.exports = () => { return  countQuery ;}
