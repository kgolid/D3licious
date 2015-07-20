var d3 = require('d3');

var svg, legend;
var w = 900,
    h = 600,
    padding = 60,
    r = 2;

var xColumn, yColumn, tColumn;
var xScale, yScale, tScale;

var setup = function () {
  xColumn = "tid";
  yColumn = "antall";
  tColumn = "alder";

  xScale = d3.scale.linear().range([padding, w-padding]);
  yScale = d3.scale.linear().range([h - padding, padding]);
  tScale = d3.scale.category20();

  svg = d3.select('.fig4-1').append('svg').attr('width', w).attr('height', h);
  legend = d3.select('.fig4-1').append('div');

  d3.csv('http://data.ssb.no/api/v0/dataset/65195.csv?lang=no', type, function (data) {
    var filtered = data.filter(function (d) { return d['kjønn'] == '0 Begge kjønn'; })
    displayLegend(filtered);
  });
};

var type = function (d) {
  d["antall"] = +d["Personer etter alder, kjønn og tid"];
  d["tid"] = d["tid"];
  d["alder"] = getString(d["alder"]);
  return d;
};

var draw = function (data) {
  svg.selectAll(".line").remove();

  var path = svg.append("path").datum(data);
  path.attr("class", "line")
      .attr("d", line)
      .attr("stroke", function (d) {
        return tScale(d[0][tColumn]);
      });
};

var run = function () {
  setup();
};

var displayLegend = function (data) {
  xScale.domain( d3.extent(data, function (d) { return d[xColumn]; }) );
  yScale.domain( [0, d3.max(data, function (d) { return d[yColumn]; })] );

  var xAxis = d3.svg.axis().scale(xScale).orient('bottom').ticks(10).tickFormat(d3.format("f"));
  var yAxis = d3.svg.axis().scale(yScale).orient('left').ticks(6);

  svg.append('g').attr('class', 'axis')
     .attr("transform", "translate(0," + (h - padding) + ")")
     .call(xAxis);

  svg.append('g').attr('class', 'axis')
     .attr("transform", "translate(" + padding + ", 0)")
     .call(yAxis);

  legend.selectAll('p').data(getTypes(data)).enter().append('p')
        .html(function (d) { return d; })
        .style('background-color', function (d) { return tScale(d); })
        .on('mouseover', function (d) {
          var filteredData = data.filter( function (x) { return x['alder'] == d; });
          draw(filteredData);
        });
};

var line = d3.svg.line()
  .x(function(d) { return xScale(d[xColumn]); })
  .y(function(d) { return yScale(d[yColumn]); })
  .interpolate('basis');

var getString = function (string) {
  return string.substring(string.indexOf(' '));
};

var categorize = function (data) {
  var cat = [];
  data.forEach(function (d) {
    cat[ d['alder'] ] = cat[ d['alder'] ] || [];
    cat[ d['alder'] ].push(d);
  });

  return cat;
}

var getTypes = function (data) {
  var categories = [];
  data.forEach( function (d) {
    if( categories.indexOf(d[tColumn]) == -1 ) {
      categories.push(d[tColumn]);
    }
  });
  return categories;
};

var isOfType = function (d, type) {
  return d['alder'] == type;
};

module.exports = {
  run: run
};
