import { FormEvent, useState } from "react";
import { useTodos } from "../../hooks/useTodos";

const TodoForm = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const { addTodo } = useTodos();

  const addNewTodo = async (event: FormEvent) => {
    event.preventDefault();

    setLoading(true);

    const formEl = event.target as HTMLFormElement;
    const inputEl = formEl.newTodo as HTMLInputElement;

    // add new todo
    // get todo data from form
    await addTodo(inputEl.value, false);
    setLoading(false);

    // reset form
    inputEl.value = "";
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
