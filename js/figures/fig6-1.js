var d3 = require('d3');

var w = 900;
var h = 450;

var start = {
  x: w/2,
  y: h/2
}

var nodes = [];
var lifespan = 400;
var dim = 5;

var svg;

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

function setup() {
  svg = d3.select('.fig6-1').append('svg').attr('width', w).attr('height', h);
  displayStart();
  displayFinish();
  setInterval( function () {
    addParticle();
  }, 200);
}

function update() {
  updateAge();
  updatePosition();
}

function updateAge() {
  nodes.forEach( function (node) {
    node.age++;
  });
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

function displayStart() {
  svg.append('circle')
    .attr('cx', start.x)
    .attr('cy', start.y)
    .attr('r', dim * 2)
    .attr('stroke', 'gold')
    .attr('fill', 'none')
    .attr('class', 'start');
}

function displayFinish() {

}

function display() {
  var particles = svg.selectAll('.particle').data(nodes);
  particles.enter().append('circle').attr('class', 'particle').attr('r', dim);
  particles.attr('cx', function (d) { return d.pos.x; })
    .attr('cy', function (d) { return d.pos.y; });
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
