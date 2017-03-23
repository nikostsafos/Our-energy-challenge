(function() {

var contentWidth = document.getElementById('content').clientWidth;

var plotRow = 2.05;
  // if (contentWidth >= 500) {plotRow = 2;} 
  // else { plotRow = 1; }

var xWidth = contentWidth / plotRow;
var yHeight = contentWidth / plotRow;

graphPCETotal('#linePCE', xWidth, yHeight);
graphPCESegment('#linePCE', xWidth, yHeight);


function updateGraph() {
  
  d3.select('#linePCE').selectAll('*').remove();
  
  var contentWidth = document.getElementById('content').clientWidth;
  
  var plotRow = 2;
    // if (contentWidth >= 700) {plotRow = 3;} 
    // else if (contentWidth >= 500) { plotRow = 2;} 
    // else { plotRow = 1; }

  var xWidth = contentWidth / plotRow;
  var yHeight = contentWidth / plotRow;

  graphPCETotal('#linePCE', xWidth, yHeight);
  graphPCESegment('#linePCE', xWidth, yHeight);

}

window.onresize = updateGraph;

  // function lineFuelMix(pageid, country, plots, w, h) {
function graphPCETotal (pageid, w, h) {

  // Set margin parameters 
  var margin = {top: 40, right: 20, bottom: 20, left: 40},
              width = w - margin.left - margin.right,
              height = h - margin.top - margin.bottom;

  // x function map the circles along the x axis
  var x = d3.scaleLinear().range([0, width]);

  // y function map the variables along the y axis
  var y = d3.scaleLinear().range([height, 0]);

  // Create color scale mapping variables to colors 
  var colorLines = d3.scaleOrdinal()
                     .domain(['Total', 'Gasoline', 'Electricity', 'Gas'])
                     .range(['#91bfdb', '#e41a1c', '#4daf4a', '#377eb8']);

  // Read in data 
  d3.csv('data/pce.csv', function(error, data) {  
    data.forEach(function(d) {
      d.Year = d.Year;
      d.Date = d.Date;
      d.Gasoline = +d.Gasoline;
      d.Electricity = +d.Electricity;
      d.Gas = +d.Gas;
      d.Total = +d.Total;
    });

    // Create function for rendering lines 
    var lineTotal = d3.line()
        .defined(function(d) { return d; })
        .x(function(d) { return x(d.Year); })
        .y(function(d) { return y(d.Total); });

    // Create SVG item 
    var svgLineChart = d3.select(pageid)
                .append('svg')
                .attr('width', width + margin.left + margin.right)
                .attr('height', height + margin.top + margin.bottom)
                .append('g')
                .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    // Scale the functions defined above with range from variables 
    x.domain(d3.extent([1929,2015]));
    y.domain(d3.extent([0,10]));

    // Append x axis 
    svgLineChart.append("g")
        .attr('class', 'xaxis')
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x)
        .tickFormat(d3.format(".0f"))
        .tickValues([1930, 1950, 1970, 1990, 2010]));

    // Append y axis
    svgLineChart.append("g")
        .attr('class', 'yaxis')
        .call(d3.axisLeft(y)
        .ticks(5));

    // Append text for y axis label
    svgLineChart.append('text')
       .attr('class', 'yaxis')
       .attr('transform', 'rotate(-90)')
       .attr('y', -40)
       .attr('x', -height/2)
       .style('text-anchor', 'middle')
       .attr('dy', '.71em')
       .text('percent of total');
    
    // Draw line 
    svgLineChart.append("path")
        .datum(data.filter(function(d) { return d; }))
        .attr("fill", "None")
        .attr("stroke", '#91bfdb')
        .attr("stroke-width", 2)
        .attr("d", lineTotal);

    // text label for the x axis
    svgLineChart.append("text")
        .attr('x', width/2)
        .attr("y", height - (height -10))
        .style('text-anchor', 'middle')
        .text('Total spending on energy');
    });
    return this;
}

function graphPCESegment (pageid, w, h) {

  // Set margin parameters 
  var margin = {top: 40, right: 20, bottom: 20, left: 40},
              width = w - margin.left - margin.right,
              height = h - margin.top - margin.bottom;

  // x function map the circles along the x axis
  var x = d3.scaleLinear().range([0, width]);

  // y function map the variables along the y axis
  var y = d3.scaleLinear().range([height, 0]);

  // Create color scale mapping variables to colors 
  var colorLines = d3.scaleOrdinal()
                     .domain(['Total', 'Gasoline', 'Electricity', 'Gas'])
                     .range(['91bfdb', '#e41a1c', '#4daf4a', '#377eb8']);

  // Read in data 
  d3.csv('data/pce.csv', function(error, data) {  
    data.forEach(function(d) {
      d.Year = d.Year;
      d.Date = d.Date;
      d.Gasoline = +d.Gasoline;
      d.Electricity = +d.Electricity;
      d.Gas = +d.Gas;
      d.Total = +d.Total;
    });

    // Create function for rendering lines 
    var lineGasoline = d3.line()
        .defined(function(d) { return d; })
        .x(function(d) { return x(d.Year); })
        .y(function(d) { return y(d.Gasoline); });

    var lineGas = d3.line()
        .defined(function(d) { return d; })
        .x(function(d) { return x(d.Year); })
        .y(function(d) { return y(d.Gas); });

    var lineElectricity = d3.line()
        .defined(function(d) { return d; })
        .x(function(d) { return x(d.Year); })
        .y(function(d) { return y(d.Electricity); });

    // Create SVG item 
    var svgLineChart = d3.select(pageid)
                .append('svg')
                .attr('width', width + margin.left + margin.right)
                .attr('height', height + margin.top + margin.bottom)
                .append('g')
                .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    // Scale the functions defined above with range from variables 
    x.domain(d3.extent([1929,2015]));
    y.domain(d3.extent([0,10]));

    // Append x axis 
    svgLineChart.append("g")
        .attr('class', 'xaxis')
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x)
        .tickFormat(d3.format(".0f"))
        .tickValues([1930, 1950, 1970, 1990, 2010]));

    // Append y axis
    svgLineChart.append("g")
        .attr('class', 'yaxis')
        .call(d3.axisLeft(y)
        .ticks(5));

    // Append text for y axis label
    svgLineChart.append('text')
       .attr('class', 'yaxis')
       .attr('transform', 'rotate(-90)')
       .attr('y', -40)
       .attr('x', -height/2)
       .style('text-anchor', 'middle')
       .attr('dy', '.71em')
       .text('percent of total');
    
    // Draw line 
    svgLineChart.append("path")
        .datum(data.filter(function(d) { return d; }))
        .attr("fill", "None")
        .attr("stroke", '#e41a1c')
        .attr("stroke-width", 2)
        .attr("d", lineGasoline);

     // Draw line 
     svgLineChart.append("path")
        .datum(data.filter(function(d) { return d; }))
        .attr("fill", "None")
        .attr("stroke", '#377eb8')
        .attr("stroke-width", 2)
        .attr("d", lineElectricity);

    // Draw line
    svgLineChart.append("path")
        .datum(data.filter(function(d) { return d; }))
        .attr("fill", "None")
        .attr("stroke", '#4daf4a')
        .attr("stroke-width", 2)
        .attr("d", lineGas);

    // text label for the x axis
    svgLineChart.append("text")
        .attr('x', width/2)
        .attr("y", height - (height -10))
        .style('text-anchor', 'middle')
        .text('Spending by product');
             });
    //console.log(data);
}
})();