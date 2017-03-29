(function() {

var contentWidth = document.getElementById('content').clientWidth;

var plotRow;
  if (contentWidth >= 500) {plotRow = 2.05;} 
  else { plotRow = 2.05; }

var xWidth = contentWidth / plotRow;
var yHeight = contentWidth / plotRow;

var elem = document.getElementById('countrySelect'); // Create variable element that stores value from menu 
if(elem){ elem.addEventListener("load", lineFuelMix('#fuelMix', elem.value, xWidth, yHeight), false)}; // on load, graph default value 
if(elem){ elem.addEventListener("load", lineFuelMixPCT('#fuelMix', elem.value, xWidth, yHeight), false)}; // on load, graph default value 
if(elem){ elem.addEventListener("change", onSelectChange, false)}; // on change, run 'onSelectChange function' that graphs new country 

function onSelectChange(){
  var value = this.value;
  lineFuelMix('#fuelMix', value, xWidth, yHeight);
  lineFuelMixPCT('#fuelMix', value, xWidth, yHeight);
}

function updateGraph() {
  
  var contentWidth = document.getElementById('content').clientWidth;
  var plotRow;
  if (contentWidth >= 500) {plotRow = 2.05;} 
  else { plotRow = 2.05; }

  var xWidth = contentWidth / plotRow;
  var yHeight = contentWidth / plotRow;

  var elem = document.getElementById('countrySelect'); // Create variable element that stores value from menu 
  if(elem){ elem.addEventListener("load", lineFuelMix('#fuelMix', elem.value, xWidth, yHeight), false)}; // on load, graph default value 
  if(elem){ elem.addEventListener("load", lineFuelMixPCT('#fuelMix', elem.value, xWidth, yHeight), false)}; // on load, graph default value 
}

window.onresize = updateGraph;


function lineFuelMix(id, country, w, h) {

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
                     .domain(['Oil', 'Coal', 'Gas', 'Nuclear', 'Hydro', 'Renewables'])
                     .range(['#2ca25f', '#636363', '#d73027', '#fc8d59', '#91bfdb', '#fee090']);

  // Read in data 
  d3.csv('data/bpstats.csv', function(error, data) {  
    data.forEach(function(d) {
      d.Country = d.Country;
      d.Year = +d.Year;
      d.Oil = +d.Oil;
      d.OilPCT = +d.OilPCT;
      d.Coal = +d.Coal;
      d.CoalPCT = +d.CoalPCT;
      d.Gas = +d.Gas;
      d.GasPCT = +d.GasPCT;
      d.Hydro = +d.Hydro;
      d.HydroPCT = +d.HydroPCT;
      d.Nuclear = +d.Nuclear;
      d.NuclearPCT = +d.NuclearPCT;
      d.Renewables = +d.Renewables;
      d.RenewablesPCT = +d.RenewablesPCT;
      d.Total = +d.Total;
      d.TotalPCT = +d.TotalPCT;
    });

  // Subset the data based on variables selected 
    data = data.filter(function (d) { return d.Country == country } );

    // Create function for rendering lines 
    var lineCoal = d3.line()
        .defined(function(d) { return d; })
        .x(function(d) { return x(d.Year); })
        .y(function(d) { return y(d.Coal); });

    var lineGas = d3.line()
        .defined(function(d) { return d; })
        .x(function(d) { return x(d.Year); })
        .y(function(d) { return y(d.Gas); });

    var lineHydro = d3.line()
        .defined(function(d) { return d; })
        .x(function(d) { return x(d.Year); })
        .y(function(d) { return y(d.Hydro); });

    var lineNuclear = d3.line()
        .defined(function(d) { return d; })
        .x(function(d) { return x(d.Year); })
        .y(function(d) { return y(d.Nuclear); });

    var lineOil = d3.line()
        .defined(function(d) { return d; })
        .x(function(d) { return x(d.Year); })
        .y(function(d) { return y(d.Oil); });

    var lineRenewables = d3.line()
        .defined(function(d) { return d; })
        .x(function(d) { return x(d.Year); })
        .y(function(d) { return y(d.Renewables); });

    // Create SVG item 
    d3.select(id).selectAll('*').remove();
    var svgLineChart = d3.select(id)
                .append('svg')
                .attr('width', width + margin.left + margin.right)
                .attr('height', height + margin.top + margin.bottom)
                .append('g')
                .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    // Scale the functions defined above with range from variables 
    x.domain(d3.extent([1965, 2015]));
    //y.domain(d3.extent([0,100]));
    y.domain(d3.extent(
      [].concat(
          data.map (function (item) {
        return (item.Oil);
      }), data.map ( function (item) {
        return (item.Coal);
      }), data.map ( function (item) {
        return (item.Gas);
      }), data.map ( function (item) {
        return (item.Nuclear);
      }), data.map ( function (item) {
        return (item.Hydro);
      }), data.map (function (item) {
        return (item.Renewables);
      }))));

    // Append x axis 
    svgLineChart.append("g")
        .attr('class', 'xaxis')
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x)
        .tickFormat(d3.format(".0f"))
        // .tickValues([1965, 1975, 1985, 1995, 2005, 2015]));
        .tickValues([1965, 1990, 2015]));

    // Append y axis
    svgLineChart.append("g")
        .attr('class', 'yaxis')
        .call(d3.axisLeft(y)
        .ticks(5));

    // Append text for y axis label
    svgLineChart.append('text')
        .attr('transform', 'rotate(-90)')
        .attr('y', -40)
        .attr('x', -height/2)
        .attr('dy', '.71em')
        .style('text-anchor', 'middle')
        .text('mmtoe');
    
    // Draw line 
    svgLineChart.append("path")
        // .datum(data.filter(function(d) { return d; }))
        .datum(data)
        .attr("fill", "None")
        .attr("stroke", '#636363')
        .attr("stroke-width", 2)
        .attr("d", lineCoal);

     // Draw line 
     svgLineChart.append("path")
        .datum(data)
        .attr("fill", "None")
        .attr("stroke", '#d73027')
        .attr("stroke-width", 2)
        .attr("d", lineGas);

    // Draw line
    svgLineChart.append("path")
        .datum(data)
        .attr("fill", "None")
        .attr("stroke", '#91bfdb')
        .attr("stroke-width", 2)
        .attr("d", lineHydro);

    svgLineChart.append("path")
        .datum(data)
        .attr("fill", "None")
        .attr("stroke", '#2ca25f')
        .attr("stroke-width", 2)
        .attr("d", lineOil);

    svgLineChart.append("path")
        .datum(data)
        .attr("fill", "None")
        .attr("stroke", '#fc8d59')
        .attr("stroke-width", 2)
        .attr("d", lineNuclear);

    svgLineChart.append("path")
        .datum(data)
        .attr("fill", "None")
        .attr("stroke", '#fee090')
        .attr("stroke-width", 2)
        .attr("d", lineRenewables);
    
    // // text label for the x axis
    svgLineChart.append("text")
        .attr('x', (width/2) - 20)
        .attr("y", height - (height * 1.03))
        .style('text-anchor', 'middle')
        .text(country);
  });
return this;
//console.log(data);
};

