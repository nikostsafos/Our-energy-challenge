function plotCountrySingle(id, country) {

  // Set margin parameters 
  var margin = {top: 20, right: 40, bottom: 20, left: 40},
            width = 940/4 - margin.left - margin.right,
            height = 500/3 - margin.top - margin.bottom;

  // x function map the circles along the x axis
  var x = d3.scaleLinear().range([0, width]);

  // y function map the variables along the y axis
  var y = d3.scaleLinear().range([height, 0]);

  // Create color scale mapping variables to colors 
  var colorLines = d3.scaleOrdinal()
                     .domain(['GDP', 'GDP (capita)', 
                              'Energy use', 'Energy use (capita)',
                              'CO2 emissions', 'CO2 emissions (capita)'])
                     .range(['#e41a1c', '#e41a1c',
                             '#4daf4a', '#4daf4a',
                             '#377eb8', '#377eb8']);

  // Read in data 
  d3.csv('data/data1990.csv', function(error, data) {  
    data.forEach(function(d) {
      d.Country = d.Country;
      d.Region = d.Region;
      d.Year = +d.Year;
      d.CO2 = +d.CO2;
      d.CO2CAPITA = +d.CO2CAPITA;
      d.ENERGY = +d.ENERGY;
      d.ENERGYCAPITA = +d.ENERGYCAPITA;
      d.GDP = +d.GDP;
      d.GDPCAPITA = +d.GDPCAPITA;
    });

  // Subset the data based on variables selected 
    data = data.filter(function (d) { return d.Country == country } );

    // Create function for rendering lines 
    var lineGDP = d3.line()
        .defined(function(d) { return d; })
        .x(function(d) { return x(d.Year); })
        .y(function(d) { return y(d.GDP); });

    var lineCO2 = d3.line()
        .defined(function(d) { return d; })
        .x(function(d) { return x(d.Year); })
        .y(function(d) { return y(d.CO2); });

    var lineENERGY = d3.line()
        .defined(function(d) { return d; })
        .x(function(d) { return x(d.Year); })
        .y(function(d) { return y(d.ENERGY); });

    // Create SVG item 
    var svgLineChart = d3.select(id)
                .append('svg')
                .attr('width', width + margin.left + margin.right)
                .attr('height', height + margin.top + margin.bottom)
                .append('g')
                .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    // Scale the functions defined above with range from variables 
    //x.domain(d3.extent(data, function(d) { return d.Year; }));
    x.domain(d3.extent([1971,2014]));
    y.domain(d3.extent(
      [].concat(data.map (function (item) {
        return (item.GDP);
      }), data.map ( function (item) {
        return (item.CO2);
      }), data.map (function (item) {
        return (item.ENERGY);
      }))));

    // Append x axis 
    svgLineChart.append("g")
        .attr('class', 'x axis')
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x)
        .tickFormat(d3.format(".0f"))
        .tickValues([1971, 1980, 1990, 2000, 2014]));

    // Append y axis
    svgLineChart.append("g")
        .attr('class', 'y axis')
        .call(d3.axisLeft(y)
        .ticks(3));

    // Append text for y axis label
    svgLineChart.append('text')
       .attr('class', 'y axis')
       .attr('transform', 'rotate(-90)')
       .attr('y', -40)
       .attr('x', -height/2)
       .style('text-anchor', 'middle')
       .attr('dy', '.71em')
       //.attr('y', 6)
       //.style('text-anchor', 'end')
       .text('1990 = 100');

    // Draw line 
    svgLineChart.append("path")
        .datum(data.filter(function(d) { return d; }))
        .attr("fill", "None")
        .attr("stroke", '#e41a1c')
        .attr("stroke-width", 2)
        .attr("d", lineGDP);

     // Draw line 
     svgLineChart.append("path")
        .datum(data.filter(function(d) { return d; }))
        .attr("fill", "None")
        .attr("stroke", '#377eb8')
        .attr("stroke-width", 2)
        .attr("d", lineCO2);

    // Draw line
    svgLineChart.append("path")
        .datum(data.filter(function(d) { return d; }))
        .attr("fill", "None")
        .attr("stroke", '#4daf4a')
        .attr("stroke-width", 2)
        .attr("d", lineENERGY);

    // Draw legend 
    // var legend = svgLineChart.selectAll('.legend')
    //                     .data(['GDP', 'Energy use', 'CO2 emissions'])
    //                     .enter().append('g')
    //                     .attr('class', 'legend')
    //                     .attr('transform', function(d, i) { return 'translate(0,' + i * 20 + ')'; });

    // text label for the x axis
    svgLineChart.append("text")
        .attr('x', (width/2) - 20)
        .attr("y", height - (height * .975))
        .style('text-anchor', 'middle')
        .text(country);
             });
    return this;
    //console.log(data);
};