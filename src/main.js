import { Todo } from './js/model.js';
import { TodoList } from './js/collection.js';
import { TodoView, AppView } from './js/view.js';
import { Router } from './js/router.js';

let todoList = new TodoList();

let router = new Router();

Backbone.history.start();

let appView = new AppView({
  collection: todoList
});
