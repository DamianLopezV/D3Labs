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
        .attr("width", 400)
        .attr("height", 400);

    var rectangles = svg.selectAll("rect").data(heights);

    rectangles.enter()
        .append("rect")
            .attr("width", 40)
            .attr("height", (d) => {return d * 200 / maxHeight;})
            .attr("x",(d,i) => {return i * 50;})
            .attr("y",(d) => {return 200 - d * 200 / maxHeight;})
            .attr("fill", "green");

}).catch((error)=> {
    console.log(error);
});

