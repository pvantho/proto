'use strict';

const queryDao = require("./DaoService");
const logger = require("../../config/winston");
const sanitizer = require('string-sanitizer');

const sanitizeValue = (value) => {
  // we need to sanitize value (!important)
  return  sanitizer.sanitize(value);
}
const viewService = async (view, method, value) => {
  try {
    const sqlQuery = value ? view.query[method].replace(/\${value}/g, sanitizeValue(value)) : view.query[method];
    console.log('>> sqlQuery = ', sqlQuery)
    return await queryDao(sqlQuery);
  }
  catch(error) {
    logger.error(error.message);
  }
}

const queryAll = (view) => {
  return viewService(view, 'select_all')
}
const queryByFilter = (view, value) => {
  return viewService(view, 'select_by_filter', value)
}
const queryByCode = (view, value) => {
  return viewService(view, 'select_by_code', value)
}
const count = (view) => {
  return viewService(view, 'select_count')
}
module.exports = () => {
 return {
   queryAll,
   queryByFilter,
   queryByCode,
   count
 }
}
