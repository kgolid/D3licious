var fig1_1 = require('./figures/fig1-1.js');
var fig1_2 = require('./figures/fig1-2.js');
var fig1_3 = require('./figures/fig1-3.js');
var fig1_4 = require('./figures/fig1-4.js');
var fig2_1 = require('./figures/fig2-1.js');
var fig3_1 = require('./figures/fig3-1.js');
var fig3_2 = require('./figures/fig3-2.js');
var fig4_1 = require('./figures/fig4-1.js');
var fig5_1 = require('./figures/fig5-1.js');
var fig5_2 = require('./figures/fig5-2.js');

module.exports = [
  {
    id: 1,
    name: "Scott Murray's Tutorial",
    date: "2015-07-10",
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
    name: "Perpetual Motion",
    date: "2015-07-12",
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
    date: "2015-07-18",
    figures: [
      {
        id: 1,
        description: "Pattern generated from single pixel.",
        script: fig3_1
      },
      {
        id: 2,
        description: "Pattern generated from random string.",
        script: fig3_2
      }
    ]
  },
  {
    id: 4,
    name: "Charts from External Data",
    date: "2015-07-19",
    figures: [
      {
        id: 1,
        description: "Norwegian Population, 1986-2014",
        script: fig4_1
      }
    ]
  },
  {
    id: 5,
    name: "Standstill Particles",
    date: "2015-07-21",
    figures: [
      {
        id: 1,
        description: "Particles expanding",
        script: fig5_1
      },
      {
        id: 2,
        description: "Particles with random lifespans",
        script: fig5_2
      }
    ]
  }
];
