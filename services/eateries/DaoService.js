'use strict';

const DaoFactory = require ('../../infrastructure/repositories/dao');

const queryDao = async (sql, outputFilter) => {
  const result =  await DaoFactory().query(sql);
  return outputFilter?
    outputFilter(result) :
    result;
}

module.exports =  queryDao;
