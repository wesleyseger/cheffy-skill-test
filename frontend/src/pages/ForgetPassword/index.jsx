
import { useEffect, useState } from "react";
import { Navbar } from "../../components/Navbar";
import { SendedMail } from "../../components/SendedMail";

import api from '../../services/api'

import { notify } from "../../components/Toast";

import { validateForgetPassword } from "../../utils/yup";

import styles from './styles.module.scss';
import animate from "../../utils/animate";

export function ForgetPassword() {
  const [email, setEmail] = useState('')
  const [errorMessage, setErrorMessage] = useState('')


  useEffect(()=>{
    animate('fade-in-top', [styles.forgetPasswordContent])
  }, [])

  async function handleSendMail() {
    let form = { email: email };
    let isValid = await validateForgetPassword(form, setErrorMessage)
    console.log(isValid)
    if (isValid) {
      try {
        await api.post('/auth/forgetpassword', form);
        document.getElementById('forget-password').style.display = "none";
        document.getElementById('confirm-msg').style.display = "flex";
      } catch (err) {
        console.log(err);
        notify('error', err.response.data.error)
      }
    }
  }

  return (
    <div className={styles.forgetPasswordWrapper}>
      <Navbar signUp />

      <div className={styles.forgetPasswordContent} id="forget-password">
        <h1>Forgot your password?</h1>
        <p>Enter your email address to reset your password. You may need to check your spam folder.</p>
        <input value={email} onChange={e => setEmail(e.target.value)} placeholder="E-mail" />
        <small>{errorMessage}</small>
        <button onClick={handleSendMail}>Send e-mail</button>
        <b>OR</b>
        <a href="/login">Back to Login</a>
      </div>

      <SendedMail email={email} />
    </div>
  )
}