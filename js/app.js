var lesson1 = require('./figures/fig1-1.js');
var lesson2 = require('./figures/fig1-2.js');
var lesson3 = require('./figures/fig1-3.js');
var lesson4 = require('./figures/fig1-4.js');
var lesson5 = require('./figures/fig2-1.js');

var chapters = [
  {id: 1, name: "Scott's tutorial", figures: 4},
  {id: 2, name: "Perpetual motion", figures: 1},
  {id: 3, name: "Coming Soon!", figures: 0},
  {id: 4, name: "Coming Soon!", figures: 0}
];

var main = document.querySelector('.main');
var leftHead = document.querySelector('.left-head');
var rightHead = document.querySelector('.right-head');

var loadMainPage = function () {
  // Load menu
  var menu = document.querySelector('#menu').content.cloneNode(true);
  main.appendChild(menu);

  // Load menu items
  for (var i = 0; i < chapters.length; i++) {
    var menuItem = document.querySelector('#menu-item').content.cloneNode(true);
    menuItem.querySelector('.menu-item').innerText = chapters[i].name;
    menuItem.querySelector('.menu-item').onclick = createClickHandler(chapters[i]);
    document.querySelector('.menu').appendChild(menuItem);
  }
}

var loadChapter = function (chap) {
  // Set chapter name in header
  leftHead.onclick = handleHeaderClick;
  rightHead.innerText = chap.name;

  // Remove menu
  main.removeChild(document.querySelector('.menu'));

  // Load chapter container
  var chapter = document.querySelector('#chapter').content.cloneNode(true);
  main.appendChild(chapter);

  // Load figure containers
  for (var i = 0; i < chap.figures; i++) {
    var figure = document.querySelector('#figure').content.cloneNode(true);
    figure.querySelector('.figure').classList.add('fig' + chap.id + '-' + (i+1));
    document.querySelector('.chapter').appendChild(figure);
  }

  // Run figure scripts
  run_scripts(chap);
}

var prepareMainPage = function () {
  // Reset header
  leftHead.onclick = null;
  rightHead.innerText = "";

  // Remove chapter container
  main.removeChild(document.querySelector('.chapter'));
}

var handleHeaderClick = function () {
  prepareMainPage();
  loadMainPage();
}

var run_scripts = function (chap) {
  lesson1.run();
  lesson2.run();
  lesson3.run();
  lesson4.run();
  lesson5.run();
}

var createClickHandler = function (arg) {
  return function () { loadChapter(arg) }
}

loadMainPage();
