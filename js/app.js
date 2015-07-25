var chapter_base = require('./chapter_base.js');
var menu_module = require('./menu.js');
var chapter_module = require('./chapter.js');

var app = {
  state: 'init',
  chapter: null,
  database: chapter_base,
  modules: {
    menu: menu_module,
    chapter: chapter_module,
  },
  init: function () {
    this.cacheDom();
    this.modules.menu.init(this);
    this.modules.chapter.init(this);
    this.render();
  },
  cacheDom: function () {
    this.main = document.querySelector('.main');
    this.leftHead = document.querySelector('.left-head');
    this.rightHead = document.querySelector('.right-head');
  },
  setState: function (state) {
    this.state = state;
  },
  setChapter: function (chapter) {
    this.chapter = chapter;
  },
  render: function () {
    switch (this.state) {
      case 'init':
        this.modules.menu.render();
        break;
      case 'main':
        this.prepareMainPage();
        this.modules.menu.render();
        break;
      case 'chapter':
        this.prepareChapterPage();
        this.modules.chapter.setChapter(this.chapter);
        this.modules.chapter.render();
        break;
      default:
    }
  },
  prepareChapterPage: function () {
    this.leftHead.onclick = this.handleHeaderClick.bind(this);
    this.rightHead.innerText = this.chapter.name;

    this.main.removeChild(document.querySelector('.menu'));
  },
  prepareMainPage: function () {
    this.leftHead.onclick = null;
    this.rightHead.innerText = "";

    this.main.removeChild(document.querySelector('.chapter'));
  },
  handleHeaderClick: function () {
    this.setState('main');
    this.render();
  },
  handleMenuItemClick: function (target) {
    this.setState('chapter');
    this.setChapter(target);
    this.render();
  }
}

app.init();
