
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from './styles.module.scss';

import api from "../../services/api";

import { Navbar } from "../../components/Navbar";

import { validateResetPassword } from "../../utils/yup";

import { notify } from "../../components/Toast";
import animate from "../../utils/animate";

export function ResetPassword() {
  const params = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    animate('fade-in-top', [styles.resetPasswordContent])
  }, [])

  async function handleResetPassword() {
    let form = { password: password, confirmPassword: confirmPassword };
    let isValid = await validateResetPassword(form, setErrorMessage)
    if (isValid) {
      try {
        let response = await api.post('/auth/resetpassword', { token: params.token, password: password, confirmPassword: confirmPassword });
        if (response.status === 200) {
          navigate('/login')
          notify('success', 'Password updated successfully')
        }

      } catch (err) {
        console.log(err)
        notify('error', err.response.data.error)
      }
    }

  }

  return (
    <div className={styles.resetPasswordWrapper}>
      <Navbar signUp />

      <div className={styles.resetPasswordContent}>
        <h1>Define your new password</h1>
        <p>Choose a new password</p>
        <input value={password} type="password" onChange={e => setPassword(e.target.value)} placeholder="New password" />
        <input value={confirmPassword} type="password" onChange={e => setConfirmPassword(e.target.value)} placeholder="Confirm new password" />
        <small>{errorMessage}</small>
        <button disabled={!password || !confirmPassword} onClick={handleResetPassword}>Update Password</button>
      </div>
    </div>
  )
}