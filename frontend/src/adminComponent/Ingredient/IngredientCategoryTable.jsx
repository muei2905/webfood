import React, { useEffect } from 'react';
import { Box, Card, CardHeader, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Modal } from '@mui/material';
import CreateIcon from '@mui/icons-material/Create';
import { style } from '../FoodCategory/FoodCategoryTable';
import CreateIngredientCategoryForm from './CreateIngredientCategoryForm';
import { useDispatch, useSelector } from 'react-redux';
import { getIngredientCategories, getIngredientsOfRestaurant } from '../../component/State/Ingredients/Action';
const categories = [
  { id: 1, name: "Vegetables" },
  { id: 2, name: "Dairy" },
  { id: 3, name: "Meat" },
];

const IngredientCategoryTable = () => {
   const [open, setOpen] = React.useState(false);
        const handleOpen = () => setOpen(true);
        const handleClose = () => setOpen(false);
        const dispatch= useDispatch();
        const jwt=localStorage.getItem("jwt")
        const {restaurant, ingredients}= useSelector(store=>store)
      useEffect(()=>{
        dispatch(getIngredientCategories({id:restaurant.usersRestaurant.id, jwt:jwt}))
      },[])
  return (
    <Box>
      <Card className='mt-1'>
        <CardHeader
        action={
            <IconButton onClick={handleOpen} aria-label="settings">
              <CreateIcon/>
            </IconButton>
          }
          title="Ingredient Categories"
          sx={{ pt: 2, alignItems: "center" }}
        />

        <TableContainer component={Paper}>
          <Table  aria-label="ingredient category table">
            <TableHead>
              <TableRow>
                <TableCell align="left">ID</TableCell>
                <TableCell align="left">Name</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {ingredients.categories.map((category) => (
                <TableRow
                  key={category.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell align="left">{category.id}</TableCell>
                  <TableCell align="left">{category.name}</TableCell>
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
            <CreateIngredientCategoryForm/>
        </Box>
      </Modal>
    </Box>
  );
};

export default IngredientCategoryTable;

