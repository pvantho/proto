'use strict';

const categoriesService = require ('../../../services/eateries/CategoriesService');
const schema = require ('../../schema.json');

const categoriesFilteredQuery = async (ctx) => {
  const service = categoriesService();
  const { value } = ctx.request.params;

  const result = await service.findCategoriesFiltered(value, schema.views['categories']) ;
  const status = result ? 'success' : 'error';
  let total = 0;
  if (result) {
    total = result.length;
  }
  ctx.body = {status, total, result};
}

module.exports = () => { return  categoriesFilteredQuery ;}
