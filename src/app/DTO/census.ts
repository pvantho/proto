export class CensusDto {
  census_year: number;
  block_id: number;
  property_id: number;
  street_address: string;
  number_of_seats: number;
  seating_type: string;
  trading_name: string;
}

export class QueryFormSchema {
  seatingType: string;
  radius: number;
  tradingName: string;
  seats: number;
}