function lineFuelMixPCT(id, country, w, h) {

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
                     .domain(['OilPCT', 'CoalPCT', 'GasPCT', 'NuclearPCT', 'HydroPCT', 'RenewablesPCT'])
                     .range(['#2ca25f', '#636363', '#d73027', '#fc8d59', '#91bfdb', '#fee090']);

  // Read in data 
  d3.csv('data/bpstats.csv', function(error, data) {  
    data.forEach(function(d) {
      d.Country = d.Country;
      d.Year = +d.Year;
      d.Oil = +d.Oil;
      d.OilPCT = +d.OilPCT;
      d.Coal = +d.Coal;
      d.CoalPCT = +d.CoalPCT;
      d.Gas = +d.Gas;
      d.GasPCT = +d.GasPCT;
      d.Hydro = +d.Hydro;
      d.HydroPCT = +d.HydroPCT;
      d.Nuclear = +d.Nuclear;
      d.NuclearPCT = +d.NuclearPCT;
      d.Renewables = +d.Renewables;
      d.RenewablesPCT = +d.RenewablesPCT;
      d.Total = +d.Total;
      d.TotalPCT = +d.TotalPCT;
    });

  // Subset the data based on variables selected 
    data = data.filter(function (d) { return d.Country == country } );

    // Create function for rendering lines 
    var lineCoalPCT = d3.line()
        .defined(function(d) { return d; })
        .x(function(d) { return x(d.Year); })
        .y(function(d) { return y(d.CoalPCT); });

    var lineGasPCT = d3.line()
        .defined(function(d) { return d; })
        .x(function(d) { return x(d.Year); })
        .y(function(d) { return y(d.GasPCT); });

    var lineHydroPCT = d3.line()
        .defined(function(d) { return d; })
        .x(function(d) { return x(d.Year); })
        .y(function(d) { return y(d.HydroPCT); });

    var lineNuclearPCT = d3.line()
        .defined(function(d) { return d; })
        .x(function(d) { return x(d.Year); })
        .y(function(d) { return y(d.NuclearPCT); });

    var lineOilPCT = d3.line()
        .defined(function(d) { return d; })
        .x(function(d) { return x(d.Year); })
        .y(function(d) { return y(d.OilPCT); });

    var lineRenewablesPCT = d3.line()
        .defined(function(d) { return d; })
        .x(function(d) { return x(d.Year); })
        .y(function(d) { return y(d.RenewablesPCT); });

    // Create SVG item 
    //d3.select(id).selectAll('*').remove();
    var svgLineChart = d3.select(id)
                .append('svg')
                .attr('width', width + margin.left + margin.right)
                .attr('height', height + margin.top + margin.bottom)
                .append('g')
                .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    // Scale the functions defined above with range from variables 
    x.domain(d3.extent([1965, 2015]));
    // y.domain(d3.extent([0,100]));
    // x.domain(d3.extent(data, function(d) { return d.Year; }));
    y.domain(d3.extent(
      [].concat(
          data.map (function (item) {
        return (item.OilPCT);
      }), data.map ( function (item) {
        return (item.CoalPCT);
      }), data.map ( function (item) {
        return (item.GasPCT);
      }), data.map ( function (item) {
        return (item.NuclearPCT);
      }), data.map ( function (item) {
        return (item.HydroPCT);
      }), data.map (function (item) {
        return (item.RenewablesPCT);
      }))));

    // Append x axis 
    svgLineChart.append("g")
        .attr('class', 'xaxis')
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x)
        .tickFormat(d3.format(".0f"))
        // .tickValues([1965, 1975, 1985, 1995, 2005, 2015]));
        .tickValues([1965, 1990, 2015]));

    // Append y axis
    svgLineChart.append("g")
        .attr('class', 'yaxis')
        .call(d3.axisLeft(y)
        .ticks(5));

    // Append text for y axis label
    svgLineChart.append('text')
         .attr('transform', 'rotate(-90)')
         .attr('y', -40)
         .attr('x', -height/2)
         .attr('dy', '.71em')
         .style('text-anchor', 'middle')
         .text('% of total');
    
    // Draw line 
    svgLineChart.append("path")
        // .datum(data.filter(function(d) { return d; }))
        .datum(data)
        .attr("fill", "None")
        .attr("stroke", '#636363')
        .attr("stroke-width", 2)
        .attr("d", lineCoalPCT);

     // Draw line 
     svgLineChart.append("path")
        .datum(data)
        .attr("fill", "None")
        .attr("stroke", '#d73027')
        .attr("stroke-width", 2)
        .attr("d", lineGasPCT);

    // Draw line
    svgLineChart.append("path")
        .datum(data)
        .attr("fill", "None")
        .attr("stroke", '#91bfdb')
        .attr("stroke-width", 2)
        .attr("d", lineHydroPCT);

    svgLineChart.append("path")
        .datum(data)
        .attr("fill", "None")
        .attr("stroke", '#2ca25f')
        .attr("stroke-width", 2)
        .attr("d", lineOilPCT);

    svgLineChart.append("path")
        .datum(data)
        .attr("fill", "None")
        .attr("stroke", '#fc8d59')
        .attr("stroke-width", 2)
        .attr("d", lineNuclearPCT);

    svgLineChart.append("path")
        .datum(data)
        .attr("fill", "None")
        .attr("stroke", '#fee090')
        .attr("stroke-width", 2)
        .attr("d", lineRenewablesPCT);
    
    // // text label for the x axis
    svgLineChart.append("text")
        .attr('x', (width/2) - 20)
        //.attr("y", height - (height * .975))
        .attr("y", height - (height * 1.03))
        .style('text-anchor', 'middle')
        .text(country);
  });
return this;
//console.log(data);
}
})();