import { useState } from "react";
import { useTodos } from "../../hooks/useTodos";
import { Todo } from "../../types";

interface TodoItemProps {
  todo: Todo;
}

const TodoItem = ({ todo }: TodoItemProps) => {
  const { toggleTodo } = useTodos();
  const [loading, setLoading] = useState<boolean>(false);

  const handleClick = async (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    setLoading(true);
    await toggleTodo(todo);
    setLoading(false);
  };

  return (
    <li>
      <input
        type="checkbox"
        id={`todo-${todo.id}`}
        onChange={handleClick}
        checked={todo.completed}
        disabled={loading}
      />
      <label htmlFor={`todo-${todo.id}`}>{todo.body}</label>
    </li>
  );
};

export default TodoItem;
