/*
*    main.js
*/

var ages = []
d3.csv("data/ages.csv").then((data)=> {
    data.forEach((d)=>{

		d.age = +d.age;
        ages.push(d.age);
        
	});
	console.log(data);

    var svg = d3.select("#chart-area").append("svg")
        .attr("width", 400)
        .attr("height", 400);

    var circles = svg.selectAll("circle").data(ages);

    circles.enter()
        .append("circle")
            .attr("r", (d) => {return d;})
            .attr("cx",(d,i) => {return i * 50 + 25;})
            .attr("cy", 50)
            .attr("fill", (d) => {
                if (d>10){
                    return "red";
                } else {
                    return "green";
                }
            });
}).catch((error)=> {
    console.log(error);
});

