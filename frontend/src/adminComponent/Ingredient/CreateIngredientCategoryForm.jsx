import { Button, TextField  } from '@mui/material'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createIngredientCategory } from '../../component/State/Ingredients/Action'

const CreateIngredientCategoryForm = () => {
    const [FormData, setFormData] = useState({ name: "" })
    const dispatch= useDispatch()
    const {restaurant}= useSelector(store=>store)
    const handleSubmit = (e) => {
       e.preventDefault()
       const data={
        name:FormData.name, restaurantId:restaurant.usersRestaurant.id
       }
       dispatch(createIngredientCategory({categoryData:data, jwt:localStorage.getItem("jwt")}))
        console.log(data)
    }
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...FormData, [name]: value });
    };
    return (
        <div className=''>
            <div className="p-5">
                <h1 className='text-gray-400 text-center text-xl pb-10' >Create Ingredient Category</h1>
                <form className='space-y-5' onSubmit={handleSubmit}>
                    <TextField fullWidth
                        id='name'
                        name='name'
                        label='category'
                        variant='outlined'
                        onChange={handleInputChange}
                        value={FormData.name}
                    ></TextField>
                   
                    <div className="flex justify-center">
                        <Button variant='contained' type='submit'>Create Category</Button>
                    </div>
                </form>

            </div>
        </div>
    )
}

export default CreateIngredientCategoryForm