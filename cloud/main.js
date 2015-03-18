
// Use Parse.Cloud.define to define as many cloud functions as you want.
// For example:
Parse.Cloud.define("hello", function(request, response) {
  response.success("Hello world!");
});


// WIP: to fetch places based on lat/lon
places_place_search_url = "https://maps.googleapis.com/maps/api/place/nearbysearch/json";
places_api_key = "AIzaSyBy2f5Fq5y3neWyIz1jRXxvDaH_HeVar1o";
places_radius = 50;
Parse.Cloud.define("get_places", function(request, response) {

  var place_search_params = "location="
    + request.latitude
    + "%2C"
    + request.longitude
    + "&radius="
    + places_radius
    + "&key="
    + places_api_key;

  Parse.Cloud.httpRequest({
      method: "GET",
      url: places_place_search_url,
      params: place_search_params,
      success: function(httpResponse) {
        response(httpResponse.text);
      },
      error: function(httpResponse) {
        response('Request failed with response code ' + httpResponse.status)
      }
  });

  //response.success("Query will be: ="
    //+ request.latitude
    //+ "%2C"
    //+ request.longitude
    //+ "&radius=50&key=AIzaSyBy2f5Fq5y3neWyIz1jRXxvDaH_HeVar1o");
});
