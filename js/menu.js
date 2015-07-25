var menu = {
  app: null,
  items: null,
  templates: {
    container: document.querySelector('#menu-template'),
    item: document.querySelector('#menu-item-template')
  },
  init: function (app) {
    this.app = app;
    this.items = app.database;
  },
  render: function () {
    var menu = this.templates.container.content.cloneNode(true);
    this.app.main.appendChild(menu);

    for (var i in this.items) {
      this.renderItem(this.items[i]);
    }
  },
  renderItem: function (item) {
    var el = this.templates.item.content.cloneNode(true);
    el.querySelector('.menu-item').innerText = item.name;
    el.querySelector('.menu-item').onclick = this.createClickHandler(item);
    document.querySelector('.menu').appendChild(el);
  },
  createClickHandler: function (item) {
    var app = this.app;
    return function () {
      app.handleMenuItemClick(item);
    }
  }
}

module.exports = menu;
