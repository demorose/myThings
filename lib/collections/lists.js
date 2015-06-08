Lists = new Mongo.Collection('lists');
ListsSchema = new SimpleSchema({
    name: {
        type: String,
        label: "Name",
    },
    color: {
        type: String,
        label: "Color",
        regEx: /^#[0-9a-fA-F]{6}$/,
    },
    attributes: {
        type: [Object],
    },
    "attributes.$.name": {
        type: String,
    }
});

Lists.attachSchema(ListsSchema);
