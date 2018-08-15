import { LocalStorage } from 'backbone.localStorage';

// MODELS
const Todo = Backbone.Model.extend({
  defaults: {
    title: '',
    completed: false
  },
  toggle: function() {
    this.save({
      completed: !this.get('completed')
    });
  }
});

// COLLECTIONS
const TodoList = Backbone.Collection.extend({
  model: Todo,
  localStorage: new LocalStorage('todos-backbone'),
  completed: function() {
    return this.filter(function(todo) {
      return todo.get("completed");
    });
  },
  remaining: function() {
    return this.without.apply(this, this.completed());
  }
});

// VIEWS
const TodoView = Backbone.View.extend({
  initialize: function() {
    this.model.on("change", this.render, this);
    this.model.on('destroy', this.remove, this);
  },
  tagName: 'li',
  id: 'todo-toggle',
  template: _.template($('#item-template').html()),
  render: function() {
    this.$el.html(this.template(this.model.toJSON()));
    this.input = this.$(".edit");
    return this;
  },
  events: {
    "dblclick label": "edit",
    'keypress .edit': 'updateOnEnter',
    'blur .edit': 'close',
    'click .toggle': 'toggleCompleted',
    'click .destroy': 'destroy'
  },
  edit: function() {
    this.$el.addClass("editing");
    this.input.focus();
  },
  updateOnEnter: function(e) {
    if (e.which === 13) this.close();
  },
  close: function() {
    var value = this.input.val().trim();
    if (value) {
        this.model.save({
            title: value
        });
    }
    this.$el.removeClass("editing");
  },
  toggleCompleted: function() {
    this.model.toggle();
  },
  destroy: function() {
    this.model.destroy();
  }
});

const AppView = Backbone.View.extend({
  el: '#todoapp',
  initialize: function () {
    this.input = this.$('#new-todo');
    this.collection.on('add', this.addOne, this);
    this.collection.on('reset', this.addAll, this);
    this.collection.fetch();
  },
  events: {
    'keypress #new-todo': 'createTodoOnEnter',
  },
  createTodoOnEnter: function(e){
    if ( e.which !== 13 || !this.input.val().trim() ) {
      return;
    }
    this.collection.create({
      title: this.input.val().trim(),
      completed: false
    });
    this.input.val("");
  },
  addOne: function(todoModel){
    let view = new TodoView({model: todoModel});
    $('#todo-list').append(view.render().el);
  },
  addAll: function(){
    $('#todo-list').html("");
    switch (window.filter) {
      case "completed": {
        _.each(this.collection.completed(), this.addOne);
        break;
      }
      case "pending": {
        _.each(this.collection.remaining(), this.addOne);
        break;
      }
      default: {
        this.collection.each(this.addOne, this);
        break;
      }
    }
  }
});

const Router = Backbone.Router.extend({
  routes: {
    ':filter': 'setFilter'
  },
  setFilter: function(params) {
    window.filter = params.trim() || '';
    this.collection.trigger('reset');
  }
});

export { Todo, TodoList, TodoView, AppView, Router };
