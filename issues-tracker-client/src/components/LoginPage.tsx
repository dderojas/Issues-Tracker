import { useState } from 'react'
import { ModalBackground, LoginModal, LoginBackground, LoginButtons } from "../styles"
import { useSignIn } from 'react-auth-kit'
import { createAccount, login } from '../services'

const LoginPage = () => {
  const signIn = useSignIn()
  const [error, setError] = useState("")
  const [loginInfo, setLoginInfo] = useState({ Username: '', Password: ''})

  const handleLogin = async (e: React.MouseEvent<HTMLButtonElement>) => {
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    setLoginInfo({ ...loginInfo, [e.target.name]: e.target.value })
  }

  const createLogin = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    await createAccount(loginInfo)
  }

  return (
    <>
      <LoginBackground>
        <div className='intro-container'>
          <h3>Welcome to my issues tracker app! Just create a login to get started</h3>
        </div>
        <ModalBackground>
          <LoginModal>
            <h1>CREATE OR LOGIN</h1>
            <form>
              <input name="Username" type="text" placeholder="username" value={loginInfo.Username} onChange={handleChange} />
              <input name="Password" type="password" placeholder="password" value={loginInfo.Password} onChange={handleChange} />
              <div className='login-buttons-container'>
                <LoginButtons onClick={handleLogin}>Login</LoginButtons>
                <LoginButtons onClick={createLogin}>Create Account</LoginButtons>
              </div>
            </form>
            <div>{error}</div>
          </LoginModal>
        </ModalBackground>
      </LoginBackground>
    </>
  )
}

export default LoginPage