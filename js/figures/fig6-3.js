var d3 = require('d3');

var w = 900;
var h = 450;

var start = { x:20, y:h-20 }
var finish = { x:w-50, y:50 }

var generationSize = 30;
var nodes = [];
var lifespan = 100;
var dim = 4;
var active = 0;

var log = [];

// --- GENE POOL ---
var poolsize = 10;
var mutationChance = 0.005;

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

function addParticles(pool) {
  for (var i = 0; i < generationSize; i++) {
    addParticle(generateAccList(pool));
    active++;
  }
};

function generateAccList(pool) {
  var list = [];
  if (pool) {
    var par1 = pool[Math.floor(Math.random()*pool.length)];
    var par2 = pool[Math.floor(Math.random()*pool.length)];
    for(var i = 0; i < lifespan; i++) {
      if(Math.random() < mutationChance){
        list.push({x: Math.random() - 0.5, y: Math.random() - 0.5});
      } else {
        var par = (Math.random() < 0.5)? par1 : par2;
        list.push({x: par[i].x, y: par[i].y});
      }
    }
  } else {
    for(var i = 0; i < lifespan; i++) {
      list.push({x: Math.random() - 0.5, y: Math.random() - 0.5});
    }
  }
  return list;
}

function updateAge() {
  nodes.forEach( function (node) {
    if (node.status === 'alive') {
      node.age++;
    }
  });
}

function updatePos() {
  nodes.forEach( function (node) {
    if(node.status === 'alive'){
      node.pos.x += node.vel.x;
      node.pos.y += node.vel.y;
    }
  });
}

function updateVel() {
  nodes.forEach( function (node) {
    if (node.status === 'alive') {
      node.vel.x += node.acc[node.age].x;
      node.vel.y += node.acc[node.age].y;
      normalize(node.vel);
    } else {
      node.vel.x = 0;
      node.vel.y = 0;
    }
  })
}

function normalize(vec) {
  var mag = Math.sqrt(vec.x * vec.x + vec.y * vec.y);
  if(mag > 2){
    vec.x = (2 * vec.x) / mag;
    vec.y = (2 * vec.y) / mag;
  }

}

function updateStatus() {
  var outOfBounds = function (node) {
    var outx = node.pos.x < 0 || node.pos.x > w;
    var outy = node.pos.y < 0 || node.pos.y > h;
    return outx || outy;
  };

  var reachedGoal = function (node) {
    var xDist = Math.abs(finish.x - node.pos.x);
    var yDist = Math.abs(finish.y - node.pos.y);
    var dist = Math.sqrt(xDist * xDist + yDist * yDist);
    return dist < dim * 8;
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

function calculateDist(node) {
  var xDist = Math.abs(finish.x - node.pos.x);
  var yDist = Math.abs(finish.y - node.pos.y);
  return Math.sqrt(xDist * xDist + yDist * yDist);
}

function makeNewGeneration() {
  var pool = evaluateGeneration();
  active = 0;
  nodes = [];
  addParticles(pool);
}

function distCompare(a,b) {
  return a.score - b.score;
}

function evaluateGeneration() {
  var scores = [];
  var total = 0;
  nodes.forEach( function (node) {
    var dist = calculateDist(node);
    total += dist;
    scores.push({
      acc: node.acc,
      score: dist
    });
  });
  scores.sort(distCompare);
  var pool = [];
  for (var i = 0; i < poolsize; i++) {
    for (var j = 0; j < poolsize-i; j++) {
      pool.push(scores[i].acc);
    }
  }
  log.push(total);
  return pool;
}

function evalGen() {
  var pool = [];
  var scores = [];
  nodes.forEach( function (node) {

  })
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
    .attr('r', dim * 8)
    .attr('class', 'finish');
}

function displayParticles() {
  var particles = svg.selectAll('.particle').data(nodes);
  particles.enter().append('circle')
    .attr('r', dim);
  particles
    .attr('class', function (d) { return 'particle ' + d.status; })
    .attr('cx', function (d) { return d.pos.x; })
    .attr('cy', function (d) { return d.pos.y; });
  particles.exit().remove();
};

function displayStats() {
  var bars = svg.selectAll('.bar').data(log);
  bars.enter().append('rect')
    .attr('class', 'bar')
    .attr('height', 6)
    .attr('x', 10);
  bars.attr('width', function (d) { return d / 200; })
    .attr('y', function (d,i) { return i *7; })
    .attr('fill', function (d,i) { return (i === log.length-1)? '#aaa':'#ddd' });
  bars.exit().remove();
}

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
    makeNewGeneration();
  };
};

function run() {
  setup();
  setInterval(function () {
    updateVel();
    updateAge();
  }, 100);
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
