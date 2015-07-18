var d3 = require('d3');

module.exports.run = function () {

  // ----- DATASET -----

  var dataSet = [];
  var size = 60;
  for (var i = 0; i < size; i++) {
    dataSet[i] = [ Math.random()*20, Math.random()*20 ];
  }

  // ----- VISUALIZATION -----

  var w = 900;
  var h = 500;
  var padding = 25;

  var svg = d3.select('.fig1-4')
              .append('svg')
              .attr('width', w)
              .attr('height', h);

  var xScale = d3.scale.linear()
                 .domain([0, 20])
                 .range([padding, w - padding]);

  var yScale = d3.scale.linear()
                 .domain([0, 20])
                 .range([h - padding, padding]);

  var xAxis = d3.svg.axis()
                    .scale(xScale)
                    .orient('bottom')
                    .ticks(5);

  var yAxis = d3.svg.axis()
                    .scale(yScale)
                    .orient('left')
                    .ticks(5);

  svg.append('g')
     .attr('class', 'axis')
     .attr("transform", "translate(0," + (h - padding) + ")")
     .call(xAxis);

  svg.append('g')
     .attr('class', 'axis')
     .attr("transform", "translate(" + padding + ",0)")
     .call(yAxis);

  svg.selectAll('circle')
     .data(dataSet)
     .enter()
     .append('circle')
     .attr('cx', w/2)
     .attr('cy', h/2)
     .attr('r',0)
     .transition()
     .duration(1000)
     .delay(function (d,i) {
       return i*30;
     })
     .attr('r', function (d) {
       return ( Math.sqrt( (d[0] * d[0]) + (d[1] * d[1]) ) );
     })
     .attr('class', 'bubble')
     .attr('opacity', function (d) {
       return ( d[0] / 40 + 0.5 );
     })
     .attr('cx', function (d) {
       var xpos = xScale(d[0]);
       return xpos;
     })
     .attr('cy', function (d) {
       return yScale(d[1]);
     });

}
