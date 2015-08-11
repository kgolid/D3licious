var d3 = require('d3');

var w = 900;
var h = 450;

var start = { x: w/5, y: h/2 }
var finish = { x: (4*w)/5, y: h/2}

var generationSize = 20;
var nodes = [];
var lifespan = 20;
var dim = 3;
var active = 0;

var svg;

var interval;
var stopped;

function addParticle(acc) {
  var node = {
    pos: { x: start.x, y: start.y },
    vel: { x: 0, y: 0 },
    acc: acc,
    age: 0,
    status: 'alive'
  }
  nodes.push(node);
}

function addParticles() {
  for (var i = 0; i < generationSize; i++) {
    addParticle(generateAccList());
    active++;
  }
};

function generateAccList() {
  var list = [];
  for(var i = 0; i < lifespan; i++) {
    list.push({x: Math.random() - 0.5, y: Math.random() - 0.5});
  }
  return list;
}

function updateAge() {
  nodes.forEach( function (node) {
    node.age++;
  });
}

function updatePos() {
  nodes.forEach( function (node) {
    node.pos.x += node.vel.x;
    node.pos.y += node.vel.y;
  });
}

function updateVel() {
  nodes.forEach( function (node) {
    if (node.status === 'alive') {
      node.vel.x += node.acc[node.age].x;
      node.vel.y += node.acc[node.age].y;
    } else {
      node.vel.x = 0;
      node.vel.y = 0;
    }
  })
}

function updateStatus() {
  var outOfBounds = function (node) {
    var outx = node.pos.x < 0 || node.pos.x > w;
    var outy = node.pos.y < 0 || node.pos.y > h;
    return outx || outy;
  };

  var reachedGoal = function (node) {
    return false; //TODO
  };

  nodes.forEach( function (node) {
    if (node.status === 'alive') {
      if (outOfBounds(node) || node.age >= lifespan) {
        node.status = 'dead';
        active--;
      } else if ( reachedGoal(node) ) {
        node.status = 'done';
        active--;
      }
    }

  });
}

function makeNewGeneration() {
  active = 0;
  nodes = [];
  addParticles();
}

function displayCheckpoints() {
  svg.append('circle')
    .attr('cx', start.x)
    .attr('cy', start.y)
    .attr('r', dim * 2)
    .attr('class', 'start');
  svg.append('circle')
    .attr('cx', finish.x)
    .attr('cy', finish.y)
    .attr('r', dim * 4)
    .attr('class', 'finish');
}

function displayParticles() {
  var scale = d3.scale.category20();
  var particles = svg.selectAll('.particle').data(nodes);
  particles.enter().append('circle')
    .attr('r', dim)
    .attr('fill', function (d,i) { return scale(i); })
  particles
    .attr('class', function (d) { return 'particle ' + d.status; })
    .attr('cx', function (d) { return d.pos.x; })
    .attr('cy', function (d) { return d.pos.y; });
  particles.exit().remove();
};

function setup() {
  svg = d3.select('.fig6-3').append('svg').attr('width', w).attr('height', h);
  displayCheckpoints();
  addParticles();
  stopped = false;
};

function update() {
  updatePos();
  updateStatus();
  if (active === 0) {
    //var scoreList = evaluateGeneration();
    console.log(nodes);
    makeNewGeneration();
  };
};

function run() {
  setup();
  setInterval(function () {
    updateVel();
    updateAge();
  }, 500);
  d3.timer(function () {
    update();
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
