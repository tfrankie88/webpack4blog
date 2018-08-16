const Router = Backbone.Router.extend({
  routes: {
    ':filter': 'setFilter'
  },
  setFilter: function(params) {
    window.filter = params.trim() || '';
    this.collection.trigger('reset');
  }
});

export { Router };
