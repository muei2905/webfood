import React from 'react'
import AdminSideBar from './AdminSideBar'

const Admin = () => {
    const handleClose=()=>{

    }
  return (
    <div>
      <div className="lg:flex justify-between">
        <div>
            <AdminSideBar handleClose={handleClose}/>
        </div>
        <div className="lg:w-[80%]"></div>
      </div>
    </div>
  )
}

export default Admin
