var chapter_base = require('./chapter_base.js');

var main = document.querySelector('.main');
var leftHead = document.querySelector('.left-head');
var rightHead = document.querySelector('.right-head');

var loadMainPage = function () {
  // Load menu
  var menu = document.querySelector('#menu-template').content.cloneNode(true);
  main.appendChild(menu);

  // Load menu items
  for (var i = 0; i < chapters.length; i++) {
    var menuItem = document.querySelector('#menu-item-template').content.cloneNode(true);
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
  var chapter = document.querySelector('#chapter-template').content.cloneNode(true);
  main.appendChild(chapter);

  // Load figure containers
  for (var i = 0; i < chap.figures.length; i++) {
    var figure = document.querySelector('#figure-template').content.cloneNode(true);
    figure.querySelector('.description').innerText = chap.figures[i].description;
    figure.querySelector('.figure').classList.add('fig' + chap.id + '-' + chap.figures[i].id);
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
  for (var i = 0; i < chap.figures.length; i++) {
    chap.figures[i].script.run();
  }
}

var createClickHandler = function (arg) {
  return function () { loadChapter(arg) }
}

loadMainPage();
