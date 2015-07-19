var fig1_1 = require('./figures/fig1-1.js');
var fig1_2 = require('./figures/fig1-2.js');
var fig1_3 = require('./figures/fig1-3.js');
var fig1_4 = require('./figures/fig1-4.js');

var fig2_1 = require('./figures/fig2-1.js');

var fig3_1 = require('./figures/fig3-1.js');

var fig4_1 = require('./figures/fig4-1.js');

module.exports = [
  {
    id: 1,
    name: "Scott's tutorial",
    figures: [
      {
        id: 1,
        description: "Data in divs.",
        script: fig1_1
      },
      {
        id: 2,
        description: "Enter svg.",
        script: fig1_2
      },
      {
        id: 3,
        description: "Let's do that again.",
        script: fig1_3
      },
      {
        id: 4,
        description: "Scatter!",
        script: fig1_4
      }
    ]
  },
  {
    id: 2,
    name: "Perpetual motion",
    figures: [
      {
        id: 1,
        description: "Floating droplets.",
        script: fig2_1
      }
    ]
  },
  {
    id: 3,
    name: "Cellular Automata",
    figures: [
      {
        id: 1,
        description: "Cellular Automata.",
        script: fig3_1
      }
    ]
  },
  {
    id: 4,
    name: "Datasets",
    figures: [
      {
        id: 1,
        description: "Let's look at the data...",
        script: fig4_1
      }
    ]
  }
];
