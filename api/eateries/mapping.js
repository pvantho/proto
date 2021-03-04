'use strict';


const tablesQuery = require ('./queries/tablesQuery');
const eateriesQuery = require ('./queries/eateriesQuery');
const eateriesCountQuery = require ('./queries/countQuery');
const categoriesQuery = require ('./queries/categoriesQuery');
const categoriesFilteredQuery = require ('./queries/categoriesFilteredQuery');
const logRequest = require('../../middlewares/logRequest');
const userAuthentication = require('../../middlewares/userAuthentication');
const eateryRequestValidation = require('../../middlewares/eateryValidation');
const namesQuery = require('./queries/namesQuery');
const countNamesQuery = require('./queries/countNamesQuery');
const namesFilteredQuery = require ('./queries/namesFilteredQuery');
const namesByCategoriesFilteredQuery = require ('./queries/namesByCategoriesFilteredQuery');
const countCategoriesQuery = require('./queries/countCategoriesQuery');

const mapping = [
  // Queries (GET - HEADER)
  { path: '/api/database' , controller: tablesQuery(), type: 'Q', method: 'get'},
  { path: '/api/eateries/count' , controller: eateriesCountQuery(), type: 'Q', method: 'get'},
  { path: '/api/eateries/categories/count' , controller: countCategoriesQuery(), type: 'Q', method: 'get'},
  { path: '/api/eateries/categories/:value' , controller: categoriesFilteredQuery(), type: 'Q', method: 'get'},
  { path: '/api/eateries/categories' , controller: categoriesQuery(), type: 'Q', method: 'get'},
  { path: '/api/eateries/names' , controller: namesQuery(), type: 'Q', method: 'get'},
  { path: '/api/eateries/names/count' , controller: countNamesQuery(), type: 'Q', method: 'get'},
  { path: '/api/eateries/names/:name' , controller: namesFilteredQuery(), type: 'Q', method: 'get'},
  { path: '/api/eateries/names/categories/:category', controller:namesByCategoriesFilteredQuery(), type:'Q', method: 'get'},
  { path: '/api/eateries' , controller: eateriesQuery(), type: 'Q', method: 'get',
    middleware: [logRequest(), userAuthentication(), eateryRequestValidation()]},

  // Commands (POST-DEL)
  /* { path: '/api/eateries' , controller: eateriesCommand(), type: 'C', method: 'post' , middleware: [logRequest(), userAuthentication()]}*/

];


module.exports  = mapping;
