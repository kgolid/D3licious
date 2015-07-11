var d3 = require('d3');

var dataSet = [];
var size = 50;

for (var i = 0; i < size; i++) {
  dataSet[i] = [ Math.random()*20, Math.random()*20 ];
}

var svg = d3.select('.l4')
            .append('svg')
            .attr('width', '100%')
            .attr('height', 500);

svg.selectAll('circle')
   .data(dataSet)
   .enter()
   .append('circle')
   .attr('cx', function (d) {
     return (( d[0]/20 ) * 100)+ '%';
   })
   .attr('cy', function (d) {
     return ( d[1]/20 ) * 500;
   })
   .attr('r', function (d) {
     return ( Math.sqrt( (d[0] * d[0]) + (d[1] * d[1]) ) );
   })
   .attr('fill', '#222')
   .attr('opacity', function (d) {
     return ( d[0] / 20 );
   });
