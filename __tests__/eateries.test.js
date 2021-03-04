 // Test Module for JEST
// Below is the sample of basic tests.

// we will use supertest to test HTTP requests/responses
const request = require("supertest");
// we also need our app for the correct routes!
const app = require("../app");

describe("GET /API/DATABASES ",  () => {
  test("It should respond with cbd_eateries as table name ", async () => {
    const response = await request(app.callback()).get("/api/database").set( {
      Authorization: 'Bearer jest_12345',
    });
    expect(response.body.result).toEqual([{"name":"sqlite_sequence"},{"name":"cbd_eateries"}]);
  });
});
describe("GET /API/EATERIES/COUNT ",  () => {
   test("It should respond a success status and count = 15232 items ", async () => {
     const response = await request(app.callback()).get("/api/eateries/count").set( {
       Authorization: 'Bearer jest_12345',
     });
     expect(response.body).toEqual({"status":"success","result":[{"count(*)":15232}]});

   });
 });
 describe("GET /API/EATERIES?q='$and': [{'number_seats':70}]}",  () => {
   test("It should respond with a count = 333", async () => {
     const response = await request(app.callback()).get("/api/eateries?q={\"$and\":[{\"number_seats\":70}]}").set( {
       Authorization: 'Bearer jest_12345',
     });
     expect(response.body.total).toEqual(333);

   });
 });
  describe("GET /API/EATERIES?q='$and': [{'seating_type':'outdoor'}, {\"radius\":[-37.815,144.974,100]}]}",  () => {
   test("It should respond a success status and count = 2 items ", async () => {
     const response = await request(app.callback()).get("/api/eateries?q={\"$and\":[{\"seating_type\":%20\"outdoor\"},%20{\"radius\":[-37.815,144.974,100]}]}").set( {
       Authorization: 'Bearer jest_12345',
     });
     expect(response.body.total).toEqual(2);
   });
 });

 describe("GET /API/EATERIES?q='$and': [{'number_seats':'20'}, {'seating_type':'outdoor'}, {\"radius\":[-37.815,144.974,100]}]}",  () => {
   test("It should respond a success status and count = 1item ", async () => {
     const response = await request(app.callback()).get("/api/eateries?q={\"$and\":[{\"number_seats\":20},%20{\"seating_type\":%20\"outdoor\"},%20{\"radius\":[-37.815,144.974,100]}]}").set( {
       Authorization: 'Bearer jest_12345',
     });;
     expect(response.body.total).toEqual(1);
   });
 })
