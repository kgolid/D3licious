var d3 = require('d3');

module.exports.run = function () {
  var w = 900,
      h = 450,
      pixelSize = 5;

  var gw = w/pixelSize;
  var gh = h/pixelSize;

  var pattern_dec = Math.round(Math.random() * 256);
  var pattern = FormatNumberLength(pattern_dec.toString(2), 8);

  var svg = d3.select('.fig3-1').append('svg').attr('width', w).attr('height', h);
  var info = d3.select('.fig3-1').append('p').html('Pattern: ' + pattern_dec + ' (' + pattern + ')');

  var cells = initDataSet(gw, gh);

  var render = function (r) {
    var rows = svg.selectAll('.row')
               .data(cells)
               .enter().append("svg:g")
               .attr("class", "row");

    var cell = rows.selectAll('.cell')
               .data(function (d) { ;return d; })
               .enter().append("rect")
               .attr('x', function (d,i) { return i * pixelSize; })
               .attr('y', function () { return r * pixelSize; })
               .attr('width', pixelSize).attr('height', pixelSize)
               .attr('opacity', function (d) { return d; })
               .attr('class', 'cell');
  };

  d3.timer(function () {
    render(cells.length-1);
    var last = cells[cells.length-1];
    cells.push(getNextRow(last, pattern));
    return cells.length >= gh;
  });

}

var initDataSet = function (width, height) {
  var dataSet = []
  dataSet.push([]);
  for (var j = 0; j < width; j++) {
    dataSet[0].push(0);
  }
  dataSet[0][width/2] = 1;
  return dataSet;
}

var getSuccesor = function (l, t, r, ran) {
  var num = l + (2 * t) + (4 * r);
  return parseInt(ran.charAt(num));
}

var getNextRow = function (last, pattern) {
  var next = [];
  next.push(0);
  for (var i = 1; i < last.length-1; i++) {
    next.push(getSuccesor( last[i-1], last[i], last[i+1], pattern ));
  }
  next.push(0);
  return next;
}

var fillCells = function (cells) {
  var random = Math.round(Math.random() * 256);
  var arr = FormatNumberLength(random.toString(2), 8);
  for (var i = 1; i < cells.length; i++) {
    for (var j = 1; j < cells[i].length-1; j++) {
      cells[i][j] = getSuccesor( cells[i-1][j-1], cells[i-1][j], cells[i-1][j+1] , arr);
    }
  }
  return cells;
}

function FormatNumberLength(r, length) {
    while (r.length < length) {
        r = "0" + r;
    }
    return r;
}
