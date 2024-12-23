import React from 'react'
import { Route, Routes } from 'react-router-dom'
import CreateRestaurantForm from '../adminComponent/CreateRestaurantForm/CreateRestaurantForm'
import Admin from '../adminComponent/Admin/Admin'
const AdminRoute = () => {
  return (
    <div>
        <Routes>
            <Route path='/*' element={false ? <CreateRestaurantForm/>:<Admin/>}/>
        </Routes>
    </div>
  )
}

export default AdminRoute
