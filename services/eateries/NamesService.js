'use strict';



const viewService = require ('./ViewService');


const findAllNames = async (params, view) => {
  return viewService().queryAll(view);
}

const findNamesFiltered =  async (name, view) => {
  return viewService().queryByFilter (view, name);
}

const countNames = async (view) => {
  return viewService().count(view);
}

const findNamesByCategoriesFiltered =  async (name, view) => {
  return viewService().queryByCode (view, name);
}
module.exports = () => {
  return {
    findAllNames,
    findNamesFiltered,
    countNames,
    findNamesByCategoriesFiltered
  }
}
