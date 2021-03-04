'use strict';

const logger = require('../config/winston');

const validateParameter = (obj, dtoType) => {
  const keys = Object.keys(obj);
  const values = Object.values(obj);
  if (keys.length !== 1 && values.length !== 1) {
    return false;
  }
  const name = keys[0];
  const value = values[0];
  const dType = dtoType[name];
  return (typeof value === dType)  && hasProperty(dtoType, name); //Object.prototype.hasOwnProperty.call(dtoType, name);
  //return (typeof value === dType)  && dtoType.hasOwnProperty(name);
}


//  Query : {"$and": [{"field_1": "value_1"}, {"field_2": value_2}, .....]}
// Query : {"$count"}

const typeDefaultOperator = (obj, dtoType) => {
  const keys = Object.keys(obj);
  const values = Object.values(obj);
  if (keys.length !== 1 && values.length !== 1) {
    return null;
  }
  const name = keys[0];
  const dType = dtoType[name];
  return dType === 'string' ? 'like' : '=';
}

// ParseQuery is responsible for analysing the parameters of the query
// The Query Language has been inspired from restdb.io (https://restdb.io/docs/querying-with-the-api)

const hasProperty = (object, property) => {
  return Object.prototype.hasOwnProperty.call(object, property);
}

const parseQuery = (query, dtoType) => {
  try {
    logger.debug('>> query = ' +  JSON.stringify(query));
    if (query['q']) {
      // and operator
      const parameters = query['q'];
      const params = JSON.parse(parameters)
      logger.debug('>> parameters = ' +  JSON.stringify(params['$and']));

      // Only and logic operators  $AND and $Or are being used for the time being .
      // q={"$and": [{"field_1": "value_1"}, {"field_2": value_2}, .....]

      //if (params.hasOwnProperty('$and') || params.hasOwnProperty('$or')) {
      if (hasProperty(params, '$and') || hasProperty(params, '$or') ) {
        const paramsList = hasProperty(params, '$and') ?
          params['$and'] :
          params['$or'];
        // checking query parameters
        if (paramsList.length === 0) {
          logger.error('>> Parameters List is empty');
          return {};
        }
        const validParameters =  paramsList.filter(x => {
          if (x.radius || validateParameter(x, dtoType)) {
            x['operator'] = typeDefaultOperator(x, dtoType);
            return true;
          }
        });
        logger.debug('>> validParameters ' + validParameters.toString());
        const operator = hasProperty(params, '$and')? 'AND' : 'OR';
        return {operator , parameters: validParameters};
      } else {
        // not Implemented yet .....
        // Query cannot be parsed
        logger.error('>> not implemented for that operator !!!')
        return {};
      }
    } else {
      // incorrect Syntax....
      logger.error('>> Incorrect Syntax...');
      return {};
    }
  }
  catch(error) {
    logger.error('ERROR ', error);
    return {};
  }
}

const dtoValidation =  (query, dtoType) => {
  return parseQuery(query, dtoType);
}

module.exports = (query, dtoType) => {
  return dtoValidation(query, dtoType);
}
