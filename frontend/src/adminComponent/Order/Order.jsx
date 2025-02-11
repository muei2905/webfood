import { Card, FormControl, FormControlLabel, Radio, RadioGroup, Typography } from '@mui/material'
import React, { useState } from 'react'
import OrderTable from './OrderTable'
const OrderStatus= [
    {label:"Pending", value:"PENDING"},
    {label:"Completed", value:"COMPLETED"},
    {label:"All", value:"ALL"},
]
const Order = () => {
    const [filterValue, setFilterValue]= useState()
    const handleFilter= (e, value)=>{
        setFilterValue(value)    
    }
  return (
    <div className='px-2'>
      <Card className='p-5'>
        <Typography sx={{paddingBottom:"1rem"}} variant='h5'>
            Order Status
        </Typography>
        <FormControl>
            <RadioGroup onChange={handleFilter} row name='category' value={filterValue || "all"}>
                {OrderStatus.map((item)=><FormControlLabel
                key={item.value} value={item.value} control={<Radio/>}
                label={item.label}
                sx={{color:"gray"}}
                />)}
            </RadioGroup>
        </FormControl>
      </Card>
      <OrderTable/>
    </div>
  )
}

export default Order
