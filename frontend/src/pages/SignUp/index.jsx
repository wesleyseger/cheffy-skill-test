import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { Navbar } from "../../components/Navbar";
import { notify } from "../../components/Toast";

import api from '../../services/api';
import animate from "../../utils/animate";

import { validateSignUp } from "../../utils/yup";

import styles from './styles.module.scss';

export function SignUp() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [termsCheck, setTermsCheck] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate()

  useEffect(() => {
    animate('fade-in-top', [styles.signUpContent])
  }, [])

  const handleSignUp = async (e) => {
    e.preventDefault();
    let form = { name: name, email: email, password: password, confirmPassword: confirmPassword };
    let isValid = await validateSignUp(form, setErrorMessage)
    if (isValid) {
      try {
        let response = await api.post('/auth/signup', form);
        if (response.status === 200) {
          navigate('/login')
          notify('success', 'User created with success')
        }
      } catch (err) {
        notify('error', err.response.data.error)
      }
    }
  }

  return (
    <div className={styles.signUpWrapper}>
      <Navbar />
      <div className={styles.signUpContent}>
        <form>

          <div>
            <h3>Create an account</h3>
            <small>or <a href="/login">login</a></small>
          </div>

          <input value={name} onChange={e => setName(e.target.value)} placeholder="Name" />
          <input value={email} onChange={e => setEmail(e.target.value)} placeholder="E-mail" />
          <input value={password} type="password" onChange={e => setPassword(e.target.value)} placeholder="Password" />
          <input value={confirmPassword} type="password" onChange={e => setConfirmPassword(e.target.value)} placeholder="Confirm Password" />
          <small>{errorMessage}</small>

          <span>
            <input type="checkbox" id="terms" onChange={() => setTermsCheck(!termsCheck)} />
            <label htmlFor="terms">I accept the <a href="http://fitnik.tech/public/docs/terms.pdf" target="_blank">terms and conditions</a>.</label>
          </span>

          <button disabled={!termsCheck || !name || !email || !password || !confirmPassword} onClick={handleSignUp}>Create</button>
        </form>

      </div>
      {/* <Toast /> */}
    </div>
  )
}