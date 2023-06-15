import { useEffect, useState } from "react";
import "./App.css";
import TodoForm from "./TodoForm";
import TodoList from "./TodoList";

function App() {
  const [user, setUser] = useState<any>(null);
  const [todos, setTodos] = useState<any>(null);

  const getUser = async () => {
    // get azure static web app user
    try {
      const user = await fetch("/.auth/me");
      const userJson = await user.json();
      const { clientPrincipal } = userJson;
      setUser(clientPrincipal ? clientPrincipal.userDetails : false);
    } catch (err) {
      console.error("something went wrong", err);
    }
  };

  const getTodos = async () => {
    try {
      const todoRes = await fetch("/api/todos");
      const todoData = await todoRes.json();
      setTodos(todoData);
    } catch (err) {
      console.error("something went wrong", err);
    }
  };

  useEffect(() => {
    getUser();
    getTodos();
  }, []);

  return (
    <>
      <h1>Home</h1>
      <p>{user === null && "loading"}</p>
      {user === false ? (
        <a href="/.auth/login/github">Login</a>
      ) : (
        <div>
          <a href="/.auth/logout">Logout</a>
          <TodoList todos={todos} />
          <TodoForm getTodos={getTodos} />
        </div>
      )}
    </>
  );
}

export default App;
