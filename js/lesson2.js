var d3 = require('d3');

var dataSet = [];
var size = 7;
for (var i = 0; i < size; i++) {
  dataSet[i] = Math.random()*50 + 10;
}

var svg = d3.select('.l2').append('svg');
svg.attr('width','100%').attr('height','160px');

var circles = svg.selectAll('circle').data(dataSet).enter().append('circle');
circles.attr('cx', function (d, i) { return (( i * 100  / size ) + (50 / size))+ '%'; })
  .attr('cy', '50%')
  .attr('r', function (d) {return d})
  .attr('class', 'bubble');
