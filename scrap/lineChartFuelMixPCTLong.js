function lineChartFuelMixPCT(id, country, plots, ratio) {

  // Set margin parameters 
  var margin = {top: 20, right: 40, bottom: 20, left: 40},
            width = 940/(plots) - margin.left - margin.right,
            height = (width*ratio) - margin.top - margin.bottom;

  // x function map the circles along the x axis
  var x = d3.scaleLinear().range([0, width]);

  // y function map the variables along the y axis
  var y = d3.scaleLinear().range([height, 0]);

  // Create color scale mapping variables to colors 
  var colorLines = d3.scaleOrdinal()
                     .domain(['Oil', 'Coal', 'Gas', 'Nuclear', 'Hydro', 'Renewables'])
                     .range(['#2ca25f', '#636363', '#d73027', '#fc8d59', '#91bfdb', '#fee090']);

  // Read in data 
  d3.csv('data/bpstatsLong.csv', function(error, data) {  
    data.forEach(function(d) {
      d.Country = d.Country;
      d.Year = +d.Year;
      d.Variable = d.Variable;
      d.Value = +d.Value;
    });

  // Subset the data based on variables selected 
    data = data.filter(function (d) { return d.Country == country } );

    // Create function for rendering lines 
    var lineVariable = d3.line()
        .defined(function(d) { return d; })
        .x(function(d) { return x(d.Year); })
        .y(function(d) { return y(d.Value); });

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

    svgLineChart.append("g")
        .attr('class', 'x axis')
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
        .attr('class', 'y axis')
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
        .datum(data.filter(function(d) { return d.Variable == 'CoalPCT'; }))
        //.datum(data)
        .attr("fill", "None")
        .attr("stroke", '#636363')
        .attr("stroke-width", 2)
        .attr("d", lineVariable);

     // Draw line 
     svgLineChart.append("path")
        .datum(data.filter(function(d) { return d.Variable == 'GasPCT'; }))
        .attr("fill", "None")
        .attr("stroke", '#d73027')
        .attr("stroke-width", 2)
        .attr("d", lineVariable);

    // Draw line
    svgLineChart.append("path")
        .datum(data.filter(function(d) { return d.Variable == 'HydroPCT'; }))
        .attr("fill", "None")
        .attr("stroke", '#91bfdb')
        .attr("stroke-width", 2)
        .attr("d", lineVariable);

    svgLineChart.append("path")
        .datum(data.filter(function(d) { return d.Variable == 'OilPCT'; }))
        .attr("fill", "None")
        .attr("stroke", '#2ca25f')
        .attr("stroke-width", 2)
        .attr("d", lineVariable);

    svgLineChart.append("path")
        .datum(data.filter(function(d) { return d.Variable == 'NuclearPCT'; }))
        .attr("fill", "None")
        .attr("stroke", '#fc8d59')
        .attr("stroke-width", 2)
        .attr("d", lineVariable);

    svgLineChart.append("path")
        .datum(data.filter(function(d) { return d.Variable == 'RenewablesPCT'; }))
        .attr("fill", "None")
        .attr("stroke", '#fee090')
        .attr("stroke-width", 2)
        .attr("d", lineVariable);
    
    // // text label for the x axis
    svgLineChart.append("text")
        .attr('x', (width/2) - 20)
        .attr('transform', 'translate(10,0)')
        //.attr("y", height - (height * .975))
        .attr("y", height - (height * 1.03))
        .style('text-anchor', 'middle')
        .text(country);
  });
return this;
//console.log(data);
};