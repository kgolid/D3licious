var chapter = {
  app: null,
  chapter: null,
  templates: {
    container: document.querySelector('#chapter-template'),
    figure: document.querySelector('#figure-template')
  },
  init: function (app) {
    this.app = app;
  },
  setChapter: function (chapter) {
    this.chapter = chapter;
  },
  render: function () {
    var container = this.templates.container.content.cloneNode(true);
    this.app.main.appendChild(container);

    for (var i in this.chapter.figures) {
      this.renderFigure(this.chapter.figures[i]);
    }
  },
  renderFigure: function (figure) {
    var el = this.templates.figure.content.cloneNode(true);
    el.querySelector('.description').innerText = figure.description;
    el.querySelector('.figure').classList.add('fig' + this.chapter.id + '-' + figure.id);
    document.querySelector('.chapter').appendChild(el);

    figure.script.run();
  }
}

module.exports = chapter;
