import { useAuthUser, useIsAuthenticated } from 'react-auth-kit'
import { IssuesTracker, Login } from "./components";

const App = () => {
console.log(document.cookie, '???')
const auth = useAuthUser()
const isAuthenticated = useIsAuthenticated()
console.log(isAuthenticated(), 'Authentic???')
console.log(auth(), 'auth data?')
console.log(window.location.hostname, 'hostname??')
  return (
    <>
      {isAuthenticated() && <IssuesTracker />}
      <Login />
    </>
  );
}

export default App;
