import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [user, setUser] = useState<any>(null);

  const getUser = async () => {
    // get azure static web app user
    try{ 
      const user = await fetch('/.auth/me');
      const userJson = await user.json();
      const { clientPrincipal } = userJson;
      setUser(clientPrincipal ? clientPrincipal.userDetails : false);
    } catch(err){
      console.error('something went wrong', err);
    }
  }

  const testAPI = async () => {
    try {
      const apiRes = await fetch('/api/meta');
      const apiResJson = await apiRes.json();
      console.log(apiResJson);
    } catch(err){
      console.error('something went wrong', err);
    }
  }

  useEffect(() => {
    getUser();
  }, [])

  return (
    <>
      <h1>Home</h1>
      <p>{user === null && 'loading'}</p>
      {user === false ? 
        (<a href="/.auth/login/github">Login</a>)
      : (<>
        <a href="/.auth/logout">Logout</a>
        <button onClick={() => testAPI()}>hit API</button>
      </>)}
    </>
  )
}

export default App
