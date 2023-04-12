import express from 'express'
import Todo from '../../models/Todo.js'

const router = express.Router()

// const array = [];

const todoList = new Todo()

router.post('/', (req, res) => {
  const { todo } = req.body
  if (!todo) {
    return res.status(400).json({ message: 'todo is required' })
  }
  const updatedTodo = todoList.addTodo(todo)
  res.json({ todos: updatedTodo })
})

router.get('/', (req, res) => {
  const todos = todoList.getTodos()
  res.json({ todos })
})

router.get('/:id', (req, res) => {
  const { id } = req.params
  const todo = todoList.getTodo(id)
  if (!todo) {
    return res.status(404).json({ message: 'todo not found' })
  }
  res.json({ todo })
})

router.delete('/:id', (req, res) => {
  const { id } = req.params
  const todo = todoList.getTodo(id)
  if (!todo) {
    return res.status(404).json({ message: 'todo not found' })
  }
  res.json({ todos: todoList.deleteTodo(id) })
})

router.put('/:id', (req, res) => {
  const { id } = req.params
  const { todo } = req.body
  if (!todo) {
    return res.status(400).json({ message: 'todo is required' })
  }
  const oldTodo = todoList.getTodo(id)
  if (!oldTodo) {
    return res.status(404).json({ message: 'todo not found' })
  }
  const updatedTodo = todoList.updateTodo(id, todo) 
  res.json({ todos: updatedTodo })
})

export default router
