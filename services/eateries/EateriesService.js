'use strict';

// Data Access Object

const sqlBuilderFactory = require ('../core/sqlQueryBuilder');
const logger = require('../../config/winston');
const queryDao = require ('./DaoService');
const viewService = require ('./ViewService');

// outputFilter is a middleware we can run against the final result returned by DAO service.

const emptyObject = (obj) => {
  return obj && Object.keys(obj).length === 0
}

const findEateries = async (params, schema) => {
  try {
    // we need to apply a second filter for radius
    /*logger.debug('FindEateries ' + JSON.stringify(params));*/
    if (emptyObject(params)) {
      return [];
    }
    const queryFilter = sqlBuilderFactory()(params, schema);

    return await queryDao(queryFilter.query, (res) => {
      return queryFilter.runDatasetFilterStatus ? queryFilter.runDatasetFilter(res) : res;
    });
  }
  catch(error) {
    logger.error(error.message);
  }
}

const findEateriesCount = async (params, schema) => {
  const view =  schema.views['eateries'];
  return await viewService().count(view);
  /*
  try {
    const sqlQuery = 'select count(*) from ' + schema.views['eateries'];
    return await queryDao(sqlQuery);
  }
  catch(error) {
    logger.error(error.message);
  }*/
}

const showTables = async() => {
  const sqlQuery =  `select name from sqlite_master where type = 'table'`;
  return queryDao(sqlQuery);
}

module.exports = () => {
  return {
    findEateries,
    findEateriesCount,
    showTables
    // add next service  here....
  }
}
