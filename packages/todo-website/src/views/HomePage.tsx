import { useEffect, useState } from "react";
import TodoForm from "../components/todos/TodoForm";
import TodoList from "../components/todos/TodoList";
import useAuth from "../hooks/useAuth";

const HomePage = () => {
  const [todos, setTodos] = useState<null | Array<Todo>>(null);
  const { user } = useAuth();

  const getTodos = async () => {
    try {
      const todoRes = await fetch("/api/todos");
      const todoData = await todoRes.json();
      if (todoData.length === 0) return setTodos([]);

      setTodos(todoData);
    } catch (err) {
      console.error("something went wrong", err);
    }
  };

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <>
      <header>
        <h1>Home</h1>
      </header>
      <main>
        <p>{user === null && "loading"}</p>
        {user === false ? (
          <a href="/.auth/login/github">Login</a>
        ) : (
          <div>
            <a href="/.auth/logout">Logout</a>
            <TodoList todos={todos || []} />
            <TodoForm getTodos={getTodos} />
          </div>
        )}
      </main>
    </>
  );
};

export default HomePage;
