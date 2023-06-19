import TodoForm from "../components/todos/TodoForm";
import TodoList from "../components/todos/TodoList";
import useAuth from "../hooks/useAuth";

const HomePage = () => {
  const { user } = useAuth();

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
            <TodoList />
            <TodoForm />
          </div>
        )}
      </main>
    </>
  );
};

export default HomePage;
