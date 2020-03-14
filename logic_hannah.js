// Create a map object
var myMap = L.map("map", {
  center: [37.09, -95.71],
  zoom: 5
});

L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.streets-basic",
  accessToken: API_KEY
}).addTo(myMap);



// Grabbing our GeoJSON data..
// d3.json(link, function(data) {
//   // Creating a GeoJSON layer with the retrieved data
//   L.geoJson(data).addTo(map);
// });

//

// console.log(data);
// console.log(data[0].lat)
// console.log(data[0].long)

// var college_count = _.countBy(data, function (player) {
//   return player.college;
// });

// console.log(college_count)

// //var maps = [];
//     for (var i=0, len = data.length; i < len; i++) {
//       if (data[i].college == college) {
//         maps.push(data[i]);
//       };
//     };

//console.log(maps)

// //Change the size and color of circular markers here
// for (var i = 0; i < data.length; i++) {
//   console.log(data[i].Location, data[i].count)
//   // var latLong = [data[i].lat, data[i].long]
//   L.circle(data[i].Location, data[i].count)
//   .addTo(myMap);
//   };

// });