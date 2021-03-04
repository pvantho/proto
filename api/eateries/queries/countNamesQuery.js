'use strict';
// Module containing only Queries ....

const namesService = require('../../../services/eateries/NamesService');
const schema = require ('../../schema.json');

const countNamesQuery = async (ctx) => {
  const service = namesService();
  const result = await service.countNames(schema.views['names']) ;
  const status = result ? 'success' : 'error';
  ctx.body = {status, result};

}

module.exports = () => { return  countNamesQuery ;}
