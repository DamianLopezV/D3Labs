/*
*    main.js
*/

var heights = [];
var names = [];
var maxHeight = 0;
var margin = {top: 10, right: 10, bottom: 150, left:100};
var width = 600;
var height = 400;

var g = d3.select("body")
	.append("svg")
		.attr("width", width + margin.right + margin.left)
		.attr("height", height + margin.top + margin.bottom)
	.append("g")
		.attr("transform", "translate(" + margin.left + ", " + margin.top + ")");

d3.json("data/buildings.json").then((data)=> {
    data.forEach((d)=>{

		d.height = +d.height;
        if (d.height > maxHeight){
            maxHeight = d.height;
        }
	});
	var buildings = data.map((d) => { return d.name; });

    var x = d3.scaleBand()
        .domain(buildings)
        .range([0,600])
        .paddingInner(0.3)
        .paddingOuter(0.3);

    var y = d3.scaleLinear()
        .domain([0,828])
        .range([0,400]);

    var colors = d3.scaleOrdinal()
        .domain(buildings)
        .range(d3.schemeSet3);

    var rectangles = g.selectAll("rect").data(data);

    rectangles.enter()
        .append("rect")
            .attr("width", 40)
            .attr("height", (d) => {return y(d.height);})
            .attr("x",(d) => {return x(d.name)})
            .attr("y",(d) => {return 400 - y(d.height);})
            .attr("fill", (d) => {return colors(d.height);});

    var bottomAxis = d3.axisBottom(x);
        g.append("g")
            .attr("class", "bottom axis")
            .attr("transform", "translate(0, " + height+ ")")
            .call(bottomAxis)
        .selectAll("text")
            .attr("y", 10)
            .attr("x", -5)
            .attr("text-anchor", "end")
            .attr("transform", "rotate(-40)");
            
    var leftAxis = d3.axisLeft(y).ticks(5)
        .tickFormat((d) => { return 800 - d + "m"; })
        g.append("g")
            .attr("class", "left axis")
            .call(leftAxis);

    g.append("text")
        .attr("class", "y axis-label")
        .attr("x", width / 2)
        .attr("y", height + 140)
        .attr("font-size", "20px")
        .attr("text-anchor", "middle")
        .style("fill","black")
        .text("The word's tallest buildings");

    g.append("text")
        .attr("class", "y axis-label")
        .attr("x", - (height / 2))
        .attr("y", -60)
        .attr("font-size", "20px")
        .attr("text-anchor", "middle")
        .attr("transform", "rotate(-90)")
        .style("fill","black")
        .text("Height (m)");
                
}).catch((error)=> {
    console.log(error);
});

