'use strict';


const eateriesService = require('../../../services/eateries/EateriesService');
const eateriesConfig = require ('../../schema.json');

const tablesQuery = async (ctx) => {
  const service = eateriesService();
  const result = await service.showTables(ctx.request.querySanitised, eateriesConfig) ;
  const status = result ? 'success' : 'error';
  ctx.body = {status, result};

}

module.exports = () => { return  tablesQuery ;}
