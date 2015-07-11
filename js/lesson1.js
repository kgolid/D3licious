var d3 = require('d3');

var dataSet = [];
for (var i = 0; i < 50; i++) {
  dataSet[i] = Math.random()*300;
}

module.exports.figure = d3.select('body')
  .append('div')
  .attr('class','lesson l1')
  .selectAll('div')
  .data(dataSet)
  .enter()
  .append('div')
  .attr('class','bar')
  .style("height", function (d) { return d + 'px' });
