Template.listsList.helpers({
    lists: function() {
        return Lists.find();
    }
});

Template.listsList.events({
    "click #add-list": function(event) {
        $('.popup#add-new-list').show();
        $('.popupBack#add-new-list-background').show();
    },
    "click #add-new-list-background": function(event) {
        $('.popup#add-new-list').hide();
        $('.popupBack#add-new-list-background').hide();
    },
    "submit .new-list": function(event) {
        var name = event.target.name.value;
        var color = event.target.color.value;
        
        console.log('plop');

        Lists.insert({
            name: name,
            color: color,
            createdAt: new Date()
        })

        event.target.name.value = "";
        event.target.color.value = "";

        $('.popup#add-new-list').hide();
        $('.popupBack#add-new-list-background').hide();
        return false;
    }
});
