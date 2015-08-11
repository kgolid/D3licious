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
var fig5_3 = require('./figures/fig5-3.js');
var fig6_1 = require('./figures/fig6-1.js');
var fig6_2 = require('./figures/fig6-2.js');
var fig6_3 = require('./figures/fig6-3.js');
var fig7_1 = require('./figures/fig7-1.js');

var art6 = require('./articles/art6.js');

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
    name: "Particles",
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
      },
      {
        id: 3,
        description: "Particles with velocity from mouse.",
        script: fig5_3
      }
    ]
  },
  {
    id: 6,
    name: "Genetic Algorithms - step by step",
    date: "2015-07-26",
    figures: [
      {
        id: 1,
        description: "Random movement from center",
        script: fig6_1
      },
      {
        id: 2,
        description: "Random movement from center",
        script: fig6_2
      },
      {
        id: 3,
        description: "Predefined movement",
        script: fig6_3
      }
    ],
    articles: [
      {
        id: 1,
        body: art6.intro
      }
    ]
  },
  {
    id: 7,
    name: "Imperfect Circles",
    date: "2017-08-06",
    figures: [
      {
        id: 1,
        description: "Arranging points in a circle",
        script: fig7_1
      }
    ]
  }
];
