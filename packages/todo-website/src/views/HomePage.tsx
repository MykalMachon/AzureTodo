import TodoForm from "../components/todos/TodoForm";
import TodoList from "../components/todos/TodoList";
import useAuth from "../hooks/useAuth";

const HomePage = () => {
  const { user } = useAuth();

  return (
    <>
      <header>
        <h1>Home</h1>
        {user === null && <p>loading...</p>}
        {user === false && (
          <p>
            <a href="/.auth/login/github">Login</a>
          </p>
        )}
        {user !== false && user !== null && (
          <p>
            Hi, {user !== true && user.userDetails}!{" "}
            <a href="/.auth/logout">Logout</a>
          </p>
        )}
      </header>
      <main>
        <p>{user === null && "loading"}</p>
        {user === false || user === null ? (
          <>
            {user === false && <p>please log in</p>}
            {user === null && <p>loading...</p>}
          </>
        ) : (
          <div>
            <TodoList />
            <TodoForm />
          </div>
        )}
      </main>
    </>
  );
};

export default HomePage;
