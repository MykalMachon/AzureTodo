import { useContext, useMemo } from "react";
import { TodoContext } from "../components/contexts/TodoContext";
import { Todo } from "../types";

export const useTodos = () => {
  // todo: return todos and reducer for todos
  const { todos, setTodos, getTodos } = useContext(TodoContext);

  const returnValue = useMemo(() => {
    return {
      todos: todos,
      addTodo: async (body: string, completed: boolean) => {
        await fetch("/api/todos", {
          method: "POST",
          body: JSON.stringify({ body: body, completed: completed }),
          headers: {
            "Content-Type": "application/json",
          },
        });
        await getTodos();
      },
      removeTodo: async (todo: Todo) => {
        // TODO: implement me
        const res = await fetch(`/api/todos/${todo.id}`, {
          method: "DELETE",
        });
        if (res.status == 200) {
          await getTodos();
        } else {
          alert("could not delete todo...");
        }
      },
      updateTodo: async (todo: Todo) => {
        // send todo to the api to be saved
        const res = await fetch(`/api/todos/${todo.id}`, {
          method: "PUT",
          body: JSON.stringify(todo),
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await res.json();
        setTodos(data);
      },
      toggleTodo: async (todo: Todo) => {
        const toggledTodo = {
          ...todo,
          completed: !todo.completed,
        };

        // send todo to the api to be saved
        const res = await fetch(`/api/todos/${todo.id}`, {
          method: "PUT",
          body: JSON.stringify(toggledTodo),
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (res.status == 200) {
          await getTodos();
        } else {
          alert("could not update todo...");
        }
      },
    };
  }, [todos, setTodos, getTodos]);

  return returnValue;
};
