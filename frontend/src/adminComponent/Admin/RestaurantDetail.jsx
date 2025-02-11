import { Button, Card, CardContent, CardHeader, Grid } from '@mui/material';
import React from 'react';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import { useDispatch, useSelector } from 'react-redux';
import { updateRestaurantStatus } from '../../component/State/Restaurant/Action';

const RestaurantDetail = () => {
    const {restaurant}= useSelector((store)=>store);
    const dispatch= useDispatch();
    const handleRestaurantStatus = () => {
        dispatch(updateRestaurantStatus({restaurantId:restaurant.usersRestaurant.id, jwt:localStorage.getItem("jwt")}))
     };

    return (
        <div className='lg:px-20 px-5'>
            <div className='py-5 flex justify-center items-center gap-5'>
                <h1 className='text-2xl lg:text-7xl text-center font-bold p-5'>
                {restaurant.usersRestaurant?.name}
                </h1>
                <div>
                    <Button
                        color={!restaurant.usersRestaurant?.open ? "primary" : "error"}
                        onClick={handleRestaurantStatus}
                        className='py-[1rem] px-[2rem]'
                        size='large'
                        variant='contained'
                    >
                        {restaurant.usersRestaurant?.open ? "Closed" : "Open"}
                    </Button>
                </div>
            </div>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Card>
                        <CardHeader title={<span className='text-gray-400'>Restaurant</span>} />
                        <CardContent>
                            <div className='space-y-4 text-gray-200'>
                                <div className='flex'>
                                    <p className='w-48'>Owner</p>
                                    <p>{restaurant.usersRestaurant?.owner.fullName}</p>
                                </div>
                                <div className='flex'>
                                    <p className='w-48'>Restaurant Name</p>
                                    <p>{restaurant.usersRestaurant?.name}</p>
                                </div>
                                <div className='flex'>
                                    <p className='w-48'>Cuisine Type</p>
                                    <p>{restaurant.usersRestaurant?.cuisineType}</p>
                                </div>
                                <div className='flex'>
                                    <p className='w-48'>Opening Hours</p>
                                    <p>{restaurant.usersRestaurant?.openingHours}</p>
                                </div>
                                <div className='flex'>
                                    <p className='w-48'>Status</p>
                                    <p className="text-gray-400">
                                        {restaurant.usersRestaurant?.open ? (
                                            <span className="px-5 py-2 rounded-full bg-green-400 text-gray-950">
                                                Open
                                            </span>
                                        ) : (
                                            <span className="px-5 py-2 rounded-full bg-red-400 text-gray-50">
                                                Closed
                                            </span>
                                        )}
                                    </p>

                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} md={2} lg={5}>
                    <Card>
                        <CardHeader title={<span className='text-gray-400'>Address</span>} />
                        <CardContent>
                            <div className='space-y-4 text-gray-200'>
                                <div className='flex'>
                                    <p className='w-48'>Country</p>
                                    <p>{restaurant.usersRestaurant?.address?.country}</p>
                                </div>
                                <div className='flex'>
                                    <p className='w-48'>City</p>
                                    <p>Bangalore</p>
                                </div>
                                <div className='flex'>
                                    <p className='w-48'>Postal Code</p>
                                    <p>70000</p>
                                </div>
                                <div className='flex'>
                                    <p className='w-48'>Street Address</p>
                                    <p>Ambavadi Choke</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} md={3} lg={7}>
                    <Card>
                        <CardHeader title={<span className='text-gray-400'>Contact</span>} />
                        <CardContent>
                            <div className='space-y-4 text-gray-200'>
                                <div className='flex'>
                                    <p className='w-48'>Email</p>
                                    <p>{restaurant.usersRestaurant?.contactInformation?.email}</p>
                                </div>
                                <div className='flex'>
                                    <p className='w-48'>Mobile</p>
                                    <p>{restaurant.usersRestaurant?.contactInformation?.mobile}</p>
                                </div>
                                <div className='flex'>
                                    <p className='w-48 mt-5 pb-5'>Social</p>
                                    <p className='flex items-center gap-2'>
                                        <a href={restaurant.usersRestaurant?.contactInformation?.instagram}><InstagramIcon style={{ fontSize: '48px' }} /></a>
                                    
                                        <a href={restaurant.usersRestaurant?.contactInformation?.facebook}> <FacebookIcon style={{ fontSize: '48px' }} /></a>
                                       
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </div>
    );
};

export default RestaurantDetail;
