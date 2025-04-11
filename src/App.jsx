// @ts-nocheck

import Navbar from './components/layout/Navbar/Navbar'
import HomePage from './components/pages/HomePage'
import darkTheme from './theme/darkTheme'
import lightTheme from './theme/lightTheme'
import { ThemeProvider, CssBaseline } from '@mui/material'

function App() {
  return (
    <ThemeProvider theme={lightTheme}>
      <CssBaseline />
      <Navbar/>
      <HomePage/>
    </ThemeProvider>
  )
}

export default App