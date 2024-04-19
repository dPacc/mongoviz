const boldText = (str) => `<B>${str}</B>`;

class Collection {
  constructor(name, options) {
    this.name = name;
    this.fields = [];
    this.options = options;
  }

  addField(name, options) {
    this.fields.push({ name, options });
  }

  generate() {
    const fieldsMarkup = this.fields
      .map((field, i) => {
        const fieldString = `${field.name}: ${field.options.type}`;
        // Ensure each field has a port that can be referenced by the edges
        return `<tr><td port="${field.name}" align="center"><font color="white">${fieldString}</font></td></tr>`;
      })
      .join("\n");

    return `
      ${
        this.name
      } [shape="record" margin=0 label=<<table BGCOLOR="navy" border="0" cellborder="1" cellspacing="0" cellpadding="8">
      <tr><td bgcolor="navy" align="center" cellpadding="6"><i><font color="white">${boldText(
        this.name
      )}</font></i></td></tr>
      ${fieldsMarkup}
      </table>>]
    `;
  }
}

class ERD {
  constructor() {
    this.collections = [];
    this.relations = [];
  }

  addCollection(collection) {
    this.collections.push(collection);
  }

  addRelation(from, to, config) {
    const relationString = `${to}:${config.foreignField} -> ${from}:${config.localField} [label="${to} to ${from}", arrowhead=none, shape="none", headlabel="N", taillabel="1"]`;
    this.relations.push(relationString);
  }

  generate() {
    const nodesMarkup = this.collections
      .map((collection) => collection.generate())
      .join("\n");
    const relationsMarkup = this.relations.join("\n");

    return `
      digraph {
          graph [margin="0", pad="2", nodesep="2", ranksep="10", overlap=false, splines=true];
          node [shape=record, fontsize=24, height=0.2, width=1.5, color="white", margin="0.5"];
          edge [style=dashed, color="lightgrey", penwidth=2, fontsize=16];
          rankdir=TB;
          ${nodesMarkup}
          ${relationsMarkup}
      }
    `;
  }
}

module.exports = { ERD, Collection };
