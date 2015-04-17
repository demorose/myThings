Router.configure({
    layoutTemplate: 'layout',
    loadingTemplate: 'loading',
    notFoundTemplate: 'notFound',
    waitOn: function() { return Meteor.subscribe('lists'); },
});

Router.route('/', {
    name: 'listsList',
});

Router.route('/lists/:_id', {
    name: 'listPage',
    data: function() { return Lists.findOne(this.params._id); },
});
