var d3 = require('d3');

var w = 900,
    h = 450,
    pixelSize = 5;

var gw = w/pixelSize,
    gh = h/pixelSize;

var pattern_dec,
    pattern;

var initDataSet = function () {
  pattern_dec = Math.round(Math.random() * 256);
  pattern = FormatNumberLength(pattern_dec.toString(2), 8);

  var dataSet = [[]];
  for (var j = 0; j < gw; j++) {
    dataSet[0].push(0);
  }
  dataSet[0][gw/2] = 1;

  return dataSet;
}

var run = function () {
  var cells = initDataSet();

  var svg = d3.select('.fig3-1').append('svg').attr('width', w).attr('height', h);
  var button = d3.select('.fig3-1').append('input')
      .attr('type','button')
      .attr('value','Start again')
      .on('click', function () { reset(); });
  var info = d3.select('.fig3-1').append('p')
      .html('Pattern: ' + pattern_dec + ' (' + pattern + ')');

  var render = function () {
    var row = cells.length-1;
    var rows = svg.selectAll('.row')
        .data(cells)
        .enter().append("svg:g")
        .attr("class", "row");

    var cell = rows.selectAll('.cell')
        .data(function (d) { return d; })
        .enter().append("rect")
        .attr('x', function (d,i) { return i * pixelSize; })
        .attr('y', function () { return row * pixelSize; })
        .attr('width', pixelSize).attr('height', pixelSize)
        .attr('opacity', function (d) { return d; })
        .attr('class', 'cell');
  };

  d3.timer(function () {
    render();
    var last = cells[cells.length-1];
    cells.push(getNextRow(last, pattern));
    return cells.length >= gh;
  });
}

var reset = function () {
  d3.select('.fig3-1').selectAll('*').remove();
  run();
}

var getSuccesor = function (l, t, r, ran) {
  var num = l + (2 * t) + (4 * r);
  return parseInt(ran.charAt(num));
}

var getNextRow = function (last, pattern) {
  var next = [0];
  for (var i = 1; i < last.length-1; i++) {
    next.push(getSuccesor( last[i-1], last[i], last[i+1], pattern ));
  }
  next.push(0);
  return next;
}

function FormatNumberLength(r, length) {
    while (r.length < length) {
        r = "0" + r;
    }
    return r;
}

module.exports = {
  run: run
}
