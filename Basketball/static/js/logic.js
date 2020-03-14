var myMap = L.map("map", {
  center: [37.09, -95.71],
  zoom: 5
});

// Adding a tile layer (the background map image) to our map
// We use the addTo method to add objects to our map
var light = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.streets",
  accessToken: API_KEY
}).addTo(myMap);

d3.json("NBAdataJSON.json").then(function(data){
  var collegeMarkers = [];
  collegeLayer = L.layerGroup(collegeMarkers);
  for (var i = 0; i < data.length; i++) {
    var college = data[i].college;
    collegeMarkers.push (L.marker(college.location)
      .bindPopup("<h1>" + college.college + "</h1>"))
  };
  var heatArray = [];
  for (var i = 0; i < data.length; i++) {
    var salary = data[i].salary; 
    if (salary) {
      heatArray.push(data[i].location); 
    }}
  L.heatLayer(heatArray, {
    radius: 20,
    blur: 35
  });
  salaryLayer = L.layerGroup(heatArray);
  var baseMaps = {
    Light: light,
  };
  var overlayMaps = {
    Collges: collegeLayer, 
    Salaries: salaryLayer
  }; 
  L.control.layers(baseMaps, overlayMaps).addTo(myMap)
});