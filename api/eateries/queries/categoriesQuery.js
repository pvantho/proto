'use strict';

const categoriesService = require ('../../../services/eateries/CategoriesService');
const schema = require ('../../schema.json');

const categoriesQuery = async (ctx) => {
  const service = categoriesService();
  console.log('SCHEMA ', schema, typeof schema)
  const result = await service.findAllCategories(ctx.request.querySanitised, schema.views['categories']) ;
  const status = result ? 'success' : 'error';
  let total = 0;
  if (result) {
    total = result.length;
  }
  ctx.body = {status, total, result};
}

module.exports = () => { return  categoriesQuery ;}
