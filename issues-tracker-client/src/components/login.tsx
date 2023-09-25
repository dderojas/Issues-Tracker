import { useState } from 'react'
import { ModalBackground, ModalContainer } from "../styles"
import { useSignIn } from 'react-auth-kit'

const Login = () => {
  const signIn = useSignIn()
  const [error, setError] = useState("")

  const handleClick = (e: any) => {
    e.preventDefault()
    try {
      signIn({
        token: 'asdf',
        expiresIn: 3600,
        tokenType: "Bearer",
        authState: { email: 'test@mail.com' },
      })
    } catch(e) {
      console.error(e, 'error???')
      //@ts-ignore
      setError('whoopsies')
    }
  }

  return (
    <>
      <ModalBackground>
        <ModalContainer>
          <h1>LOGIN</h1>
          <form onSubmit={handleClick}>
            <input type="text" placeholder="username"/>
            <input type="text" placeholder="password"/>
            <button>click meeeee</button>
          </form>
          <div>{error && 'whhhoppppsssiessss'}</div>
        </ModalContainer>
      </ModalBackground>
    </>
  )
}

export default Login