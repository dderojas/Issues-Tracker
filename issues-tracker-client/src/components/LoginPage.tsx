import { useState } from 'react'
import { ModalBackground, LoginModal } from "../styles"
import { useSignIn } from 'react-auth-kit'
import { createAccount, login } from '../services'

const LoginPage = () => {
  const signIn = useSignIn()
  const [error, setError] = useState("")
  const [loginInfo, setLoginInfo] = useState({ Username: '', Password: ''})

  const handleLogin = async (e: any) => {
    e.preventDefault()
    const response = await login(loginInfo)

    try {
      signIn({
        token: response.body.jwtToken,
        expiresIn: 3600,
        tokenType: "Bearer",
        authState: { email: response.body.results.Items[0].Username },
      })

      setLoginInfo({ Username: '', Password: '' })
      setError('')

    } catch(e) {
      console.error(e, 'password or email is invalid')
      
      setError('invalid email or password')
    }
  }

  const handleChange = (e: any) => {
    e.preventDefault()
    setLoginInfo({ ...loginInfo, [e.target.name]: e.target.value })
  }

  const createLogin = async (e: any) => {
    e.preventDefault()
    await createAccount(loginInfo)
  }

  return (
    <>
      <ModalBackground>
        <LoginModal>
          <h1>CREATE OR LOGIN</h1>
          <form>
            <input name="Username" type="text" placeholder="username" value={loginInfo.Username} onChange={handleChange} />
            <input name="Password" type="password" placeholder="password" value={loginInfo.Password} onChange={handleChange} />
            <button onClick={handleLogin}>Login</button>
            <button onClick={createLogin}>Create Account</button>
          </form>
          <div>{error}</div>
        </LoginModal>
      </ModalBackground>
    </>
  )
}

export default LoginPage