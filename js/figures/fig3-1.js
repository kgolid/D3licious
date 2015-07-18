var d3 = require('d3');

module.exports.run = function () {
  var w = 900,
      h = 450;
      pixelSize = 5;

  var svg = d3.select('.fig3-1').append('svg').attr('width', w).attr('height', h);

  var gw = w/pixelSize;
  var gh = h/pixelSize;

  var initial = initDataSet(gw, gh);

  var cells = fillCells(initial);

  var rows = svg.selectAll('.row')
                .data(cells)
                .enter().append("svg:g")
                .attr("class", "series");

  var cell = rows.selectAll('.cell')
                .data(function (d,i,j) { return d })
                .enter().append("rect")
                .attr('x', function (d,i,j) { return i * pixelSize; })
                .attr('y', function (d,i,j) { return j * pixelSize; })
                .attr('width', pixelSize)
                .attr('height', pixelSize)
                .attr('opacity', function (d) { return d; });
}

var initDataSet = function (width, height) {
  var dataSet = []
  for (var i = 0; i < height; i++) {
    dataSet.push([]);
    for (var j = 0; j < width; j++) {
      dataSet[i].push(0);
    }
  }
  dataSet[0][width/2] = 1;
  return dataSet;
}

var getSuccesor = function (l, t, r, ran) {
  var num = l + (2 * t) + (4 * r);

  return parseInt(ran.charAt(num));
}

var fillCells = function (cells) {
  var random = Math.round(Math.random() * 256);
  var arr = FormatNumberLength(random.toString(2), 8);
  console.log(arr);
  for (var i = 1; i < cells.length; i++) {
    for (var j = 1; j < cells[i].length-1; j++) {
      cells[i][j] = getSuccesor( cells[i-1][j-1], cells[i-1][j], cells[i-1][j+1] , arr);
    }
  }

  return cells;
}

function FormatNumberLength(num, length) {
    var r = "" + num;
    while (r.length < length) {
        r = "0" + r;
    }
    return r;
}
