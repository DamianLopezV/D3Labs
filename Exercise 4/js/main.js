/*
*    main.js
*/

var heights = [];
var maxHeight = 0;
d3.json("data/buildings.json").then((data)=> {
    data.forEach((d)=>{

		d.height = +d.height;
        heights.push(d.height);
        if (d.height > maxHeight){
            maxHeight = d.height;
        }
	});
	console.log(data);

    var svg = d3.select("#chart-area").append("svg")
        .attr("width", 500)
        .attr("height", 500);

    var x = d3.scaleBand()
        .domain(heights)
        .range([0,400])
        .paddingInner(0.3)
        .paddingOuter(0.3);

    var y = d3.scaleLinear()
        .domain([0,828])
        .range([0,400]);

    var colors = d3.scaleOrdinal()
        .domain(heights)
        .range(d3.schemeSet3);

    var rectangles = svg.selectAll("rect").data(heights);

    rectangles.enter()
        .append("rect")
            .attr("width", 40)
            .attr("height", (d) => {return y(d);})
            .attr("x",(d) => {return x(d)})
            .attr("y",(d) => {return 400 - y(d);})
            .attr("fill", (d) => {return colors(d);});

}).catch((error)=> {
    console.log(error);
});

