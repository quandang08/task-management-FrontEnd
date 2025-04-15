// @ts-nocheck

import Navbar from './components/layout/Navbar/Navbar'
import Auth from './components/pages/Auth/Auth'
import HomePage from './components/pages/HomePage'
import darkTheme from './theme/darkTheme'
import lightTheme from './theme/lightTheme'
import { ThemeProvider, CssBaseline } from '@mui/material'

function App() {
  return (
    <ThemeProvider theme={lightTheme}>
      <CssBaseline />
      {/* <Navbar/>
      <HomePage/> */}

      <Auth/>
    </ThemeProvider>
  )
}

export default App