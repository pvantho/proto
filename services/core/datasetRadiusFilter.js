'use strict';
const logger = require ('../../config/winston');
const radiusFilterBuilderFactory = require ('../core/radiusFilterBuilder');

// this function is filtering all items where the distance from reference point < radius
const getDistanceBetween2Points = radiusFilterBuilderFactory().getDistanceFromLatLonInKm;

const filterByDistance = (dataset, lat, lon, radius, inside) => {
  const newDataset = dataset.filter((x) => {
    const {x_coordinate: x_lon, y_coordinate: x_lat} = x;
    const distance = parseInt(getDistanceBetween2Points(lat, lon, x_lat, x_lon) * 1000);
    x.distance = distance;
    return (inside ? distance <= radius : distance > radius);
  });
  logger.debug ('>> New Dataset total size = ' + newDataset.length);
  newDataset.sort( (a, b) => {
    if (a.distance < b.distance) return -1;
    if (a.distance > b.distance) return 1;
    return 0;
  })
  return newDataset;
}
const runDatasetRadiusFilter = (dataset, params) => {
  try {
    const [lat, lon, radius] = params;
    return filterByDistance(dataset, lat, lon, radius, true);
  }
  catch(error) {
    logger.error(error.message);
    return [];
  }
}


module.exports = () => {
  return runDatasetRadiusFilter;
}
