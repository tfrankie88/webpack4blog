import { Todo, TodoList, TodoView, AppView, Router } from './js/todo.js';

let todoList = new TodoList();

let router = new Router();

Backbone.history.start();

let appView = new AppView({
  collection: todoList
});
