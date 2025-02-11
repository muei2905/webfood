import React, { useEffect } from 'react';
import { Box, Card, CardHeader, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Modal } from '@mui/material';
import { Delete } from '@mui/icons-material';
import CreateIcon from '@mui/icons-material/Create';

import CreateFoodCategoryForm from './CreateFoodCategoryForm';
import { useDispatch, useSelector } from 'react-redux';
import { getRestaurantsCategory } from '../../component/State/Restaurant/Action';

export const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const FoodCategoryTable = () => {
  const {restaurant}= useSelector((store)=>store);
  const dispatch= useDispatch();
  const jwt= localStorage.getItem("jwt");
  const [open, setOpen] = React.useState(false);
      const handleOpen = () => setOpen(true);
      const handleClose = () => setOpen(false);
    
       useEffect(()=>{
            dispatch(getRestaurantsCategory({jwt:jwt, restaurantId:restaurant.usersRestaurant?.id}))
          
          },[])
  return (
    <Box>
      <Card className='mt-1'>
        <CardHeader
          action={
            <IconButton onClick={handleOpen} aria-label="settings">
              <CreateIcon />
            </IconButton>
          }
          title="Food Categories"
          sx={{ pt: 2, alignItems: "center" }}
        />

        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="food category table">
            <TableHead>
              <TableRow>
                <TableCell align="left">ID</TableCell>
                <TableCell align="left">Name</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {restaurant.categories.map((category) => (
                <TableRow
                  key={category.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell align="left">{category.id}</TableCell>
                  <TableCell align="left">{category.name}</TableCell>
                  <TableCell align="center">
                    <IconButton aria-label="delete">
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <CreateFoodCategoryForm/>
        </Box>
      </Modal>
    </Box>
  );
};

export default FoodCategoryTable;
