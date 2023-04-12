export default class Todo {
  constructor() {
    this.todos = []
  }

  addTodo(todo) {
    this.todos.push(todo);
    return this.todos;
  }

  getTodos() {
    return this.todos
  }

  getTodo(id) {
    return this.todos[id - 1]
  }

  deleteTodo(id) {
    this.todos.splice(id - 1, 1)
    return this.todos;
  }

  updateTodo(id, todo) {
    this.todos[id - 1] = todo
    return this.todos;
  }
}
