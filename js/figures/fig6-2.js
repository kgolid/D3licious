var d3 = require('d3');

var w = 900;
var h = 450;

var start = { x: w/2, y: h/2 }

var generation_size = 20;
var nodes = [];
var log = [];
var age = 0;
var dim = 3;

var svg;

var interval;
var stopped;

function addParticle() {
  var ax = Math.random() - 0.5;
  var ay = Math.random() - 0.5;
  var node = {
    pos: { x: start.x, y: start.y },
    vel: { x: 0, y: 0 },
    acc: { x: ax, y: ay },
    age: 0
  }
  nodes.push(node);
}

function addParticles() {
  for (var i = 0; i < generation_size; i++) {
    addParticle();
  }
}

function setup() {
  svg = d3.select('.fig6-2').append('svg').attr('width', w).attr('height', h);
  displayStart();
  addParticles();
  stopped = false;
}

function update() {
  updateAge();
  updatePosition();
  if (nodes.length === 0) {
    makeNewGeneration();
  };
}

function updateAge() {
  log[0] = age++;
}

function updatePosition() {
  nodes.forEach( function (node) {
    node.vel.x += node.acc.x;
    node.vel.y += node.acc.y;
    node.pos.x += node.vel.x;
    node.pos.y += node.vel.y;

    node.acc.x = Math.random() - 0.5;
    node.acc.y = Math.random() - 0.5;
  });

  nodes = nodes.filter( function (node) {
    var outx = node.pos.x < 0 || node.pos.x > w;
    var outy = node.pos.y < 0 || node.pos.y > h;
    return !outx && !outy;
  });
}

function makeNewGeneration() {
  log.splice(1,0,age);
  addParticles();
  age = 0;
}

function displayStart() {
  svg.append('circle')
    .attr('cx', start.x)
    .attr('cy', start.y)
    .attr('r', dim * 2)
    .attr('class', 'start');
}

function displayParticles() {
  var particles = svg.selectAll('.particle').data(nodes);
  particles.enter().append('circle')
    .attr('class', 'particle')
    .attr('r', dim)
  particles.attr('cx', function (d) { return d.pos.x; })
    .attr('cy', function (d) { return d.pos.y; });
  particles.exit().remove();
}

function displayStats() {
  var bars = svg.selectAll('.bar').data(log);
  bars.enter().append('rect')
    .attr('class', 'bar')
    .attr('height', 6)
    .attr('x', 10)
    .attr('fill', function (d,i) { return (i === 0)? '#f00':'#ddd' });
  bars.attr('width', function (d) { return d / 5; })
    .attr('y', function (d,i) { return i *7; });
}

function run() {
  setup();
  d3.timer(function () {
    update();
    displayStats();
    displayParticles();
    return stopped;
  });
}

function stop() {
  clearInterval(interval);
  nodes = [];
  stopped = true;
}

module.exports = {
  run: run,
  stop: stop
}
