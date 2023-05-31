/*
*    main.js
*/

var svg = d3.select("#chart-area").append("svg")
    .attr("width",400)
    .attr("height",400);

var rect = svg.append("rect")
	.attr("x", 20)
	.attr("y", 20)
	.attr("width", 200)
	.attr("height", 200)
	.attr("fill","red");

var circle = svg.append("circle")
    .attr("cx",120)
    .attr("cy",120)
    .attr("r",70)
    .attr("fill","blue");

