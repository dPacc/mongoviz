# MongoViz

MongoViz is a command-line tool designed to generate Entity-Relationship Diagrams (ERD) from Mongoose models in your Node.js applications. It helps visualize the relationships between the database schemas defined in your MongoDB using Mongoose.

## Features

- Supports various output formats including SVG, DOT, JSON, and more.
- Configurable options for ignoring files, setting colors, and specifying output paths.
- Easy-to-use command line interface.
- Free and open source.

## Installation

MongoViz is available as a global npm package. You can install it using npm:

```bash
npm install mongoviz -g
```

## Usage

Once installed, you can run mongoviz from the command line with several options to customize the output.

## Command Line Options

```
-V, --version               Output the version number of MongoViz
-p, --path <path>           Set the path to the directory containing your Mongoose models
-o, --output <path>         Set the path and filename for the output ERD
-i, --ignore-index          Ignore any files named 'index.js'
-f, --format [format]       Specify the output format (svg, dot, xdot, plain, plain-ext, ps, ps2, json, json0)
-c, --color <color>         Specify the background color for collections in the diagram
-h, --help                  Display help for command
```

## Examples

Generating an SVG ERD

```bash
mongoviz -p ./path_to_models_folder/ -f svg -o ./output_folder/erd.svg
```

## Generating a DOT file

```bash
mongoviz -p ./path_to_models_folder/ -f dot -o ./output_folder/erd.dot
```

## Platform-Specific Instructions

For MAC and Linux users:

```bash
mongoviz -p ./path_to_models_folder/ -f svg -o ./erd.svg
```

For Windows users:

```bash
mongoviz -p .\path_to_models_folder\ -f svg -o .\erd.svg
```

## Contributing

Contributions to MongoViz are welcome! Feel free to fork the repository, make changes, and submit pull requests. You can contribute in several ways:

- Add new features
- Improve the documentation
- Fix bugs and issues
- Suggest enhancements

### Directory Structure

The project is organized as follows:

```
mongoviz/
├── bin/
│   └── mongoviz.js       # Entry point for the CLI
├── src/
│   ├── lib/
│   │   ├── ERD.js        # Core ERD generation logic
│   │   └── DS.js         # Definitions for ERD and Collection classes
│   └── utils/
│       └── parseModel.js # Utility to parse mongoose models
├── models/               # Sample directory for Mongoose models
│   └── user.js           # Example Mongoose model
├── output/               # Output directory for generated ERDs
├── package.json
└── README.md
```

## License

MongoViz is released under the MIT License. See the LICENSE file for more details.

## Acknowledgements

Thanks to <https://github.com/jodevsa/mongoose-erd-generator> for the inspiration behind this project.
