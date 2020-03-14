url = "https://files.slack.com/files-pri/TNPF1JR43-FVBEJMZ8V/download/nbadatajson.json"

function buildPlotly(sample) {
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

  var types = _.groupBy(sorted_year, 'team');
  var teams_Avg = []
  for (let [key, value] of Object.entries(types)) {
    
  var team = []
    for (var i=0, len = value.length; i < len; i++) {
    var sal_list = []
    sal_list.push(value[i].salary)
    }
    var sala_avg = [] 
    let sum_sala = sal_list.reduce((previous, current) => current += previous);
    let team_avg = sum_sala / sal_list.length;
    team.push(key, team_avg);  
  
    teams_Avg.push(team);
  };

  /// MAX SALARY

  var salary_max_map = _.groupBy(sorted_year, function (player) {
    return [player.team]
});

var sal_max_team = []

for (let [key, value] of Object.entries(salary_max_map)) {
    
  var team = []
  var sal_list = []
    for (var i=0, len = value.length; i < len; i++) {
    sal_list.push(value[i].salary)
    }

  let max = Math.max.apply(Math,sal_list);
  team.push(key,max);  
  
  sal_max_team.push(team);
  };

  // build the chart

  var x_val = []; // list of teams
  var y1_val = []; // list with teams avg salary
  var y2_val = []; // list with teams max salary

      
  for (var i=0, len = teams_Avg.length; i < len; i++) {
  
  x_val.push(teams_Avg[i][0])
  y1_val.push(teams_Avg[i][1])
 
  }
  for (var i=0, len = sal_max_team.length; i < len; i++) {
  
    y2_val.push(sal_max_team[i][1])
   
  }
      var trace1 = {
        type: 'scatter',
        x: x_val,
        y: y1_val,
        mode: 'markers',
        name: 'AVG SALARY',
        marker: {
          color: 'rgba(123, 86, 224, 0.85)',
          line: {
            color: 'rgba(156, 165, 196, 1.0)',
            width: 1,
          },
          symbol: 'circle',
          size: 16
        }
      };

      var trace2 = {
        x: x_val,
        y: y2_val,
        mode: 'markers',
        name: 'Max Salary',
        marker: {
          color: 'rgba(184, 71, 71, 0.85)',
          line: {
            color: 'rgba(217, 217, 217, 1.0)',
            width: 1,
          },
          symbol: 'circle',
          size: 16
        }
      };
      
      var data = [trace1, trace2];
      
      var layout = {
        title: 'NBA Salaries by Team',
        xaxis: {
          showgrid: false,
          showline: true,
          linecolor: 'rgb(102, 102, 102)',
          titlefont: {
            font: {
              color: 'rgb(204, 204, 204)'
            }
          },
          tickangle : 65,
          tickfont: {
            font: {
              color: 'rgb(102, 102, 102)'
            }
          },
          autotick: false,
          rotate: 80,
          // dtick: 10,
          ticks: 'outside',
          tickcolor: 'rgb(102, 102, 102)'
        },
        margin: {
          l: 40,
          r: 40,
          b: 160,
          t: 80
        },
        padding: 50,
        legend: {
          font: {
            size: 10,
          },
          yanchor: 'middle',
          xanchor: 'right'
        },
        paper_bgcolor: 'rgb(223, 238, 255)',
        plot_bgcolor: 'rgb(223, 238, 255)',
        hovermode: 'closest'
      };

      Plotly.newPlot('salaries', data, layout);
})
}
