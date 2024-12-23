import React from 'react'
import HomeIcon from '@mui/icons-material/Home';

import { Button, Card } from '@mui/material';

const AddressCard = ({item, showButton, handleSelectAddress}) => {
    
  return (
    <Card className='flex gap-5 w-64 p-5'>
        <HomeIcon/>
        <div className='space-y-3 text-gray-500'>
            <div className='font-semibold text-lg text-white'>Home</div>
            <p>741 Ta Quang Buu, District 8, Ho Chi Minh City</p>
            {showButton && (<Button variant='outlined' fullWidth onClick={handleSelectAddress(item)}>Select</Button>)}
            
        </div>
    </Card>
  )
}

export default AddressCard
