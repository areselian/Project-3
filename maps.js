var myMap = L.map("map-id", {
  center: [39.0119, -98.4842],
  zoom: 5,
});

// Define variables for our tile layers
function buildMap(sample) {


  L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.light",
    accessToken: API_KEY
  }).addTo(myMap);

  d3.json("./static/data/NBAdataJSON2.json").then(function(nbaData) {
    var sorted_year = [];
    if (sample == "All Data"){
      sorted_year = nbaData;
    }
    else{
      for (var i=0, len = nbaData.length; i < len; i++) {
        if (nbaData[i].draft_year == sample) {
          sorted_year.push(nbaData[i]);
        };
      };   
    };
    // want College, Salary, Position, Team 
      // Colleges
      var college_map = _.map(sorted_year, function (college) {
        var data = college.college.split(",");
        var coll_count = data[0];
        var coll_loc = [college.lat, college.long];
        var college_d = [coll_count, coll_loc]

        return college_d
      });

      var college_total = _.countBy(college_map, function (coll) {
          return coll;
      });

      var college_data = []
      for (let [key, value] of Object.entries(college_total)) {
        var data = key.split(",");
        var lat = data[data.length -2];
        var long = data[data.length -1];
        var name = data[0, data.length -3]
        var name = data[0].trim()

        college_data.push({"name" : name, "location" : [lat, long], "count": value}) 
      };

      // // An array which will be used to store created collegeMarkers
      var collegeMarkers = [];
      for (var i = 0; i < college_data.length; i++) {

            // loop through the cities array, create a new marker, push it to the cityMarkers array
            collegeMarkers.push(
              L.circle(college_data[i].location,college_data[i].count*10000 ).bindPopup("<b>" + college_data[i].name + "</b><hr> Players Drafted: "+ college_data[i].count)
            );
          }

      // Now we can handle them as one group instead of referencing each individually
      collegeLayer = L.layerGroup(collegeMarkers);
      collegeLayer.addTo(myMap);
      
      var tes =[];
      for (let [key, value] of Object.entries(college_data)) {
        console.log(value.name.trim())
        tes.push(value.name.trim())
      };
        console.log(tes.sort())
      
      var salary_map = _.map(sorted_year, function (college) {
        // var data = college.salary.split(",");
        // var coll_count = data[0];
        // var coll_loc = [college.lat, college.long];
        // var college_d = [coll_count, coll_loc]

        return [college.name, college.salary]
      });

      console.log(salary_map)

      
      // Pass our map layers into our layer control
      // Add the layer control to the map
      // L.control.layers(baseMaps, overlayMaps).addTo(myMap);
      // L.control.layers(baseMaps).addTo(myMap);
  }).catch(function(error) {
    console.log(error);
  });
};

function updateMap(sample){
  myMap.removeLayer(collegeLayer);
  buildMap(sample);

}
