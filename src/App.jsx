// @ts-nocheck

import { useState } from 'react'
import Navbar from './components/layout/Navbar/Navbar'
import Auth from './components/pages/Auth/Auth'
import HomePage from './components/pages/HomePage'
import darkTheme from './theme/darkTheme'
import lightTheme from './theme/lightTheme'
import { ThemeProvider, CssBaseline } from '@mui/material'

function App() {
  const [user, setUser] = useState(true);

  return (
    <ThemeProvider theme={lightTheme}>
      <CssBaseline />
      
      {user? <div>
        <Navbar/>
      <HomePage/>
      </div> : <Auth/>}
      
    </ThemeProvider>
  )
}

export default App