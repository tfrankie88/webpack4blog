import { LocalStorage } from 'backbone.localStorage';
import { Todo } from './model.js';

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

export { TodoList };
