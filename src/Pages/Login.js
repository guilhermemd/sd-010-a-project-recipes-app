import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { actionLogin } from '../redux/actions';
import './PagesCss/Login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginButton, setLoginButton] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    const validateFields = () => {
      const sixDigits = 6;
      const regex = /^[\w.]+@[a-z]+\.\w{2,3}$/g;
      const resultButton = password.length > sixDigits && regex.test(email);
      setLoginButton(resultButton);
    };
    validateFields();
  }, [email, password]);

  const loginBtn = () => {
    dispatch(actionLogin(email, password));
    history.push('/comidas');
    const lintEmail = email;
    const lsemail = JSON.stringify({ email: lintEmail });
    window.localStorage.setItem('user', lsemail);
    localStorage.setItem('mealsToken', 1);
    localStorage.setItem('cocktailsToken', 1);
  };

  return (
    <main className="login-container">
      <Form className="login-form">
        <Form.Label>
          <Form.Control
            type="email"
            data-testid="email-input"
            onChange={ (e) => setEmail(e.target.value) }
          />
        </Form.Label>
        <Form.Label>
          <Form.Control
            type="password"
            data-testid="password-input"
            onChange={ (e) => setPassword(e.target.value) }
          />
        </Form.Label>
        <Button
          variant="primary"
          disabled={ !loginButton }
          onClick={ loginBtn }
          data-testid="login-submit-btn"
        >
          Entrar
        </Button>
      </Form>
    </main>
  );
}

export default Login;
