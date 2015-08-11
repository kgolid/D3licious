var d3 = require('d3');

var w = 900;
var h = 450;
var center = [w/2,h/2];

var n = 60;     // Number of points in circle.
var r = 150;    // Radius of circle.
var o = 50;     // Max random offset.

var data = [];
var time = 0;

var interval;

function addPoints() {
  for (var i = 0; i < n; i++) {
    data[i] = 0;
  }
};

function updatePoints() {
  data = data.map(function () {
    return Math.random() * o - o/2;
  })
}

function displayPoints() {
  var points = svg.selectAll('.point').data(data)
  points.enter().append('circle')
    .attr('r', 2)
    .attr('class', 'point');
  points.transition().duration(400).delay(0).ease('linear')
    .attr('cx', function (d,i) { return getX(i,d); })
    .attr('cy', function (d,i) { return getY(i,d); })
};

function displayLines() {
  var lines = svg.selectAll('.line').data(data)
  lines.enter().append('line')
    .attr('class', 'line');
  lines.transition().duration(400).delay(0).ease('linear')
    .attr('x1', function (d,i) { return getX(i,-50); })
    .attr('y1', function (d,i) { return getY(i,-50); })
    .attr('x2', function (d,i) { return getX(i,d); })
    .attr('y2', function (d,i) { return getY(i,d); })
};

function getX(i,d) {
  var phi = (i/n * Math.PI*2) + time/20;
  return center[0] + (d + r) * (Math.cos(phi));
};

function getY(i,d) {
  var phi = (i/n * Math.PI*2) + time/20;
  return center[1] + (d + r) * (Math.sin(phi));
};

function setup() {
  svg = d3.select('.fig7-1').append('svg').attr('width', w).attr('height', h);
  addPoints();
  displayPoints();
  displayLines();
};

function draw() {
  time++;
  updatePoints();
  displayLines();
  displayPoints();
}

function run() {
  setup();
  interval = setInterval(function () {
    draw();
  }, 400);
};

function stop() {
  clearInterval(interval);
  data = [];
  time = 0;
}

module.exports = {
  run: run,
  stop: stop
};
