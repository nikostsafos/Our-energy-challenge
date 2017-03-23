(function() {

var contentWidth = document.getElementById('content').clientWidth;

var plotRow;
  if (contentWidth >= 700) {plotRow = 3;} 
  else if (contentWidth >= 500) { plotRow = 2;} 
  else { plotRow = 1; }

var xWidth = contentWidth / plotRow;
var yHeight = contentWidth / plotRow;

lineFuelMix('#regionFuelMix', 'Africa', xWidth, yHeight);
lineFuelMix('#regionFuelMix', 'Asia Pacific', xWidth, yHeight);
lineFuelMix('#regionFuelMix', 'Europe & Eurasia', xWidth, yHeight);
lineFuelMix('#regionFuelMix', 'Middle East', xWidth, yHeight);
lineFuelMix('#regionFuelMix', 'North America', xWidth, yHeight);
lineFuelMix('#regionFuelMix', 'S. & Cent. America', xWidth, yHeight);

function updateGraph() {
  d3.select('#regionFuelMix').selectAll('*').remove();
  var contentWidth = document.getElementById('content').clientWidth;
  var plotRow;
    if (contentWidth >= 700) {plotRow = 3;} 
    else if (contentWidth >= 500) { plotRow = 2;} 
    else { plotRow = 1; }

  var xWidth = contentWidth / plotRow;
  var yHeight = contentWidth / plotRow;

  lineFuelMix('#regionFuelMix', 'Africa', xWidth, yHeight);
  lineFuelMix('#regionFuelMix', 'Asia Pacific', xWidth, yHeight);
  lineFuelMix('#regionFuelMix', 'Europe & Eurasia', xWidth, yHeight);
  lineFuelMix('#regionFuelMix', 'Middle East', xWidth, yHeight);
  lineFuelMix('#regionFuelMix', 'North America', xWidth, yHeight);
  lineFuelMix('#regionFuelMix', 'S. & Cent. America', xWidth, yHeight);  
}
  
window.onresize = updateGraph;

  // function lineFuelMix(pageid, country, plots, w, h) {
  function lineFuelMix(pageid, country, w, h) {

    // Set margin parameters 
    var margin = {top: 40, right: 20, bottom: 20, left: 40},
              width = w - margin.left - margin.right,
              height = h - margin.top - margin.bottom;

    // var margin = {top: 20, right: 20, bottom: 20, left: 40},
    //           width = (w/plots) - margin.left - margin.right,
    //           height = (h/plots) - margin.top - margin.bottom;

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
      var svgLineChart = d3.select(pageid)
                  .append('svg')
                  .attr('width', width + margin.left + margin.right)
                  .attr('height', height + margin.top + margin.bottom)
                  .append('g')
                  .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

      // Scale the functions defined above with range from variables 
      x.domain(d3.extent([1965, 2015]));
      y.domain(d3.extent([0,100]));
      // x.domain(d3.extent(data, function(d) { return d.Year; }));
      // y.domain(d3.extent(
      //   [].concat(data.map (function (item) {
      //     return (item.Oil);
      //   }), data.map ( function (item) {
      //     return (item.Coal);
      //   }), data.map (function (item) {
      //     return (item.Renewables);
      //   }))));

      svgLineChart.append("g")
          .attr('class', 'xaxis')
          .attr("transform", "translate(0," + height + ")")
          .call(d3.axisBottom(x)
          // .tickValues(function (d) {
          //   if (d.width > 300) {return [1965, 1975, 1985, 1995, 2005, 2015];}
          //   else {return [1965, 1990, 2015];}
          //   })
          //.tickValues([1965, 1975, 1985, 1995, 2005, 2015])
          .tickValues([1965, 1990, 2015])
          .tickFormat(d3.format(".0f")));

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
          .attr('x', width/2)
          .attr('transform', 'translate(10,0)')
          //.attr("y", height - (height * .975))
          .attr("y", height - (height * 1.03))
          .style('text-anchor', 'middle')
          .text(country);
    });
  return this;
  //console.log(data);
  };
})();

  // var xWidth = ((contentWidth > 500) ? contentWidth : contentWidth);
  // var yHeight = ((contentWidth > 500) ? xWidth : xWidth);

  // var plotRow;
  //   if (contentWidth >= 800) {plotRow = 3;} 
  //   else if (contentWidth >= 500) { plotRow = 2;} 
  //   else { plotRow = 1; }

  // lineFuelMix('#regionFuelMix', 'Africa', xWidth, yHeight);
  // lineFuelMix('#regionFuelMix', 'Asia Pacific', xWidth, yHeight);
  // lineFuelMix('#regionFuelMix', 'Europe & Eurasia', xWidth, yHeight);
  // lineFuelMix('#regionFuelMix', 'Middle East', xWidth, yHeight);
  // lineFuelMix('#regionFuelMix', 'North America', xWidth, yHeight);
  // lineFuelMix('#regionFuelMix', 'S. & Cent. America', xWidth, yHeight);
  
// lineFuelMix('#regionFuelMix', 'Africa', plotRow, xWidth, yHeight);
// lineFuelMix('#regionFuelMix', 'Asia Pacific', plotRow, xWidth, yHeight);
// lineFuelMix('#regionFuelMix', 'Europe & Eurasia', plotRow, xWidth, yHeight);
// lineFuelMix('#regionFuelMix', 'Middle East', plotRow, xWidth, yHeight);
// lineFuelMix('#regionFuelMix', 'North America', plotRow, xWidth, yHeight);
// lineFuelMix('#regionFuelMix', 'S. & Cent. America', plotRow, xWidth, yHeight);