import { FormEvent, useState } from "react";

interface TodoFormProps {
  getTodos: () => void;
}

const TodoForm = ({ getTodos }: TodoFormProps) => {
  const [loading, setLoading] = useState<boolean>(false);

  const addNewTodo = async (event: FormEvent) => {
    event.preventDefault();

    setLoading(true);

    // add new todo
    // get todo data from form
    const newTodo = {
      body: event.target.newTodo.value,
      completed: false,
    };

    console.log(newTodo);

    // send todo to the api to be saved
    const res = await fetch("/api/todos", {
      method: "POST",
      body: JSON.stringify(newTodo),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();

    console.log(data);
    setLoading(false);

    // reset form
    event.target.newTodo.value = "";
    getTodos();
  };

  return (
    <form onSubmit={addNewTodo}>
      <label htmlFor="newTodo">
        Todo:
        <input type="text" id="newTodo" name="newTodo" />
      </label>
      <button type="submit" disabled={loading}>
        {loading ? "Loading..." : "Add Todo"}
      </button>
    </form>
  );
};

export default TodoForm;
