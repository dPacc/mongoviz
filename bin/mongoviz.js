#!/usr/bin/env node
const program = require("commander");
const fs = require("fs");
const util = require("util");
const readdir = util.promisify(fs.readdir);
const path = require("path");
const ERD = require("../src/lib/ERD");
const allowedFormats = [
  "svg",
  "dot",
  "xdot",
  "plain",
  "plain-ext",
  "ps",
  "ps2",
  "json",
  "json0",
  "png",
];

const main = async () => {
  program
    .version("0.1.0")
    .option("-p, --path <path>", "Set the models path to generate an ERD from.")
    .option("-o, --output <path>", "Set output file path.")
    .option(
      "-f, --format [format]",
      "Specify the output format (default: svg).",
      "svg"
    )
    .option("-c, --color <color>", "Set the background color of collections.")
    .option("-i, --ignore-index", "Ignore index.js files.")
    .parse(process.argv);

  if (!allowedFormats.includes(program.format)) {
    console.error(`Error: Format '${program.format}' is not supported.`);
    return;
  }

  try {
    const modelDirectory = path.resolve(program.path);
    const outputFilePath = path.resolve(program.output);
    const modelFiles = await readdir(modelDirectory);
    const models = [];

    modelFiles.forEach((file) => {
      if (
        file.endsWith(".js") &&
        !(file === "index.js" && program.ignoreIndex)
      ) {
        const model = require(path.join(modelDirectory, file));
        models.push(model);
      }
    });

    const diagram = await ERD.generateFromModels(models, {
      format: program.format,
      color: program.color || "#4477c9",
    });

    fs.writeFileSync(outputFilePath, diagram);
    console.log("ERD written to", outputFilePath);
  } catch (error) {
    console.error("Failed to generate ERD:", error);
  }
};

main();
