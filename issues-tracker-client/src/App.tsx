import { useAuthUser, useIsAuthenticated } from 'react-auth-kit'
import { IssuesTracker, LoginPage } from "./components";

const App = () => {
const auth = useAuthUser()
const isAuthenticated = useIsAuthenticated()
console.log(isAuthenticated(), 'Authentic???')
console.log(auth(), 'auth data?')
console.log(window.location.hostname, 'hostname??')
  return (
    <>
      {isAuthenticated() && <IssuesTracker />}
      {/* <IssuesTracker /> */}
      <LoginPage />
    </>
  );
}

export default App;
