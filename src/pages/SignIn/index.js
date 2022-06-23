import { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../contexts/auth'

import logo from '../../assets/image/homecaresystem-logo-login-2.png'


import './signin.css'


function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signIn, loadingAuth } = useContext(AuthContext);

  function handledSubmit(e) {
    e.preventDefault();
    if (email !== '' && password !== '') {
      signIn(email, password)
    }
  }


  return (
    <div className="container-center">
      <div className="container-login">
        <div className="logo-login">
          <img src={logo} alt="logo sistema" />
        </div>

        <form className='form-login' onSubmit={handledSubmit}>
          <h1>Login</h1>
          <input type="text" placeholder="email@email.com" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input type="password" placeholder="Senha" value={password} onChange={(e) => setPassword(e.target.value)} />
          <button type="submit">{loadingAuth ? 'Carregando...' : 'Acessar' }</button>
        </form>

        <div className='esqueci-minha-senha'>
          {/* <Link className='register' to="/register">Cadastre-se</Link> */}
          <Link className ='forgot' to="/forgot">Esqueceu a senha?</Link>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
