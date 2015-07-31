Meteor.methods({
    
    addList: function(name, color, attributes) {
        if (! Meteor.userId()) {
            throw new Meteor.Error("not-authorized");
        }

        Lists.insert({
            'name': name,
            'color': color,
            'createdAt': new Date(),
            'attributes': attributes,
            'owner': Meteor.userId()
        })
    },

    editList: function(id, name, color, attributes) {
        var list = Lists.find(id);
        if (list.owner = Meteor.userId()) {
            Lists.update(id, {
                'name': name,
                'color': color,
                'createdAt': new Date(),
                'attributes': attributes,
                'owner': Meteor.userId()
            })
        }
    },

    deleteList: function(listId) {
        var list = Lists.find(listId);
        if (list.owner = Meteor.userId()) {
            Lists.remove(listId);
        }
    },
})
