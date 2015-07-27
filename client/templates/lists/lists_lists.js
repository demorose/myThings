Template.listsList.helpers({
    lists: function() {
        return Lists.find();
    }
});

var inputIds = 2;

Template.listsList.events({
    "click #add-list": function(event) {
        $('.popup#add-new-list').show();
        $('.popupBack#add-new-list-background').show();
    },
    "click #add-new-list-background": function(event) {
        $('.popup#add-new-list').hide();
        $('.popupBack#add-new-list-background').hide();
    },
    "submit #new-list": function(event) {
        var name = event.target.name.value;
        var color = event.target.color.value;

        var attributes = [];
        var attributesInput = $(event.target).find('.attribute').each( function(index) {
            attributes.push({
                'name': $(this).val(),
                'underscored_name': $(this).val().replace(/\s\+/g, '_'),
            });
        });


        Lists.insert({
            'name': name,
            'color': color,
            'createdAt': new Date(),
            'attributes': attributes,
        })

        event.target.name.value = "";
        event.target.color.value = "";

        $('.popup#add-new-list').hide();
        $('.popupBack#add-new-list-background').hide();
        return false;
    },

    "click #clone_attribute": function(event) {
        var cloned = $('#attribute_input_1').eq(0).clone();
        cloned.attr('id', 'attribute_input_'+inputIds++);
        cloned.html(cloned.html().replace(/1/g, inputIds));
        $('#clone_attribute').before(cloned);
    }
});
