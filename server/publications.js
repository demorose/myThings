Meteor.publish('lists', function() {
    return Lists.find({
        $or: [
            {'owner': this.userId},
            {'owner': null}
        ]
    });
})
Meteor.publish('items', function() {
    return Items.find({'owner': this.userId});
})
