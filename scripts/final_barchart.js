var width = 700;
var height = 700;
var margin = {top: 100,left: 100, right: 100, bottom: 100};

var svg = d3.select("div#contentrowright")
  .append("svg")
  .attr("viewBox", "0 0 700 700")
  .attr("preserveAspectRatio", "none")
  .classed("svg-content", true);

  var data = [{x: "2012", y: 209, z: "$17,875,660"},
              {x: "2013", y: 272, z: "$7,767,920"},
              {x: "2014", y: 326, z: "$10,369,136"},
              {x: "2015", y: 446, z: "$13,063,978"},
              {x: "2016", y: 614, z: "$30,483,971"},
              {x: "2017", y: 364, z: "$26,575,239"},
              {x: "2018", y: 228, z: "$9,408,208"}];

  var xScale = d3.scaleLinear()
    .domain([650, 0])
    .range([width - margin.left, margin.right]);
  var yScale = d3.scaleBand()
    .domain(["2012","2013","2014","2015", "2016", "2017", "2018"])
    .rangeRound([margin.bottom, height - margin.top])
    .padding(0.5);

    var xAxis = svg.append("g")
      .attr("transform", `translate(0, ${height-margin.bottom})`)
      .call(d3.axisBottom().scale(xScale));
    var yAxis = svg.append("g")
      .attr("transform",`translate(${margin.left},0)`)
      .call(d3.axisLeft().scale(yScale));

    var bar = svg.selectAll("rect")
         .data(data)
         .enter()
           .append("rect")
             .attr("x",margin.left)
             .attr("y",function(d){return yScale(d.x);})
             .attr("width",function(d){
               return xScale(d.y)-margin.left;})
             .attr("height",yScale.bandwidth())
             .attr("fill","steelblue")
             .on("mouseover", function(d) {
               d3.select(this)
                 .attr("fill","#0033A0")
                 div.html('<span id="tooltip">' + d.z + '</span>');
                 div.transition()
                  .duration(200)
                  .style("opacity", .85)
                  .style("left", (d3.event.pageX) + "px")
                  .style("top", (d3.event.pageY - 50) + "px");
               }).on("mouseout", function() {
               d3.select(this)
                 .attr("fill","steelblue")
                 div.transition()
                 .duration(500)
                 .style("opacity", 0);
                 });

var div = d3.select("body").append("div")
  .attr("class", "tooltip")
  .style("opacity", 0);

var xLabel = svg.append("text")
  .attr("class","axisLabel")
  .attr("x", width/2)
  .attr("y", height-40)
  .attr("text-anchor","middle")
  .text("Number of Installations");

var yLabel = svg.append("text")
  .attr("class","axisLabel")
  .attr("transform","rotate(-90)")
  .attr("y", 15)
  .attr("x", -height/2)
  .attr("text-anchor","middle")
  .text("Year");
