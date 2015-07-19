var d3 = require('d3');

var svg, legend;
var w = 900,
    h = 600,
    r = 2;

var xColumn, yColumn, tColumn;
var xScale, yScale, tScale;

var setup = function () {
  xColumn = "tid";
  yColumn = "antall";
  tColumn = "alder";

  xScale = d3.scale.linear().range([0, w]);
  yScale = d3.scale.linear().range([h, 0]);
  tScale = d3.scale.category20();

  svg = d3.select('.fig4-1').append('svg').attr('width', w).attr('height', h);
  legend = d3.select('.fig4-1').append('div');

  d3.csv('http://data.ssb.no/api/v0/dataset/65195.csv?lang=no', type, function (data) {
    draw(data, "");
  });
}

var type = function (d) {
  d["antall"] = +d["Personer etter alder, kjønn og tid"];
  d["tid"] = +d["tid"];
  return d;
}

var draw = function (data, chosen) {
  xScale.domain( d3.extent(data, function (d) { return d[xColumn]; }) );
  yScale.domain( [0, d3.max(data, function (d) { return d[yColumn]; })] );

  var points = svg.selectAll("circle").data(data);
  points.enter().append("circle")
        .attr("cx", function (d){ return xScale(d[xColumn]); })
        .attr("cy", function (d){ return yScale(d[yColumn]); })
        .attr("fill", function (d){ return tScale(d[tColumn]); })
        .attr("r", r)
  points.attr("opacity", function (d) {
    return (d[tColumn] == chosen)? 1:0;
  });

  legend.selectAll('p').data(getTypes(data)).enter().append('p')
        .html(function (d) { return d; })
        .style('background-color', function (d) { return tScale(d); })
        .on('click', function (d) { draw(data, d); })
}

var run = function () {
  setup();
}

var getTypes = function (data) {
  var categories = [];
  data.forEach( function (d) {
    if( categories.indexOf(d[tColumn]) == -1 ) {
      categories.push(d[tColumn]);
    }
  });
  return categories;
}

module.exports = {
  run: run
}
