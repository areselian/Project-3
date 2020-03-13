var year_data;
// funtion to find multiple max values
function multiplemax(test_array) { 
  let arr = Object.values(test_array);
  let max = Math.max(...arr)
  let listtest =[]
  for (let [key, value] of Object.entries(test_array)) {
    if(value == max){
      listtest.push(key)
    }
  }
  return [listtest, max];
};
function buildMetadata(sample) {
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

    // find the player highest salary for that years draft
    var maxSalary = _.max(sorted_year, function (player) {
      return player.salary;
    });

    var salary_index = sorted_year.indexOf(maxSalary); 
    var high_salary = sorted_year[salary_index];
    
    // most drafted position
    var position_drafted = _.countBy(sorted_year, function (player) {
      return player.position;
    });
    var top_position = multiplemax(position_drafted);
    
    // most drafted college
    var college_drafted = _.countBy(sorted_year, function (player) {
      return player.college;
    });
    var top_college = multiplemax(college_drafted);

    // Inserting metadata
    var sampleMeta = d3.select("#sample-metadata").html("");
    sampleMeta.append("p").text("Highest salary: ").attr("class","b")
    .append("span").text(`${high_salary.name}, ${high_salary.position} at ${high_salary.team}`).attr("class", "n");
    sampleMeta.append("p").text("Top Drafted Position: ").attr("class","b")
    .append("span").text(`${top_position[0]}, ${top_position[1]}`).attr("class", "n");
    sampleMeta.append("p").text("Top Drafted College: ").attr("class","b")
    .append("span").text(`${top_college[0]}, ${top_college[1]}`).attr("class", "n");
    
    year_data = sorted_year;

  });
};


function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");
    // Use the list of sample names to populate the select options
  d3.json("./static/data/NBAdataJSON.json").then((data) => {
    var year_list = ["All Data"]
    for (var i = 0; i < data.length; i++) {
      var player_year = data[i].draft_year
        if (!(player_year in year_list)) {
          year_list.push(player_year)
          
        }
    }
    year_list = (Array.from(new Set(year_list))).sort()
   
    year_list.reverse().forEach((year) => {
      selector
        .append("option")
        .text(year)
        .property("value", year);
    });
    
    // Use the first sample from the list to build the initial plots
    const firstSample = year_list.reverse()[year_list.length -1];
    
    buildMetadata(firstSample);
    buildPosition(firstSample);
    buildMap(firstSample);
    buildPlotly(firstSample);
  });
}

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildMetadata(newSample);
  buildPosition(newSample);
  updateMap(newSample);  
  buildPlotly(newSample);
};

// Initialize the dashboard
init();

