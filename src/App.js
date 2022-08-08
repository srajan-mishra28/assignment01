import { useEffect, useState } from "react";
import "./styles.css";

export default function App() {
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem("todos");
    if (savedTodos) {
      return JSON.parse(savedTodos);
    } else {
      return [];
    }
  });
  const [todo, setTodo] = useState("");

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  function handleInputChange(e) {
    setTodo(e.target.value);
  }

  function handleFormSubmit(e) {
    e.preventDefault();

    if (todo !== "") {
      setTodos([
        ...todos,
        {
          id: todos.length + 1,
          text: todo.trim()
        }
      ]);
    }

    setTodo("");
  }

  function handleDeleteClick(id) {
    const removeItem = todos.filter((todo) => {
      return todo.id !== id;
    });
    setTodos(removeItem);
  }

  return (
    <div className="App">
      <div className="inputDiv">
        <form onSubmit={handleFormSubmit}>
          <input
            name="todo"
            type="text"
            placeholder="Create a new todo"
            value={todo}
            onChange={handleInputChange}
          />
          <button type="submit" class="submit">
            Add
          </button>
        </form>
      </div>
      <div className="todos">
        <ul className="todo-list">
          {todos.map((todo) => (
            <li key={todo.id}>
              {todo.text}{" "}
              <button class="delete" onClick={() => handleDeleteClick(todo.id)}>
                Remove
              </button>
            </li>
          ))}
        </ul>
      </div>
      <p class="p">
        Type in the box to add the items that you want to do. You can delete the
        completed task using Delete button
      </p>
    </div>
  );
}
