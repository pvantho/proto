'use strict';

const compose = require('koa-compose');

const eateriesMapping = require('./eateries/mapping');
const geoMapping = require('./geolocation/mapping');

const buildMapping = (router, config) => {
   config.map((x) => {
    const {method, controller, path,  middleware} = x;
    if (middleware) {
      router[method](path, compose(middleware), controller);
    } else {
      router[method](path, controller);
    }
  });
}

const configureMappings = (router) => {
  const mappings = [];
  const method = {
    add: (m) => {
      mappings.push(m);
      return method;
    },
    run: () => {
      mappings.map( (m) => {
        buildMapping(router, m);
      })
    }
  }
   return method;
}
module.exports = {
  use :  (router) => {
    try {
      configureMappings(router)
        .add(eateriesMapping)
        .add(geoMapping)
        .run();
    } catch (error) {
      console.log('>> error ', error);
    }
  }
}
