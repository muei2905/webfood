import { Card, CardActions, CardContent, CardMedia, IconButton, Typography } from '@mui/material'
import React from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
const EventCard = () => {
  return (
    <div>
      <Card sx={{width:345}}>
        <CardMedia  sx={{height:345}} image='https://www.envictus-intl.com/wp-content/uploads/2018/12/tdgchristmaspromo18.jpg'/>
        <CardContent>
            <Typography variant='h5'>
                Christmas Promotion
            </Typography>
            <Typography variant='body2'>
                50% off on your first order
            </Typography>
            <div className='py-2 space-y-2'>
                <p>{"Ho Chi Minh City"}</p>
                <p className='text-sm text-red-400'>Available from 2024/12/20 to 2024/12/31</p>
                
            </div>
        </CardContent>
        {false && <CardActions>
            <IconButton>
                <DeleteIcon/>
            </IconButton>
        </CardActions>}
      </Card>
    </div>
  )
}

export default EventCard
