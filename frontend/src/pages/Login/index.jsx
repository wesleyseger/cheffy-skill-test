import { useState, useEffect } from 'react';
import styles from './styles.module.scss';

import { useNavigate } from 'react-router-dom';

import api from '../../services/api';

import { Navbar } from '../../components/Navbar';

import humans from '../../assets/humans.png';
import animate from '../../utils/animate';

export function Login() {
  const navigate = useNavigate()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    animate('fade-in-right', [styles.loginForm]);

    let user = JSON.parse(localStorage.getItem('user'));
    if (user) navigate('/')
  }, []);

  async function handleLogin(e) {
    e.preventDefault()
    try {
      const response = await api.post('auth/login', { username: username, password: password });
      if (response.data.auth === true) {
        localStorage.setItem('user', JSON.stringify(response.data));
        navigate('/')
      }
    } catch (err) {
      if (err.response.status === 401) {
        setErrorMsg('User or password incorrect')
      }
    };
  }

  return (
    <div className={styles.loginWrapper}>

      <Navbar signUp />

      <div className={styles.loginContent}>
        <img src={humans} alt="" />
        <form className={styles.loginForm}>
          <h1>Welcome Back!</h1>
          <h3>Login to continue</h3>

          <input type='email' value={username} autoComplete="on" onChange={e => setUsername(e.target.value)} placeholder="E-mail" />
          <input value={password} type="password" autoComplete="current-password" onChange={e => setPassword(e.target.value)} placeholder="Password" />

          <small>{errorMsg}</small>

          <span>
            <button onClick={e => handleLogin(e)}>LOGIN</button>
            <a href="/forgot">FORGET PASSWORD?</a>
          </span>

        </form>
      </div>
    </div>
  )
}