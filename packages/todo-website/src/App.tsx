import { TodoProvider } from "./components/contexts/TodoContext";
import { UserProvider } from "./components/contexts/UserContext";

import HomePage from "./views/HomePage";

function App() {
  return (
    <>
      <UserProvider>
        <TodoProvider>
          <HomePage />
        </TodoProvider>
      </UserProvider>
    </>
  );
}

export default App;
