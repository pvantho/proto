'use strict';
// Module containing only Queries ....

const categoriesService = require('../../../services/eateries/CategoriesService');
const schema = require ('../../schema.json');

const countCategoriesQuery = async (ctx) => {
  const service = categoriesService();
  const result = await service.countCategories(schema.views['categories']) ;
  const status = result ? 'success' : 'error';
  ctx.body = {status, result};
}

module.exports = () => { return  countCategoriesQuery ;}
