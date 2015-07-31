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

    "click #edit-list-background": function(event) {
        $('.popup#edit-list').hide();
        $('.popupBack#edit-list-background').hide();
    },

    "click .list .remove": function(event) {
        event.preventDefault();
        Meteor.call("deleteList", $(event.target).data('list-id'));
    },

    "click .list .edit": function(event) {
        event.preventDefault();
        list = Lists.findOne($(event.target).data('list-id'));

        $('#edit-list-id').val(list._id);
        $('#edit-list-name').val(list.name);
        $('#edit-list-color').val(list.color);
        $('#edit-list .attributes' ).remove();
        for (attribute in list.attributes) {
            $('#edit-list-clone-attribute').before('<p class="attributes" id="edit-list-attribute-input-'+ (parseInt(attribute) + 1) +'"><label for="attribute['+ (parseInt(attribute) + 1) +']">Attribute name</label><input type="text" name="attribute['+ (parseInt(attribute) + 1) +']" class="attribute" value="' + list.attributes[attribute]['name'] + '"id="edit-list-attribute'+ (parseInt(attribute) + 1) +'"></p>');
        }
        $('.popupBack#edit-list-background').show();
        $('.popup#edit-list').show();
    },

    "submit #new-list": function(event) {
        var name = event.target.name.value;
        var color = event.target.color.value;

        var attributes = [];
        var attributesInput = $(event.target).find('.attribute').each( function(index) {
            if ($(this).val()) {
                attributes.push({
                    'name': $(this).val(),
                    'underscored_name': $(this).val().replace(/\s\+/g, '_'),
                });
            }
        });

        if (attributes.length < 1) {
            return false;
        }

        Meteor.call('addList', name, color, attributes);

        event.target.name.value = "";
        event.target.color.value = "";

        $('.popup#add-new-list').hide();
        $('.popupBack#add-new-list-background').hide();
        return false;
    },

    "submit #edit-list": function(event) {
        var id = event.target.id.value;
        var name = event.target.name.value;
        var color = event.target.color.value;

        var attributes = [];
        var attributesInput = $(event.target).find('.attribute').each( function(index) {
            if ($(this).val()) {
                attributes.push({
                    'name': $(this).val(),
                    'underscored_name': $(this).val().replace(/\s\+/g, '_'),
                });
            }
        });

        Meteor.call('editList', id, name, color, attributes);

        event.target.id.value = "";
        event.target.name.value = "";
        event.target.color.value = "";

        $('.popup#edit-list').hide();
        $('.popupBack#edit-list-background').hide();
        return false;
    },

    "click #new-list-clone-attribute": function(event) {
        var cloned = $('#new-list-attribute-input-1').eq(0).clone();
        cloned.attr('id', 'new-list-attribute-input-'+inputIds++);
        cloned.html(cloned.html().replace(/1/g, inputIds));
        $('#new-list-clone-attribute').before(cloned);
    },

    "click #edit-list-clone-attribute": function(event) {
        var cloned = $('#edit-list-attribute-input-1').eq(0).clone();
        cloned.attr('id', 'edit-list-attribute-input-'+inputIds++);
        cloned.html(cloned.html().replace(/1/g, inputIds));
        cloned.find('input').val('');
        $('#edit-list-clone-attribute').before(cloned);
    }
});
