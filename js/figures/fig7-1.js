var d3 = require('d3');

var w = 900;
var h = 450;
var center = [w/2,h/2];

var n = 15;     // Number of points in circle.
var r = 150;    // Radius of circle.
var o = 30;     // Max random offset.

var data = [];

var interval;

function addPoints() {
  for (var i = 0; i < n; i++) {
    var offset = Math.random() * o - o/2;
    data[i] = offset;
  }
};

function displayPoints() {
  var points = svg.selectAll('.point').data(data)
  points.enter().append('circle')
    .attr('cx', function (d,i) { return getX(i); })
    .attr('cy', function (d,i) { return getY(i); })
    .attr('r', 5)
    .attr('class', 'point');
  points.transition().duration(500).delay(0).ease('elastic')
    .attr('cx', function (d,i) { return getX(i,d); })
    .attr('cy', function (d,i) { return getY(i,d); })
};

function getX(i,d) {
  var dist = d? r + d : r;
  var phi = (i/n * Math.PI*2);
  return center[0] + dist * (Math.cos(phi));
};

function getY(i,d) {
  var dist = d? r + d : r;
  var phi = (i/n * Math.PI*2);
  return center[1] + dist * (Math.sin(phi));
};

function setup() {
  svg = d3.select('.fig7-1').append('svg').attr('width', w).attr('height', h);
  addPoints();
  displayPoints();
};

function draw() {
  addPoints();
  displayPoints();
}

function run() {
  setup();
  interval = setInterval(function () {
    draw();
  }, 500);
};

function stop() {
  clearInterval(interval);
  data = [];
}

module.exports = {
  run: run,
  stop: stop
};
