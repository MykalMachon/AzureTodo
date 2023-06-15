import { useEffect, useState } from "react";
import { UserProvider } from "./components/contexts/UserContext";
import TodoForm from "./components/todos/TodoForm";
import TodoList from "./components/todos/TodoList";

import useAuth from "./hooks/useAuth";

import { Todo } from "./types";
import HomePage from "./views/HomePage";

function App() {
  // null: loading
  // boolean: logged out
  // User: logged in
  // const [user, setUser] = useState<null | boolean | User>(null);

  // null: loading
  // Array<Todo>: todos
  const [todos, setTodos] = useState<null | Array<Todo>>(null);
  const { user } = useAuth();

  useEffect(() => {
    console.log(user);
  }, [user]);

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
      <UserProvider>
        <HomePage />
      </UserProvider>
    </>
  );
}

export default App;
