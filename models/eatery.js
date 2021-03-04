

// Eatery DTO

const dto = {
  census_year: 'number',
  block_ID: 'number',
  base_property_Id: 'number',
  street_address: 'string',
  clue_small_area: 'string',
  trading_name: 'string',
  industry_code: 'number',
  industry_description: 'string',
  seating_type: 'string',
  number_seats: 'number',
  x_coordinate: 'real',
  y_coordinate: 'real',
  location: 'string'
}
const dtoClass = {
  census_year : null,
  block_ID: null,
  base_property_Id: null,
  street_address: null,
  clue_small_area: null,
  trading_name: null,
  industry_code: null,
  industry_description: null,
  seating_type: null,
  number_seats: null,
  x_coordinate: null,
  y_coordinate: null,
  location: null
 }

module.exports =   {
  dtoClass: () => {
    return dtoClass;
  },
  dtoType: () => {
    return dto;
  }
};
