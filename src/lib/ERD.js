const Viz = require("viz.js");
const { Module, render } = require("viz.js/full.render.js");
const { ERD } = require("./DS");
const { parseModel } = require("../utils/parseModel");

const generateFromModels = async (models, options) => {
  const erd = new ERD();
  models.forEach((model) => parseModel(model, erd, options));
  const viz = new Viz({ Module, render });
  const diagram = await viz.renderString(erd.generate(), {
    format: options.format,
  });
  return diagram;
};

module.exports = { generateFromModels };
