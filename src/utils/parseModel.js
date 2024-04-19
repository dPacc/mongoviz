const { Collection } = require("../lib/DS");

const parseModel = (model, erd, options) => {
  console.log("--> Parsing model", model.collection.collectionName);

  const collectionName = model.collection.collectionName;
  const collection = new Collection(collectionName, options);
  const paths = model.schema.paths;

  Object.keys(paths).forEach((fieldName, index) => {
    const fieldType = paths[fieldName].instance;
    const isReference = paths[fieldName].options.ref;
    collection.addField(fieldName, { type: fieldType });

    if (isReference) {
      const referencedCollectionName = paths[fieldName].options.ref;
      erd.addRelation(collectionName, referencedCollectionName, {
        localField: fieldName,
        foreignField: "_id",
        localFieldIndex: index,
      });
    }
  });

  erd.addCollection(collection);
};

module.exports = { parseModel };
