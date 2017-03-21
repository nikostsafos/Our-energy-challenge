// var elem = document.getElementById('countrySelect'); // Create variable element that stores value from menu 
// if(elem){ elem.addEventListener("load", lineChartGDPTPESCO2('#gdpTPESCO2', elem.value), false)}; // on load, graph default value 
// if(elem){ elem.addEventListener("load", lineChartGDPTPESCO2CAPITA('#gdpTPESCO2', elem.value), false)}; // on load, graph default value 
// if(elem){ elem.addEventListener("change", onSelectChange, false)}; // on change, run 'onSelectChange function' that graphs new country 

// function onSelectChange(){
//   var value = this.value;
//   lineChartGDPTPESCO2('#gdpTPESCO2', value);
//   lineChartGDPTPESCO2CAPITA('#gdpTPESCO2', value);
// }

(function () {

  // Set margin parameters 
  var margin = {top: 20, right: 40, bottom: 20, left: 40},
            width = 940/2 - margin.left - margin.right,
            height = width*.8 - margin.top - margin.bottom;

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
    //d3.select(id).selectAll('*').remove();
    var svgLineChart = d3.select('#pce')
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
        .attr('class', 'x axis')
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x)
        .tickFormat(d3.format(".0f"))
        .tickValues([1930, 1950, 1970, 1990, 2010]));

    // Append y axis
    svgLineChart.append("g")
        .attr('class', 'y axis')
        .call(d3.axisLeft(y)
        .ticks(5));

    // Append text for y axis label
    svgLineChart.append('text')
       .attr('class', 'y axis')
       .attr('transform', 'rotate(-90)')
       .attr('y', -40)
       .attr('x', -height/2)
       .attr('dy', '.71em')
       .style('text-anchor', 'end')
       // .attr('y', 6)
       // .attr('dy', '.71em')
       // .style('text-anchor', 'end')
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
        .attr('x', (width/2) - 20)
        .attr("y", height - (height * 1.03))
        .style('text-anchor', 'middle')
        .text('Total spending on energy');
    });
    return this;
})();

(function () {
  // Set margin parameters 
  var margin = {top: 20, right: 40, bottom: 20, left: 40},
            width = 940/2 - margin.left - margin.right,
            height = width*.8 - margin.top - margin.bottom;

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
    //d3.select(id).selectAll('*').remove();
    var svgLineChart = d3.select('#pce')
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
        .attr('class', 'x axis')
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x)
        .tickFormat(d3.format(".0f"))
        .tickValues([1930, 1950, 1970, 1990, 2010]));

    // Append y axis
    svgLineChart.append("g")
        .attr('class', 'y axis')
        .call(d3.axisLeft(y)
        .ticks(5));

    // Append text for y axis label
    svgLineChart.append('text')
       .attr('class', 'y axis')
       .attr('transform', 'rotate(-90)')
       .attr('y', -40)
       .attr('x', -height/2)
       .attr('dy', '.71em')
       .style('text-anchor', 'end')
       // .attr('y', 6)
       // .attr('dy', '.71em')
       // .style('text-anchor', 'end')
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
        .attr('x', (width/2) - 20)
        .attr("y", height - (height * 1.03))
        .style('text-anchor', 'middle')
        .text('Spending by product');
             });
    //console.log(data);
})();