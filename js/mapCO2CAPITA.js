  (function(){

    // var margin = {top: 40, right: 40, bottom: 40, left: 0},
    //       width = 950 - margin.left - margin.right,
    //       height = 500 - margin.top - margin.bottom;

    var width = 900;
    var height = 550;

    var peaks = d3.map();
    
    var projection = d3.geoMercator();
    // var projection = d3.geoEquirectangular();
    var path = d3.geoPath().projection(projection);

    var color = d3.scaleOrdinal()
                            .domain(['Before 1990',
                                 'From 1990 to 1999',
                                 'From 2000 to 2007',
                                 'From 2008 to 2013',
                                 'Highest was 2014'])
                            .range(['#d7191c',
                                '#fdae61',
                                '#ffffbf',
                                '#abd9e9',
                                '#2c7bb6',
                                '#bdbdbd']);

    var svg = d3.select("#mapCO2CAPITA")
        .append("svg")
        .attr("width", width)
        .attr("height", height);

    d3.queue()
        .defer(d3.json, 'https://d3js.org/world-110m.v1.json')
        .defer(d3.csv, 'data/peaks.csv', function(d) { peaks.set(d.id, d.CO2CAPITA); })
        .await(ready);

    function ready(error, json) {
      if (error) throw error;

      var countries = topojson.feature(json, json.objects.countries);
      var map = svg.append('g').attr('class', 'boundary');
      var world = map.selectAll('path').data(countries.features);

      projection.scale(1).translate([0, 0]);
      var b = path.bounds(countries);
      b[1][1] = 1.4; // for geoMercator() projection (to eliminate Antartica)
      var s = 1 / Math.max((b[1][0] - b[0][0]) / width, (b[1][1] - b[0][1]) / height);
      var t = [(width - s * (b[1][0] + b[0][0])) / 2, (height - s * (b[1][1] + b[0][1])) / 2];
      projection.scale(s*1.02).translate(t);

      world.enter()
           .append('path')
           .attr('d', path)
           .attr("fill", function(d) { return color(d.CO2CAPITA = peaks.get(d.id)); })
           .attr('d', path)
           .exit()
           .remove();

      // Draw the legend; the 25 is for the spacing between the items in the legend 
      // var legend = svg.selectAll('.legend')
      //                 .data(color.domain().filter(function(d, i) { return (i < 5); }))
      //                 .enter().append('g')
      //                 .attr('class', 'legend')
      //                 .attr('transform', function(d, i) { return 'translate(0,' + i * 25 + ')'; });

      //   // rect: box for each of the legend items 
      //     legend.append('rect')
      //           .attr('x', 50)
      //           .attr('y', height - 150)
      //           .attr('width', 18)
      //           .attr('height', 18)
      //           .style('fill', color);

      //   // text for legend 
      //     legend.append('text')
      //           .attr('x', 80)
      //           .attr('y', height - 140)
      //           .attr('dy', '.35em')
      //           .style('text-anchor', 'start')
      //           .text(function(d) { return d; });

      //     // text label for the x axis
      //     svg.append("text")      
      //        .attr('x', 30)
      //        .attr("y", height - 160 )
      //        .style('text-anchor', 'start')
      //        .text('Year of peak CO2 emissions per capita');
        }
    })();