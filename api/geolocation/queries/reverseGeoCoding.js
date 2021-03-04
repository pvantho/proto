'use strict';




const reverseGeoCoding = (ctx) => {
  // q={"lat":...,"lng":...}
  const params = ctx.request.query;
  console.log(params);
  ctx.body = "geolocation";
}


module.exports = () => {
  return reverseGeoCoding;
}
