/*
*    main.js
*/

var margin = {top: 10, right: 10, bottom: 150, left:100};
var width = 600;
var height = 400;
var flag = true;

var g = d3.select("body")
	.append("svg")
		.attr("width", width + margin.right + margin.left)
		.attr("height", height + margin.top + margin.bottom)
	.append("g")
		.attr("transform", "translate(" + margin.left + ", " + margin.top + ")");

var x = d3.scaleBand().range([0, width]).padding(0.2);
var y = d3.scaleLinear().range([height, 0]);

var xAxisGroup = g.append("g").attr("class", "x axis")
    .attr("transform", "translate(0, " + height + ")");
var yAxisGroup = g.append("g").attr("class", "y-axis");

var yLabel = g.append("text")
        .attr("class", "y axis-label")
        .attr("x", - (height / 2))
        .attr("y", -60)
        .attr("font-size", "20px")
        .attr("text-anchor", "middle")
        .attr("transform", "rotate(-90)")
        .style("fill","black")
        .text("Revenue (dlls.)");

g.append("text")
        .attr("class", "y axis-label")
        .attr("x", width/2)
        .attr("y", height + 140)
        .attr("font-size", "30px")
        .attr("text-anchor", "middle")
        .attr("transform", "translate(0, -70)")
        .text("Month");

d3.json("data/revenues.json").then((data)=> {
    data.forEach((d)=>{
		d.revenue = +d.revenue;
        d.profit= +d.profit;
	});
            
    d3.interval( ( ) => {
        update(data);
        flag = !flag;
    }, 1000);
    update(data);
}).catch((error)=> {
    console.log(error);
});


function update(data) {

    var value = flag ? "revenue" : "profit";

    x.domain(data.map((d) => { return d.month; }));
    y.domain([0, d3.max(data, (d) => { return d[value]; })]);
    
    var bottomAxis = d3.axisBottom(x);

    xAxisGroup.call(bottomAxis)
        .selectAll("text")
            .attr("y", 10)
            .attr("x", 15)
            .attr("text-anchor", "end");

    var leftAxis = d3.axisLeft(y).ticks(10)
        .tickFormat((d) => { return "$" + d/1000 + "k"; })
    yAxisGroup.call(leftAxis);

    var label = flag ? "Revenue" : "Profit";
    yLabel.text(label);

    var rectangles = g.selectAll("rect").data(data);
    rectangles.exit().remove();
    
    rectangles.attr("x", (d) => { return x(d.month); })
        .attr("y", (d) => { return y(d[value]); })
        .attr("width", x.bandwidth)
        .attr("height",(d) => { return height - y(d[value])});
        
    rectangles.enter().append("rect")
        .attr("x", (d) => { return x(d.month); })
        .attr("y", (d) => { return y(d[value]); })
        .attr("width", x.bandwidth)
        .attr("height", (d) => { return height - y(d[value])})
        .attr("fill", "yellow");
    
}