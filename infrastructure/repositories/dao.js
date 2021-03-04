// dao.js
'use strict';

const sqlite3 = require('sqlite3');
const DATABASE_PATH = './database/eateries.db';

const DataProvider = {
    database: '',
    name: 'sqlite3',
    init: async (dbFilePath, createTable) => {
      DataProvider.database = new sqlite3.Database(dbFilePath, (err) => {
        if (err) {
          console.log('Could not connect to database', err);
        } else {
          console.log('Connected to database');
          if (createTable) {
            DataProvider.createTable();
          }
        }
      });
    },
    runSQL: (sql) => {
      const db = DataProvider.database;
      const q =  new Promise((resolve, reject) => {
         db.all(sql, (err, result) => {
           if (err) {
             reject(err);
           } else {
             resolve(result);
           }
         });
      });
      return q;
    },
    query: async  (sql) => {
      return  DataProvider.runSQL(sql);
    },

    command: (sql, params) => {
      DataProvider.database.run(sql, params);
    },
    createTable:   () => {
      console.log('>> Create Table....')
      const sql = `
        CREATE TABLE cbd_eateries (
  Census_year INTEGER,Block_ID INTEGER,Property_ID INTEGER,property ID INTEGER,Street_address TEXT,CLUE_small_area TEXT,
  Trading_name TEXT,Industry_code INTEGER,Industry_description TEXT,
  Seating_type TEXT,Number_seats INTEGER,x_coordinate REAL,y_coordinate REAL,Location TEXT);`;

      return  DataProvider.database.run(sql);
    }
};
 //insert into cb_eateries (census_year,block_id,property_id,property_id,street_address,clue_small_area,trading_name,industry_code,industry_description,seating_type,number_seats,x_coordinate,x_coordinate,location)
//select census_year,block_id,property_id,property_id,street_address,clue_small_area,trading_name,industry_code,industry_description,seating_type,number_seats,x_coordinate,x_coordinate,location from eateries;


//create  view eateries as


//  select distinct trading_name, location, seating_type, number_seats, y_coordinate ,x_coordinate , street_address  from cbd_eateries order by trading_name

//create index trading_name_index on cbd_eateries(trading_name)
//create index number_seats_index  on cbd_eateries(number_seats)
//create index x_coordinate_index on cbd_eateries(x_coordinate)
//create index y_coordinate_index on cbd_eateries(y_coordinate)
//create index Seating_type_index on cbd_eateries(Seating_type)
const Dao  = {
  open: async (dbFilePath) =>  {
    try {
      await DataProvider.init(dbFilePath, false);
    }
    catch(error) {
      console.error(error.message);
    }

  },
  query: async (sql) => {
    try {
      return await DataProvider.query(sql);
    }
    catch(error) {
      console.error(error.message);
    }
  }
}

 Dao.open(DATABASE_PATH);

module.exports = () => {
  return  Dao;
}
