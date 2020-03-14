var myMap = L.map("map-id", {
  center: [39.0119, -98.4842],
  zoom: 4,
});
var layerscontrol
var legendcontrol
// Define variables for our tile layers
function buildMap(sample) {


  var light = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 8,
    id: "mapbox.light",
    accessToken: API_KEY
  });

  var street = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 8,
    id: "mapbox.streets",
    accessToken: API_KEY
  }).addTo(myMap);

  d3.json("./static/data/NBAdataJSON.json").then(function(nbaData) {
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
        if (college_data[i].count > 30){
          collegeMarkers.push(
            L.circle(college_data[i].location,college_data[i].count*10000).setStyle({fillColor :'red', fillOpacity: 0.3})
            .bindPopup("<b>" + college_data[i].name + "</b><hr> Players Drafted: "+ college_data[i].count)
          );
        }else if (college_data[i].count > 20){
          collegeMarkers.push(
            L.circle(college_data[i].location,college_data[i].count*10000).setStyle({fillColor :'yellow', fillOpacity: 0.3})
            .bindPopup("<b>" + college_data[i].name + "</b><hr> Players Drafted: "+ college_data[i].count)
          );
        }else if (college_data[i].count > 10){
          collegeMarkers.push(
            L.circle(college_data[i].location,college_data[i].count*10000).setStyle({fillColor :'green', fillOpacity: 0.3})
            .bindPopup("<b>" + college_data[i].name + "</b><hr> Players Drafted: "+ college_data[i].count)
          );
        }else{
          collegeMarkers.push(
            L.circle(college_data[i].location,college_data[i].count*10000).setStyle({fillColor :'blue', fillOpacity: 0.3})
            .bindPopup("<b>" + college_data[i].name + "</b><hr> Players Drafted: "+ college_data[i].count)
          );
        }
        }

      // Now we can handle them as one group instead of referencing each individually
      collegeLayer = L.layerGroup(collegeMarkers);
      collegeLayer.addTo(myMap);


    var heatArray = [];
    for (var i = 0; i < sorted_year.length; i++) {
      var salary = sorted_year[i].salary;
      if (salary) {
        var x = [];
        var intense = (salary / 35000000);
        x.push(sorted_year[i].lat,sorted_year[i].long, intense)
        heatArray.push(x); 
      }
    }
    var heatmap = L.heatLayer(heatArray, {
      minOpacity: 0.3,
      radius: 50,
      gradient: {0.15: 'blue', 0.5: 'lime', 0.9: 'red'},
    });

    salaryLayer = heatmap;
    salaryLayer.addTo(myMap);

      var baseMaps = {
        Street: street,
        Light: light,

      };
      var overlayMaps = {
        Collges: collegeLayer, 
        Salaries: salaryLayer
      }; 
      
      var legend = L.control({position: 'bottomright'});

      function getColor(d) {
        return d > 30   ? 'red' :
               d > 20   ? 'yellow' :
               d > 10   ? 'green' :
                          'blue';
    }


      legend.onAdd = function (map) {
      
          var div = L.DomUtil.create('div', 'info legend'),
              grades = [0, 10, 20, 30],
              labels = ["less than 10","more than 10","more than 20","more than 30" ];
      
          // loop through our density intervals and generate a label with a colored square for each interval
          for (var i = 0; i < grades.length; i++) {
              div.innerHTML +=
                  '<i style="background:' + getColor(grades[i] + 1) + '"></i> ' +
                  grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + ' players<br>' : '+ players');
          }
      
          return div;
      };
      
      legendcontrol = legend.addTo(myMap);
      layerscontrol = L.control.layers(baseMaps, overlayMaps).addTo(myMap)

  }).catch(function(error) {
    console.log(error);
  });
};


function updateMap(sample){
  myMap.eachLayer(function (layer) {
    myMap.removeLayer(layer);
});
  myMap.removeControl(layerscontrol);
  myMap.removeControl(legendcontrol)
  buildMap(sample);

}
