function lineChartFuelMix(id, country) {

  // Set margin parameters 
  var margin = {top: 20, right: 40, bottom: 20, left: 40},
            width = 940/5 - margin.left - margin.right,
            height = 500/3.5 - margin.top - margin.bottom;

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
      d.Coal = +d.Coal;
      d.Gas = +d.Gas;
      d.Hydro = +d.Hydro;
      d.Nuclear = +d.Nuclear;
      d.Oil = +d.Oil;
      d.Renewables = +d.Renewables;
      d.Total = +d.Total;
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
    var svgLineChart = d3.select(id)
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

    // Append x axis 
    svgLineChart.append("g")
        .attr('class', 'x axis')
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x)
        .tickFormat(d3.format(".0f"))
        .tickValues([1965, 1990, 2015]));

    // Append y axis
    svgLineChart.append("g")
        .attr('class', 'y axis')
        .call(d3.axisLeft(y)
        .ticks(5));

    // Append text for y axis label
    // svgLineChart.append('text')
    //    .attr('transform', 'rotate(-90)')
    //    .attr('y', 6)
    //    .attr('dy', '.71em')
    //    .style('text-anchor', 'end')
    //    .text('1990 = 100');
    
    // Draw line 
    svgLineChart.append("path")
        .datum(data.filter(function(d) { return d; }))
        .attr("fill", "None")
        .attr("stroke", '#636363')
        .attr("stroke-width", 2)
        .attr("d", lineCoal);

     // Draw line 
     svgLineChart.append("path")
        .datum(data.filter(function(d) { return d; }))
        .attr("fill", "None")
        .attr("stroke", '#d73027')
        .attr("stroke-width", 2)
        .attr("d", lineGas);

    // Draw line
    svgLineChart.append("path")
        .datum(data.filter(function(d) { return d; }))
        .attr("fill", "None")
        .attr("stroke", '#91bfdb')
        .attr("stroke-width", 2)
        .attr("d", lineHydro);

    svgLineChart.append("path")
        .datum(data.filter(function(d) { return d; }))
        .attr("fill", "None")
        .attr("stroke", '#2ca25f')
        .attr("stroke-width", 2)
        .attr("d", lineOil);

    svgLineChart.append("path")
        .datum(data.filter(function(d) { return d; }))
        .attr("fill", "None")
        .attr("stroke", '#fc8d59')
        .attr("stroke-width", 2)
        .attr("d", lineNuclear);

    svgLineChart.append("path")
        .datum(data.filter(function(d) { return d; }))
        .attr("fill", "None")
        .attr("stroke", '#fee090')
        .attr("stroke-width", 2)
        .attr("d", lineRenewables);

    // Draw legend 
    // var legend = svgLineChart.selectAll('.legend')
    //                     .data(['GDP', 'Energy use', 'CO2 emissions'])
    //                     .enter().append('g')
    //                     .attr('class', 'legend')
    //                     .attr('transform', function(d, i) { return 'translate(0,' + i * 20 + ')'; });

            // // text label for the x axis
            svgLineChart.append("text")
               .attr('x', (width/2) - 20)
               .attr("y", height - (height * .975))
               .style('text-anchor', 'start')
               .text(country);
             });
    return this;
    //console.log(data);
};