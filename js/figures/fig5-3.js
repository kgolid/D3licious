var d3 = require('d3');

var w = 900;
var h = 450;

var nodes = [];
var lifespan = 400;
var dim = 15;

var svg;

var mouse;

function addParticles() {
  mouse = mouse || d3.mouse(this);
  var px = mouse[0];
  var py = mouse[1];
  mouse = d3.mouse(this);
  var vx = (mouse[0]-px) / 5;
  var vy = (mouse[1]-py) / 5;
  var node = {
    x: mouse[0],
    y: mouse[1],
    vx: vx,
    vy: vy,
    age: 0,
    lifespan: Math.random()*lifespan}
  nodes.push(node);
}

function setup() {
  svg = d3.select('.fig5-3').append('svg').attr('width', w).attr('height', h);
  svg.on('mousemove', addParticles);
}

function update() {
  updateAge();
  updatePosition();
}

function updateAge() {
  nodes = nodes.filter( function (p) {
    return p.age++ < p.lifespan;
  });
}

function updatePosition() {
  nodes.forEach( function (node) {
    node.x += node.vx;
    node.y += node.vy;
  });
}

function display() {
  var particles = svg.selectAll('circle').data(nodes);
  particles.enter().append('circle').attr('class', 'particle');
  particles.attr('r', function (d) {return Math.max(0, dim - dim*(d.age / d.lifespan))})
    .attr('cx', function (d) { return d.x; })
    .attr('cy', function (d) { return d.y; });
  particles.exit().remove();
}

function run() {
  setup();
  d3.timer(function () {
    update();
    display();
  });
}

module.exports = {
  run: run
}
