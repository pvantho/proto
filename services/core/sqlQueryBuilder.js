'use strict';

const logger = require ('../../config/winston');

const datasetRadiusFilter = require ('./datasetRadiusFilter');
const radiusFilterBuilderFactory = require ('./radiusFilterBuilder');
const derivedPoint = radiusFilterBuilderFactory().calculateDerivedPosition;
const buildRadiusFilter = (lat, lon, radius) => {
  // sqlite3 does not have acos, cos, sin  .
  // build 4 points from c(center) - that process will allow us to query Sqlite3 all locations inside the virtual square
  // Then we will process by comparing the distance of each point with the reference point (ie Center point)
  //        p1     //
  //
  // p4     C      p2
  //
  //        p3

  const center = { lat, lon };
  const range = 1.1 * radius;
  const p1 = derivedPoint(center, range, 0);
  const p2 = derivedPoint(center, range, 90);
  const p3 = derivedPoint(center, range, 180);
  const p4 = derivedPoint(center, range, 270);
  const latitude = 'y_coordinate';
  const longitude = 'x_coordinate';
  const filter =  latitude + " > " + p3.lat + " AND " + latitude + " < " +  p1.lat + " AND " + longitude + " < " +  p2.lon + " AND " + longitude + " > " + (p4.lon);
  return filter;
}
const buildQueryFilter = (params) => {
  const {operator, parameters} = params;
  let filter = [];
  const filterResult = { };
  try {
    parameters.map(projection => {
      const keys = Object.keys(projection);
      const values = Object.values(projection);
      // keys = [field_name, operator]
      // values = [field_value, operator_value]
      if (keys.length !== 2) {
        // warning - no default operator found..
        logger.info('>> Warning operator not defined !');
      }
      const [fieldName] = keys;
      const [fieldValue, operator_value] = values;
      if (fieldName == 'radius') {
        // radius parameters : [lat, lon, distance]
        const [lat, lon, distance] = fieldValue;
        filterResult.radius = fieldValue;
        filterResult.runFilterStatus = true;
        filter.push(buildRadiusFilter(lat, lon, distance));
      } else {
        if (operator_value == 'like') {
          const matchFieldValue = '%' + fieldValue + '%';
          filter.push(`${fieldName} ${operator_value} '${matchFieldValue}'`);
        } else {
          filter.push(`${fieldName} ${operator_value} '${fieldValue}'`);
        }
      }
    })
    const res = filter.join(` ${operator} `); // returns final SQL query for   DAO Layer
    filterResult.value = res;
    return filterResult;
  }
  catch(error) {
    logger.error(error.message);
    return null;
  }
}
const sqlQueryBuilder = (params, schema) => {
  try {
    console.log('>> schema', schema)
    const eateries = schema.views['eateries'];
    console.log('>> View eateries ', eateries);
    const filterResult = buildQueryFilter(params);
    const { radius } = filterResult;
    const query = `select distinct  ${eateries.query.columns} from ${eateries.name} where ${filterResult.value} ${eateries.query.limit}`;
    const runDatasetRadiusFilter = datasetRadiusFilter();
    logger.info('>> SQL QUERY  =' +  query);
    console.log('>> QUERY =', query);
    return { query,  runDatasetFilterStatus: filterResult.runFilterStatus, runDatasetFilter: (ds) => { return runDatasetRadiusFilter(ds, radius)}};
  }
  catch(error) {
    logger.error(error.message);
    return null;
  }
}
module.exports = () => {
  return sqlQueryBuilder;
}
