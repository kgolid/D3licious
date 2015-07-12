var d3 = require('d3');

var w = 930,
    h = 500;

var svg = d3.select('.l5').append('svg').attr('width', w).attr('height', h);

var size = 20,
    r = 10,
    fill = '#222';

var getRandomParticle = function () {
  var posx = Math.random() * w;
  var posy = Math.random() * h;
  var dir = Math.random() * (2*Math.PI);
  var velx = Math.cos(dir);
  var vely = Math.sin(dir);

  return {'pos':{'x':posx, 'y':posy}, 'vel':{'x':velx, 'y':vely}};
}

var particles = []
for (var i = 0; i < size; i++) {
  particles[i] = getRandomParticle();
}

var my_mod = function(a, n) {
  return ((a%n)+n)%n
};

var circles = svg.selectAll('circle')
   .data(particles)
   .enter()
   .append('circle')
   .attr('cx', function (p) {
     return p.pos.x
   })
   .attr('cy', function (p) {
     return p.pos.y
   })
   .attr('r', r)
   .attr('fill', fill);

var animate = function (elapsed) {
  circles
  .attr('cx', function (p) {
    return my_mod((p.pos.x + p.vel.x * .1 * elapsed), w);
  })
  .attr('cy', function (p) {
    return my_mod((p.pos.y + p.vel.y * .1 * elapsed), h);
  });
}

d3.timer( animate );
