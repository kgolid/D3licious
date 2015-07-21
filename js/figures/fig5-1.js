var d3 = require('d3');

var w = 900;
var h = 450;

var nodes = [];
var lifespan = 80;

var svg;

function addParticles() {
  var mouse = d3.mouse(this);
  var node = {x:mouse[0], y:mouse[1], age:0}
  nodes.push(node);
}

function setup() {
  svg = d3.select('.fig5-1').append('svg').attr('width', w).attr('height', h);
  svg.on('mousemove', addParticles);
}

function update() {
  nodes = nodes.filter( function (p) {
    return p.age++ < lifespan;
  });
}

function display() {
  var particles = svg.selectAll('circle').data(nodes);
  particles.enter().append('circle').attr('class', 'particle');
  particles.attr('r',function (d) { return d.age + 5; })
    .attr('cx', function (d) { return d.x; })
    .attr('cy', function (d) { return d.y; })
    .attr('opacity', function (d) { return (lifespan - d.age) / lifespan });
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
