import styles from './styles.module.scss';

import logo from '../../assets/logo.png';

export function Navbar({ signUp }) {
  return (
    <div className={styles.navbarContainer}>
      <a href="/">
        <img src={logo} alt="" />
      </a>
      {signUp ?
        <span>
          New user?
          <a href="/signup"> Sign Up</a>
        </span> : <span />}
    </div>
  )
}