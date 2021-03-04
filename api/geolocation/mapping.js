'use strict';

const reverseGeoCoding = require ('../geolocation/queries/reverseGeoCoding');


const mapping = [
  // Queries (GET - HEADER)
  { path: '/api/geolocation' , controller: reverseGeoCoding(), type: 'Q', method: 'get'}


];


module.exports  = mapping;
