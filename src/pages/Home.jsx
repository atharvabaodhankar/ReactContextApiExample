import React from 'react'
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext'


export const Home = () => {
  const { isLoggedIn, login, logout } = useAuth();

  const { theme, toggleTheme } = useTheme();

  return (
    <div className='home'>
      <h2>Home Page</h2>
      <p>User is currently: <b>{isLoggedIn ? 'Logged In' : 'Logged Out'}</b></p>
      <button onClick={isLoggedIn ? logout : login}>
        {isLoggedIn ? 'Logout' : 'Login'}
      </button>
      <br />
      <br />
      <p>Current Theme: <b>{theme}</b></p>
      <button onClick={toggleTheme}>Toggle Theme From Home Component</button>
    </div>
  )
}
