import { Button, TextField } from '@mui/material'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { createCategory } from '../../component/State/Restaurant/Action';

const CreateFoodCategoryForm = () => {
   
    const dispatch= useDispatch();
    const [FormData, setFormData]= useState({categoryName:"", restaurantId:""})
    const handleSubmit=(e)=>{
        e.preventDefault()
        const data={
            name:FormData.categoryName,
            restaurantId:{
                id:2
            }
        }
        dispatch(createCategory({reqData:data, jwt:localStorage.getItem("jwt")}))
        console.log(data)
    }
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };
    
  return (
    <div className=''>
        <div className="p-5">
            <h1 className='text-gray-400 text-center text-xl pb-10' >Create Food Category</h1>
            <form className='space-y-5' onSubmit={handleSubmit}>
            <TextField fullWidth
                                id='name'
                                name='categoryName'
                                label='Name'
                                variant='outlined'
                                onChange={handleInputChange}
                                value={FormData.categoryName}
                            ></TextField>
                              <div className="flex justify-center">
                        <Button variant='contained' type='submit'>Create Category</Button>
                    </div>
            </form>
            
        </div>
    </div>
  )
}

export default CreateFoodCategoryForm