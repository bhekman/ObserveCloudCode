// -----------------------------------------------------
// Backend code for Observe.
//
// Written by Brad Hekman
// Last Updated: 3/18/15
// -----------------------------------------------------

// Calls the Google Places API on behalf of the app (https://developers.google.com/places/documentation/search).
// Returns the status and text portions of the httpResponse as a Map<String, Object>.
// TODO: Add in keyword filtering

// Google Places call constant parameters
places_place_search_url = "https://maps.googleapis.com/maps/api/place/nearbysearch/json";
places_api_key = "AIzaSyBy2f5Fq5y3neWyIz1jRXxvDaH_HeVar1o";
places_types = "establishment"; // TODO: does this exclude any places that we care about?
places_opennow = "true"; 
places_rankby = "prominence"; // this is default
places_radius = 150;

// Arguments: latitude, longitude
// Usage:  ParseCloud.callFunctionInBackground(
//           "get_places",
//           {"latitude": latitude, "longitude": longitude},
//           callback
//         );
Parse.Cloud.define("get_places", function(request, response) {

  var place_search_params = 
    "location=" + String(request.params.latitude) + "," + String(request.params.longitude)
    + "&key=" + String(places_api_key)
    + "&types=" + String(places_types)
    + "&opennow=" + String(places_opennow)
    + "&rankby=" + String(places_rankby)
    + "&radius=" + String(places_radius);

  var full_url = String(places_place_search_url + "?" + place_search_params);
  console.log("Full URL is: " + full_url);

  var result = {};
  Parse.Cloud.httpRequest({
      method: "GET",
      url: full_url,
      success: function(httpResponse) {
        console.log("success — httpResponse text: " + httpResponse.text);
        result["status"] = httpResponse.status;
        result["text"] = httpResponse.text;
        response.success(result);
      },
      error: function(httpResponse) {
        console.error(httpResponse.text);
        result["status"] = httpResponse.status;
        response.error(result);
      }
  });
});

// Arguments: place_id (google)
// Usage:  ParseCloud.callFunctionInBackground(
//           "get_places",
//           {"place_id", place_id},
//           callback
//         );
Parse.Cloud.define("get_email", function(request, response) {
  console.log(request.place_id);
  // TODO
  result["email"] = "test@gmail.com";
  response.success(result);
});
