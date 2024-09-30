import { useState } from 'react'
import { ModalBackground, LoginModal, LoginBackground, LoginButtons } from "../styles"
import { useSignIn } from 'react-auth-kit'
import { createAccount, login } from '../services'
import { createSignInResponseObj } from 'utils'

const LoginPage = () => {
  const signIn = useSignIn()
  const [error, setError] = useState("")
  const [loginInfo, setLoginInfo] = useState({ Username: '', Password: ''})

  const handleLogin = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    
    try {
      const response = await login(loginInfo)
      const signInObj = createSignInResponseObj(response)
      
      signIn(signInObj)

      setLoginInfo({ Username: '', Password: '' })
      setError('')

    } catch(e) {
      console.error(e, 'invalid email or password')
      
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
    const response = await login(loginInfo)
    const signInObj = createSignInResponseObj(response)

    try {
      signIn(signInObj)

      setLoginInfo({ Username: '', Password: '' })
      setError('')

    } catch(e) {
      console.error(e, 'password or email is invalid')
      
      setError('invalid email or password')
    }
  }

  return (
    <>
      <LoginBackground>
        <div className='intro-container'>
          <h1>SOME TITLE HERE!!</h1>
        </div>
        {/* <ModalBackground> */}
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
        {/* </ModalBackground> */}
      </LoginBackground>
    </>
  )
}

export default LoginPage