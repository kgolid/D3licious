var d3 = require('d3');

var dataSet = [];
for (var i = 0; i < 30; i++) {
  dataSet[i] = Math.random()*250 + 50;
}

d3.select('.l1')
  .selectAll('div')
  .data(dataSet)
  .enter()
  .append('div')
  .attr('class','bar')
  .style("height", function (d) { return d + 'px' });
