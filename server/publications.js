Meteor.publish('lists', function() {
    return Lists.find();
})
Meteor.publish('items', function() {
    return Items.find();
})
