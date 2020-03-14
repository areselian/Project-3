// want College, Salary, Position, Team 
// Colleges

d3.json(link, function(data) {
     // Creating a GeoJSON layer with the retrieved data
    L.geoJson(data).addTo(map);

d3.json("sorted_year.json", function(response) {
  response.forEach(function(element){
      console.log(element.location);
  });
});

var colleges = d3.json("sorted_year.json", function(response) {
  L.geoJson(data).addTo(map); 
  }); 

// An array which will be used to store created collegeMarkers
var collegeMarkers = [];

for (var i = 0; i < colleges.length; i++) {
  // loop through the cities array, create a new marker, push it to the cityMarkers array
  collegeMarkers.push(
    L.marker(college[i].location).bindPopup("<h1>" + college[i].name + "</h1>")
  );
}

// Now we can handle them as one group instead of referencing each individually
var collegeLayer = L.layerGroup(collegeMarkers);

// Salary
var salary = [
    {
     
    }
  ];
  
  // An array which will be used to store created collegeMarkers
  var salaryMarkers = [];
  
  for (var i = 0; i < salary.length; i++) {
    // loop through the cities array, create a new marker, push it to the cityMarkers array
    salaryMarkers.push(
      L.marker(college[i].salary).bindPopup("<h1>" + college[i].salary + "</h1>")
    );
  }
// Now we can handle them as one group instead of referencing each individually
var salaryLayer = L.layerGroup(salaryMarkers);

// Position
var position = [
    {
     
    }
  ];
  
  // An array which will be used to store created collegeMarkers
  var positionMarkers = [];
  
  for (var i = 0; i < position.length; i++) {
    // loop through the cities array, create a new marker, push it to the cityMarkers array
    positionMarkers.push(
      L.marker(college[i].position).bindPopup("<h1>" + college[i].position + "</h1>")
    );
  }
// Now we can handle them as one group instead of referencing each individually
var positionLayer = L.layerGroup(positionMarkers);

// Salary
var NBATeam = [
    {
     
    }
  ];
  
  // An array which will be used to store created collegeMarkers
  var teamMarkers = [];
  
  for (var i = 0; i < NBATeam.length; i++) {
    // loop through the cities array, create a new marker, push it to the cityMarkers array
    teamMarkers.push(
      L.marker(college[i].team).bindPopup("<h1>" + college[i].team + "</h1>")
    );
  }
// Now we can handle them as one group instead of referencing each individually
var teamLayer = L.layerGroup(teamMarkers);

// Define variables for our tile layers
var light = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.light",
  accessToken: API_KEY
});

// Only one base layer can be shown at a time
var baseMaps = {
  Light: light,
};

var overlayMaps = {

}; 

// Create map object and set default layers
var myMap = L.map("map", {
  center: [46.2276, 2.2137],
  zoom: 6,
  layers: [light, collegeLayer, salaryLayer, teamLayer, positionLayer,]
});

// Pass our map layers into our layer control
// Add the layer control to the map
L.control.layers(baseMaps, overlayMaps).addTo(myMap);

// // An array containing each city's name, location, and population
// var cities = [{
//   location: [40.7128, -74.0059],
//   name: "New York",
//   population: "8,550,405"
// },
// {
//   location: [41.8781, -87.6298],
//   name: "Chicago",
//   population: "2,720,546"
// },
// {
//   location: [29.7604, -95.3698],
//   name: "Houston",
//   population: "2,296,224"
// },
// {
//   location: [34.0522, -118.2437],
//   name: "Los Angeles",
//   population: "3,971,883"
// },
// {
//   location: [41.2524, -95.9980],
//   name: "Omaha",
//   population: "446,599"
// }
// ];

// var colleges = [{
//   college: "Arizona State University",
//   location: [33.4242398999999, -111.9280527],
//   count: "1"
// },
// {
//   college: "Baylor University",
//   location: [31.5469132, -97.1210998],
//   count: "6"
// },
// {
//   college: "Boston College",
//   location: [42.3355488, -71.1684945],
//   count: "1"
// },
// {
//   college: "Bowling Green State University",
//   location: [41.3797788, -83.6300826],
//   count: "1"
// },
// {
//   college: "Brigham Young University",
//   location: [40.2518435, -111.6493156],
//   count: "1"
// }];
// Loop through the cities array and create one marker for each city, bind a popup containing its name and population add it to the map


// // Loop through the cities array and create one marker for each city, bind a popup containing its name and population add it to the map
// for (var i = 0; i < colleges.length; i++) {
//   var college = colleges[i];
//   L.marker(colleges.location)
//     .bindPopup("<h1>" + colleges.college + "</h1>")
//     .addTo(myMap);
// }; 

