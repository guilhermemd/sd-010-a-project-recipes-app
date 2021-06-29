import React, { useState } from 'react';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const minPassLength = 7;
  function handleClick() {
    localStorage.setItem('mealsToken', 1);
    localStorage.setItem('cocktailsToken', 1);
  }
  const patternEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return (
    <>
      <h1>Login</h1>
      <form>
        <input
          type="email"
          value={ email }
          placeholder="E-mail"
          data-testid="email-input"
          pattern={ patternEmail }
          onChange={ (ev) => setEmail(ev.target.value) }
        />
        <input
          type="password"
          value={ password }
          placeholder="Senha"
          data-testid="password-input"
          onChange={ (ev) => setPassword(ev.target.value) }
        />
        <button
          type="button"
          data-testid="login-submit-btn"
          onClick={ handleClick }
          disabled={ !((patternEmail.test(email)) && (password.length >= minPassLength)) }
        >
          Entrar
        </button>
      </form>
    </>
  );
}

export default Login;
