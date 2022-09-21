import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './styles.module.scss';

export function Home() {
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    let { user } = JSON.parse(localStorage.getItem('user'));
    setUser(user);
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login')
  }

  return (
    <div className={styles.homeWrapper}>
      <h3>Logged user: {user.name}</h3>
      <h3>E-mail: {user.username}</h3>
      <button onClick={handleLogout}>Logout</button>
    </div>
  )
}