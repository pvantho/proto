'use strict';

// reminder :  Y = Lat , X = Long
const  deg2rad = (deg) => deg * (Math.PI/180);
const rad2deg = (rad)=> rad * (180 / Math.PI);

const  getDistanceFromLatLonInKm = (y1,x1,y2,x2) =>  {
  const R = 6371; // Radius of the earth in km
  const dLat = deg2rad(y2-y1);  // deg2rad below
  const dLon = deg2rad(x2-x1);
  const a =
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(y1)) * Math.cos(deg2rad(y2)) *
    Math.sin(dLon/2) * Math.sin(dLon/2)
  ;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  const d = R * c; // Distance in km
  return d;
}

/**
 * Calculates the end-point from a given source at a given range (meters)
 * and bearing (degrees). This methods uses simple geometry equations to
 * calculate the end-point.
 *
 * @param point
 *           Point of origin
 * @param range
 *           Range in meters
 * @param bearing
 *           Bearing in degrees
 * @return End-point from the source given the desired range and bearing.
 */
const  calculateDerivedPosition = ( point, range,bearing) =>
{
  const EarthRadius = 6371000; // m

  const latA = deg2rad(point.lat);
  const lonA = deg2rad(point.lon);
  const angularDistance = range / EarthRadius;
  const trueCourse = deg2rad(bearing);

  let lat = Math.asin(
  Math.sin(latA) * Math.cos(angularDistance) +
  Math.cos(latA) * Math.sin(angularDistance)
  * Math.cos(trueCourse));

  const dlon = Math.atan2(
  Math.sin(trueCourse) * Math.sin(angularDistance)
  * Math.cos(latA),
  Math.cos(angularDistance) - Math.sin(latA) * Math.sin(lat));

  let lon = ((lonA + dlon + Math.PI) % (Math.PI * 2)) - Math.PI;

  lat = rad2deg(lat);
  lon = rad2deg(lon);

  const newPoint = { lon,  lat};

  return newPoint;

}


module.exports = () => {
  return {
    getDistanceFromLatLonInKm,
    calculateDerivedPosition
  }
}


