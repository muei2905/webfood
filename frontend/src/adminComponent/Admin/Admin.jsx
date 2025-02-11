import React, { useEffect } from 'react'
import AdminSideBar from './AdminSideBar'
import { Route, Routes } from 'react-router-dom'
import Dashboard from '../Dashboard/Dashboard'
import Order from '../Order/Order'
import Menu from '../Menu/Menu'
import Event from '../Event/Event'
import FoodCategory from '../FoodCategory/FoodCategory'
import Ingredient from '../Ingredient/Ingredient'
import RestaurantDetail from './RestaurantDetail'
import CreateMenuForm from '../Menu/CreateMenuForm'
import { useDispatch, useSelector } from 'react-redux'
import { getRestaurantById, getRestaurantsCategory } from '../../component/State/Restaurant/Action'
import { getMenuItemsByRestaurantId } from '../../component/State/Menu/Action'
import { getRestaurantsOrder } from '../../component/State/RestaurantOrder/Action'

const Admin = () => {
  const dispatch= useDispatch();
  const jwt=localStorage.getItem("jwt")
  const {restaurant}= useSelector(store=>store)
    const handleClose=()=>{
     

    }
    useEffect(()=>{
      dispatch(getRestaurantsCategory({jwt:jwt, restaurantId:restaurant.usersRestaurant?.id}))
    
      dispatch(getRestaurantsOrder({jwt:jwt,restaurantId:restaurant.usersRestaurant?.id}))
    },[])
  return (
    <div>
      <div className="lg:flex justify-between">
        <div>
            <AdminSideBar handleClose={handleClose}/>
        </div>
        <div className="lg:w-[80%]">
          <Routes>
            <Route path='/dashboard' element={<Dashboard/>}/>
            <Route path='/orders' element={<Order/>}/>
            <Route path='/menu' element={<Menu/>}/>
            <Route path='/category' element={<FoodCategory/>}/>
            <Route path='/ingredients' element={<Ingredient/>}/>
            <Route path='/events' element={<Event/>}/>
            <Route path='/details' element={<RestaurantDetail/>}/>
            <Route path='/add-menu' element={<CreateMenuForm/>}/>
          </Routes>
        </div>
      </div>
    </div>
  )
}

export default Admin
