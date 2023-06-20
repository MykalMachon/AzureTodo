import React, { useState } from "react";
import { useTodos } from "../../hooks/useTodos";
import { Todo } from "../../types";

interface TodoItemProps {
  todo: Todo;
}

const TodoItem = ({ todo }: TodoItemProps) => {
  const { toggleTodo, removeTodo } = useTodos();
  const [loading, setLoading] = useState<boolean>(false);

  const handleToggleClick = async (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    setLoading(true);
    await toggleTodo(todo);
    setLoading(false);
  };

  const handleDeleteClick = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setLoading(true);
    await removeTodo(todo);
    setLoading(false);
  };

  return (
    <li>
      <div>
        <input
          type="checkbox"
          id={`todo-${todo.id}`}
          onChange={handleToggleClick}
          checked={todo.completed}
          disabled={loading}
        />
        <label htmlFor={`todo-${todo.id}`}>{todo.body}</label>
      </div>
      <button
        aria-label="Delete"
        onClick={handleDeleteClick}
        disabled={loading}
      >
        <span role="img" aria-label="Delete">
          🗑️
        </span>
      </button>
    </li>
  );
};

export default TodoItem;
