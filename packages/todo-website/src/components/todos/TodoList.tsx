import { useTodos } from "../../hooks/useTodos";
import TodoItem from "./TodoItem";

const TodoList = () => {
  const { todos } = useTodos();

  if (todos === null) return <p>Loading...</p>;
  if (todos.length === 0) return <p>No todos</p>;

  return (
    <ul>
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </ul>
  );
};

export default TodoList;
