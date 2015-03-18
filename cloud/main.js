
// Use Parse.Cloud.define to define as many cloud functions as you want.
// For example:
Parse.Cloud.define("hello", function(request, response) {
  response.success("Hello world!");
});

// Test function from https://parse.com/questions/calling-a-parsecloud-function-from-android
Parse.Cloud.define("test", function(request, response) {
  var text = "hello world";
  var jsonObject = {
    "answer": text
  };

  response.success(jsonObject);
});


// Calls the Google Places API on behalf of the app.
// Returns the status and text portions of the httpResponse as a Map<String, Object>.
// TODO: Return only the stuff that we need in an array format.
places_place_search_url = "https://maps.googleapis.com/maps/api/place/nearbysearch/json";
places_api_key = "AIzaSyBy2f5Fq5y3neWyIz1jRXxvDaH_HeVar1o";
places_radius = 50;
Parse.Cloud.define("get_places", function(request, response) {

  var place_search_params = "location="
    + String(request.params.latitude)
    + "%2C"
    + String(request.params.longitude)
    + "&types=establishment"
    + "&opennow=true"
    + "&radius="
    + String(places_radius)
    + "&key="
    + places_api_key;

  // combined manually because httpRequest() was ignoring the params.
  var full_url = String(places_place_search_url + "?" + place_search_params);
  console.log("Full URL is: " + full_url);

  Parse.Cloud.httpRequest({
      method: "GET",
      url: full_url,
      success: function(httpResponse) {
        console.log("httpResponse text: " + httpResponse.text);

        var jsonObject = {};
        jsonObject["status"] = httpResponse.status;
        jsonObject["text"] = httpResponse.text;
        response.success(jsonObject);
      },
      error: function(httpResponse) {
        console.error(httpResponse.text);

        var jsonObject = {};
        jsonObject["status"] = httpResponse.status;
        jsonObject["text"] = httpResponse.text;
        response.error(jsonObject);
      }
  });
});
