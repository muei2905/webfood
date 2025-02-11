import { CssBaseline, ThemeProvider } from '@mui/material'
import './App.css'
import { darkTheme } from './Theme/DarkTheme'
import Routers from './Routers/Routers'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUser } from './component/State/Authentication/Action'
import { store } from './component/State/store'
import { findCart } from './component/State/Cart/Action'
import { getRestaurantsByUserId } from './component/State/Restaurant/Action'


function App() {
  const dispatch = useDispatch();
  const jwt= localStorage.getItem("jwt")
  const {auth}= useSelector(store=>store)
 useEffect(()=>{
  dispatch(getUser(auth.jwt || jwt))
  dispatch(findCart(jwt));
 }, [auth.jwt])
 useEffect(()=>{
    dispatch(getRestaurantsByUserId(auth.jwt||jwt))
 }, [auth.user])
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline/>
      <Routers/>
      
    </ThemeProvider>
  )
}

export default App
