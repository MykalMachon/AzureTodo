import { createContext, useEffect, useState } from "react";
import { Todo } from "../../types";

type TodoContextType = {
  todos: Array<Todo> | null;
  getTodos: () => Promise<void>;
  setTodos: (todos: Array<Todo>) => void;
};

export const TodoContext = createContext<TodoContextType>({
  todos: null,
  getTodos: async (): Promise<void> => {
    console.log("stub: will be implemented later");
  },
  setTodos: (todos: Array<Todo>) => {
    console.log("stub: will be implemented later", todos);
  },
});

export const TodoProvider = ({ children }: { children: React.ReactNode }) => {
  const [todos, setTodos] = useState<null | Array<Todo>>(null);

  const getTodos = async (): Promise<Array<Todo>> => {
    try {
      const todoRes = await fetch("/api/todos");
      const todoData = await todoRes.json();
      if (todoData.length === 0) return [];
      return todoData;
    } catch (err) {
      console.error("something went wrong", err);
      return [];
    }
  };

  const defaultTodoContext: TodoContextType = {
    todos: todos,
    getTodos: async () => setTodos(await getTodos()),
    setTodos: (todos: Array<Todo>) => setTodos(todos),
  };

  useEffect(() => {
    getTodos().then((fetchedTodos) => setTodos(fetchedTodos));
  }, []);

  return (
    <TodoContext.Provider value={defaultTodoContext}>
      {children}
    </TodoContext.Provider>
  );
};
