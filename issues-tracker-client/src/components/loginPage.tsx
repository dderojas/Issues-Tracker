import { useState } from 'react'
import { ModalBackground, ModalContainer } from "../styles"
import { useSignIn } from 'react-auth-kit'
import { createAccount, login } from '../services'

const LoginPage = () => {
  const signIn = useSignIn()
  const [error, setError] = useState("")
  const [loginInfo, setLoginInfo] = useState({ Username: '', Password: ''})

  const handleLogin = async (e: any) => {
    e.preventDefault()
    const response = await login(loginInfo)
    // this is next
    try {
      signIn({
        token: 'asdf',
        expiresIn: 3600,
        tokenType: "Bearer",
        authState: { email: 'test@mail.com' },
      })
    } catch(e) {
      console.error(e, 'error???')
      
      setError('whoopsies')
    }
  }

  const handleChange = (e: any) => {
    e.preventDefault()
    // console.log(e.target.value, 'eyyyyyy')
    // setLoginInfo({ username: e.target.value[0], password: e.target.value[1] })
    
    setLoginInfo({ ...loginInfo, [e.target.name]: e.target.value })
  }
// why did I have to spread the state?, why did {username: e.target.value[0], password: e.target.value[1]} not work?
  const createLogin = async (e: any) => {
    e.preventDefault()
    // console.log(loginInfo, 'logininfo!!!!')
    const response = await createAccount(loginInfo)
    console.log(response, 'responseinloginnnnnn')
  }

  return (
    <>
      <ModalBackground>
        <ModalContainer>
          <h1>CREATE OR LOGIN</h1>
          <form>
            <input name="Username" type="text" placeholder="username" value={loginInfo.Username} onChange={handleChange} />
            <input name="Password" type="text" placeholder="password" value={loginInfo.Password} onChange={handleChange} />
            <button onClick={handleLogin}>Login</button>
            <button onClick={createLogin}>Create Account</button>
          </form>
          <div>{error && 'whhhoppppsssiessss'}</div>
        </ModalContainer>
      </ModalBackground>
    </>
  )
}

export default LoginPage