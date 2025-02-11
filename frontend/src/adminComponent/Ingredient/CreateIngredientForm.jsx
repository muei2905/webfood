import { Button, FormControl, Select, TextField , MenuItem, InputLabel} from '@mui/material'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createIngedient } from '../../component/State/Ingredients/Action'

const CreateIngredientForm = () => {
    const [FormData, setFormData] = useState({ name: "", categoryId: "" })
    const {restaurant, ingredients}= useSelector(store=>store)
    const dispatch= useDispatch();
    const handleSubmit = (e) => {
        e.preventDefault()
        const data = {
          ...FormData, restaurantId:restaurant.usersRestaurant.id
        }
       dispatch(createIngedient({ingredientData:data, jwt:localStorage.getItem("jwt")}))
        console.log(data)
    }
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...FormData, [name]: value });

    };
    return (
        <div className=''>
            <div className="p-5">
                <h1 className='text-gray-400 text-center text-xl pb-10' >Create Ingredient</h1>
                <form className='space-y-5' onSubmit={handleSubmit}>
                    <TextField fullWidth
                        id='name'
                        name='name'
                        label='Food Category'
                        variant='outlined'
                        onChange={handleInputChange}
                        value={FormData.name}
                    ></TextField>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Food Category</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="category"
                            value={FormData.ingredientCategoryId}
                            label="Category"
                            name='categoryId'
                            onChange={handleInputChange}
                        >
                            {ingredients.categories.map((item)=><MenuItem value={item.id}>{item.name}</MenuItem>)}
                        </Select>
                    </FormControl>
                    <div className="flex justify-center">
                        <Button variant='contained' type='submit'>Create Ingredient</Button>
                    </div>
                </form>

            </div>
        </div>
    )
}

export default CreateIngredientForm