(function(){
var margin = {top: 40, right: 40, bottom: 20, left: 40},
    			width = 940 - margin.left - margin.right,
    			height = 350 - margin.top - margin.bottom;

// x function map the circles along the x axis
var x = d3.scaleLinear().range([0, width]);

// y function map the variables along the y axis
var y = d3.scaleLinear().range([height, 0]);

// b function map adjusts radius for dots
var b = d3.scaleLinear().range([0,20]);

// color function will map regions to colors 
var color = d3.scaleOrdinal()
    			    .domain(['Non-OECD Europe and Eurasia',
    					  	 'Africa',
    					  	 'Non-OECD Americas',
    					  	 'OECD',
    					  	 'Middle East',
    					  	 'Asia'])
				    .range(['#d73027',
				    	    '#fc8d59',
				    	    '#fee090',
				    	    '#e0f3f8',
				    	    '#91bfdb',
				    	    '#4575b4']);

var svgGDPCAPITACO2CAPITA = d3.select('#scatterGDPCAPITACO2CAPITA')
            .append('svg')
            .attr('width', width + margin.left + margin.right)
			.attr('height', height + margin.top + margin.bottom)
			.append('g')
			.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

// Read in data and start function that creates the chart (within the data read function)
d3.csv('data/data2014.csv', function(error, data) {
	data.forEach(function(d) {
		d.Country = d.Country;
		d.Region = d.Region;
		d.CO2 = +d.CO2;
		d.CO2CAPITA = +d.CO2CAPITA;
		d.ENERGYCAPITA = +d.ENERGYCAPITA;
		d.GDP = +d.GDP;
		d.GDPCAPITA = +d.GDPCAPITA;
		d.POP = +d.POP;
		d.TPES = +d.TPES;
		d.TPESGDP = +d.TPESGDP
	});

	// Scale the functions defined above with range from variables 
	x.domain(d3.extent(data, function(d) { return d.GDPCAPITA; }));
	y.domain(d3.extent(data, function(d) { return d.CO2CAPITA; }));
	//b.domain(d3.extent(data, function (d) { return d.GDP;}));

	// Draw the dots [trying to add tooltip functionality]
	svgGDPCAPITACO2CAPITA.selectAll('.dot')
	   .data(data)
	   .enter().append('circle')
	   .attr('class', 'dot')
	   .attr('cx', function(d) { return x(d.GDPCAPITA); })
	   .attr('cy', function(d) { return y(d.CO2CAPITA); })
	   //.attr('r', function(d) {return b(d.GDP); })				   
	   .attr('r', 5)				   
	   .style('fill', function(d) { return color(d.Region); })
	   .on('mouseover', function(d) {

	   //Get this bar's x/y values, then augment for the tooltip
			var xPosition = parseFloat(d3.select(this).attr('cx'));
			var yPosition = parseFloat(d3.select(this).attr('cy')) - 5;

			//Create the tooltip label
			svgGDPCAPITACO2CAPITA.append('text')
				.attr('id', 'tooltip')
				.attr('x', xPosition)
				.attr('y', yPosition)
				.attr('text-anchor', 'middle')
				.attr('fill', 'black')
				.html(d['Country']);
			    //.html(d['Country'] + '<br/> (' + x(d.GDPCAPITA) + ", " + y(d.ENERGYCAPITA) + ")");
				})
		//Remove the tooltip
		.on('mouseout', function() {
			d3.select('#tooltip').remove(); 
		});

	// Draw the x axis using x axis function defined above 
	svgGDPCAPITACO2CAPITA.append('g')
		.attr('class', 'x axis')
		.attr('transform', 'translate(0,' + height + ')')
		.call(d3.axisBottom(x));

	svgGDPCAPITACO2CAPITA.append('text')
		.attr('class', 'label')
		.attr('transform', 'translate(0,' + height + ')')
		.attr('x', width)
		.attr('y', -6)
		.style('text-anchor', 'end')
		.text('GDP per capita ($2005)');

	// Draw the y axis using y axis function defined above 
	svgGDPCAPITACO2CAPITA.append('g')
	   .attr('class', 'y axis')
	   .call(d3.axisLeft(y));

	// text label for the y axis
	svgGDPCAPITACO2CAPITA.append('text')
	   .attr('class', 'label')
	   .attr('transform', 'rotate(-90)')
	   .attr('y', 6)
	   .attr('dy', '.71em')
	   .style('text-anchor', 'end')
	   .text('CO2 emissions per capita (tons)');

	// text label for plot title
	svgGDPCAPITACO2CAPITA.append("text")      
	   .attr('x', width/2 - 100)
	   .attr("y", height - (height) - 10)
	   .style('text-anchor', 'start')
	   .text('GDP vs. CO2 emissions per capita (2014)');
});
})();
