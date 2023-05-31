/*
*    main.js
*/

var margin = {top: 10, right: 10, bottom: 150, left:100};
var width = 600;
var height = 400;

var g = d3.select("body")
	.append("svg")
		.attr("width", width + margin.right + margin.left)
		.attr("height", height + margin.top + margin.bottom)
	.append("g")
		.attr("transform", "translate(" + margin.left + ", " + margin.top + ")");

d3.json("data/revenues.json").then((data)=> {
    data.forEach((d)=>{

		d.revenue = +d.revenue;
	});
	var revenues = data.map((d) => { return d.month; });

    var x = d3.scaleBand()
        .domain(revenues)
        .range([0,600])
        .paddingInner(0.3)
        .paddingOuter(0.3);

    var y = d3.scaleLinear()
        .domain([0, 50])
        .range([0,400]);

    var rectangles = g.selectAll("rect").data(data);

    rectangles.enter()
        .append("rect")
            .attr("width", 60)
            .attr("height", (d) => {return y(d.revenue) /1000;})
            .attr("x",(d) => {return x(d.month)})
            .attr("y",(d) => {return 400 - y(d.revenue) /1000;})
            .attr("fill", "blue");

    var bottomAxis = d3.axisBottom(x);
        g.append("g")
            .attr("class", "bottom axis")
            .attr("transform", "translate(0, " + height+ ")")
            .call(bottomAxis)
            
        .selectAll("text")
            .attr("y", 10)
            .attr("x", 15)
            .attr("text-anchor", "end")
            
    var leftAxis = d3.axisLeft(y).ticks(10)
        .tickFormat((d) => { return 50 - d + "k"; })
        g.append("g")
            .attr("class", "left axis")
            .call(leftAxis);

    g.append("text")
        .attr("class", "y axis-label")
        .attr("x", width / 2)
        .attr("y", height + 60)
        .attr("font-size", "20px")
        .attr("text-anchor", "middle")
        .style("fill","black")
        .text("Month");

    g.append("text")
        .attr("class", "y axis-label")
        .attr("x", - (height / 2))
        .attr("y", -60)
        .attr("font-size", "20px")
        .attr("text-anchor", "middle")
        .attr("transform", "rotate(-90)")
        .style("fill","black")
        .text("Revenue (dlls.)");
                
}).catch((error)=> {
    console.log(error);
});

