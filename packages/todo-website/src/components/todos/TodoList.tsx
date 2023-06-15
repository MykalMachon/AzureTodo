interface TodoListProps {
  todos: Array<{
    userId: string;
    body: string;
    completed: boolean;
    id: string;
  }>;
}

const TodoList = ({ todos }: TodoListProps) => {
  if (todos === null) return <p>Loading...</p>;

  if (todos.length === 0) return <p>No todos</p>;

  return (
    <ul>
      {todos.map((todo) => (
        <li key={todo.id}>{todo.body}</li>
      ))}
    </ul>
  );
};

export default TodoList;
