import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from 'axios'

function App() {
  const [todos, setTodos] = useState([])

  // intialize todos
  useEffect(() => {
    axios.get('http://localhost:4000/todos').then((res) => {
      setTodos(res.data.todos)
    })
  }, [])

  return (
    <div className="App">
      {todos.map((todo, index) => {
        return <div key={index}>{todo}</div>
      })}
      <br/>
        <form
          onSubmit={(e) => {
            e.preventDefault()
            const formData = new FormData(e.target)
            const todo = formData.get('todo')
            axios.post('http://localhost:4000/todos', { todo }).then((res) => {
              setTodos(res.data.todos)
            })
          }}
        >
          <label>Todo</label>
          <input name="todo" />
          <button>Submit</button>
        </form>
      <br/>
    </div>
  )
}

export default App
