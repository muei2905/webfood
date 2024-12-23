import { FormControl, FormControlLabel, Grid, Radio, RadioGroup, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import Divider from '@mui/material/Divider';
import MenuCard from './MenuCard';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getRestaurantById, getRestaurantsCategory } from '../State/Restaurant/Action';
import { getMenuItemsByRestaurantId } from '../State/Menu/Action';
const foodTypes = [
    { label: "All", value: "all" },
    { label: "Vegetarian only", value: "vegetarian" },
    { label: "Non - Vegetarian", value: "non_vegetarian" },
    { label: "Seasonal", value: "seasonal" }
]
const RestaurantDetails = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const jwt = localStorage.getItem("jwt")
    const { auth, restaurant, menu } = useSelector(store => store)
    const [foodType, setFoodType] = useState("all")
    const [selectedCategory, setSelectCategory] = useState("")
    const handleFilter = (e) => {
        setFoodType(e.target.value)
        console.log(e.target.value, e.target.name)
    }
    const handleFilterCategory = (e, value) => {
        if (value === "all") {
            setSelectCategory(""); 
        } else {
            setSelectCategory(value);
        }
        console.log(value, e.target.name);
    };

    console.log("restaurant", restaurant)
    console.log("menu", menu)
    const { id, city } = useParams();
    useEffect(
        () => {
            dispatch(getRestaurantById({ jwt, restaurantId: id }));
            dispatch(getRestaurantsCategory({ jwt, restaurantId: id }))
            dispatch(getMenuItemsByRestaurantId({ jwt, restaurantId: id, vegetarian: foodType == "vegetarian", nonveg: foodType == "non_vegetarian", seasonal: foodType == "seasonal", foodCategory: selectedCategory }))
        }, [selectedCategory, foodType]
    )
    return (
        <div className='px-5 lg:px-20'>
            <section>
                <h3 className='text-gray-500 py-2 mt-10'>Home/india/indian fast food/3</h3>
                <div>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <img className='w-full h-[40vh] object-cover' src={restaurant.restaurant?.images[0]} alt="" />
                        </Grid>
                        <Grid item xs={12} lg={6}>
                            <img className='w-full h-[40vh] object-cover' src={restaurant.restaurant?.images[1]} alt="" />
                        </Grid>
                        <Grid item xs={12} lg={6}>
                            <img className='w-full h-[40vh] object-cover' src={restaurant.restaurant?.images[2]} alt="" />
                        </Grid>
                    </Grid>
                </div>
                <div className="pt-3 pb-5">
                    <h1 className='text-4xl font-semibold'>{restaurant.restaurant?.name}</h1>
                    <p className='text-gray-500 mt-1'>{restaurant.restaurant?.description}</p>
                    <div className='space-y-3 mt-3'>
                        <p className='text-gray-500 items-center flex gap-3'>
                            <LocationOnIcon />
                            <span>TP HCM, Viet Nam</span>
                        </p>
                        <p className='text-gray-500 items-center flex gap-3'>
                            <CalendarTodayIcon />
                            <span>Mom-Sun: 9:00AM - 9:00PM (Today)</span>
                        </p>
                    </div>
                </div>
            </section>
            <Divider />
            <section className='pt-[2rem] lg:flex relative'>
                <div className="space-y-10 lg:w-[20%] filter">
                    <div className="box space-y-5 lg:sticky top-28 ">
                        <div className="">
                            <Typography variant='h5' sx={{ paddingBottom: "1rem" }}>
                                Food Type
                            </Typography>
                            <FormControl className='py-10 space-y-5' component={"fieldset"}>
                                <RadioGroup onChange={handleFilter} name='food_types'
                                // value={foodType}
                                >
                                    {
                                        foodTypes.map((item) => <FormControlLabel key={item.value} value={item.value} control={<Radio />} label={item.label} />)
                                    }
                                </RadioGroup>
                            </FormControl>
                        </div>
                        <Divider />
                        <div className="">
                            <Typography variant='h5' sx={{ paddingBottom: "1rem" }}>
                                Food Category
                            </Typography>
                            <FormControl className="py-10 space-y-5" component={"fieldset"}>
                                <RadioGroup
                                    onChange={(e) => handleFilterCategory(e, e.target.value)}
                                    name="food_category"
                                    value={selectedCategory || "all"} 
                                >
                                    <FormControlLabel
                                        key="all"
                                        value="all"
                                        control={<Radio />}
                                        label="All" 
                                    />
                                    {restaurant.categories.map((item) => (
                                        <FormControlLabel
                                            key={item.name}
                                            value={item.name}
                                            control={<Radio />}
                                            label={item.name}
                                        />
                                    ))}
                                </RadioGroup>
                            </FormControl>

                        </div>
                    </div>
                </div>
                <div className="space-y-10 lg:w-[80%] lg:pl-10">
                    {menu.menuItems.map((item) => <MenuCard item={item} />)}
                </div>
            </section>
        </div>
    )
}

export default RestaurantDetails
