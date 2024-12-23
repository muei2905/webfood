import React from 'react'
import { Route, Routes } from 'react-router-dom'
import AdminRoute from './AdminRoute'
import CustomerRoute from './CustomerRoute'

const Routers = () => {
  return (
    <div>
      <Routes>
        <Route path='/admin/restaurants/*' element={<AdminRoute/>}/>
        <Route path='/*' element={<CustomerRoute/>}/>
      </Routes>
    </div>
  )
}

export default Routers
