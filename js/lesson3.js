var d3 = require('d3');

var dataSet = [];
var size = 30;

for (var i = 0; i < size; i++) {
  dataSet[i] = Math.random()*20 + 5;
}

var containerHeight = 300;

var calculateX = function (d, i) {
  var percentage = (i / size) * 100;
  return percentage + '%';
}

var calculateY = function (d) {
  return containerHeight - calculateHeight(d);
}

var width = (100 / size) - 0.5;

var calculateHeight = function (d) {
  return d*10;
}

var calculateFill = function (d) {
  var val = Math.round(80 - d * 2);
  return "rgb("+ val + ", " + val + ", "+ val + ")";
  ;
}

var svg = d3.select('.l3')
            .append('svg')
            .attr('width', '100%')
            .attr('height', containerHeight);

var rects = svg.selectAll('rect')
   .data(dataSet)
   .enter()
   .append('rect')
   .attr('x', calculateX)
   .attr('y', calculateY)
   .attr('width', width + '%')
   .attr('height', calculateHeight)
   .attr('fill', calculateFill);

svg.selectAll('text')
   .data(dataSet)
   .enter()
   .append('text')
   .text( function (d) {
     return Math.round(d)
   })
   .attr('x', function (d,i) {
     return ((i / size) * 100 + width/2) + '%';
   })
   .attr('y', function (d) {
     return containerHeight - calculateHeight(d) + 20;
   })
   .attr('fill', '#aaa')
   .attr("text-anchor", "middle");
