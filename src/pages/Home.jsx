import React from 'react'
import { ThemeProvider , useTheme} from '../context/ThemeContext'


export const Home = () => {

    const { theme, toggleTheme } = useTheme();

  return (
    <div className='home'> <br /><b>Home can Do it Too</b> <br /> <button onClick={toggleTheme}>Toggle Theme From Home Component</button> </div>
  )
}
