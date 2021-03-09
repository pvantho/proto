'use strict';
const viewService = require ('./ViewService');


const findAllCategories = async (params, view) => {
  return viewService().queryAll(view);
}

const findCategoriesFiltered =  async (name, view) => {
  return viewService().queryByFilter (view, name);
}

const countCategories = async (view) => {
  return viewService().count(view);
}
module.exports = () => {
  return {
    findAllCategories,
    findCategoriesFiltered,
    countCategories,
  }
}
