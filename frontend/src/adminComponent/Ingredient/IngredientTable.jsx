import React, { useEffect } from 'react';
import { Box, Card, CardHeader, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Modal, Button } from '@mui/material';
import CreateIcon from '@mui/icons-material/Create';
import { style } from '../FoodCategory/FoodCategoryTable';
import CreateIngredientForm from './CreateIngredientForm';
import { useDispatch, useSelector } from 'react-redux';
import { getIngredientsOfRestaurant, updateStockOfIngredient } from '../../component/State/Ingredients/Action';
const ingredientt = [
  { id: 1, name: "Tomato", category: "Vegetables", availability: "Available" },
  { id: 2, name: "Cheese", category: "Dairy", availability: "Available" },
  { id: 3, name: "Chicken", category: "Meat", availability: "Out of Stock" },
];

const IngredientTable = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt")
  const handleUpdateStoke=(id)=>{
    dispatch(updateStockOfIngredient({ingredientId:id,jwt}))
  }
  const { restaurant, ingredients } = useSelector(store => store)
  useEffect(() => {
    dispatch(getIngredientsOfRestaurant({ id: restaurant.usersRestaurant.id, jwt: localStorage.getItem("jwt") }))
  }, [])
  return (
    <Box>
      <Card className='mt-1'>
        <CardHeader
          action={
            <IconButton onClick={handleOpen} aria-label="settings">
              <CreateIcon />
            </IconButton>
          }
          title="Ingredients"
          sx={{ pt: 2, alignItems: "center" }}
        />

        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="ingredient table">
            <TableHead>
              <TableRow>
                <TableCell align="left">ID</TableCell>
                <TableCell align="left">Name</TableCell>
                <TableCell align="left">Category</TableCell>
                <TableCell align="left">Availability</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {ingredients.ingredients.map((ingredient) => (
                <TableRow
                  key={ingredient.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell align="left">{ingredient.id}</TableCell>
                  <TableCell align="left">{ingredient.name}</TableCell>
                  <TableCell align="left">
                    {ingredient.category.name || JSON.stringify(ingredient.category)}
                  </TableCell>
                  <TableCell align="left"><Button onClick={()=>handleUpdateStoke(ingredient.id)}>{ingredient.inStoke?"Instock":"Out Of Stock"}</Button></TableCell>
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
          <CreateIngredientForm />
        </Box>
      </Modal>
    </Box>
  );
};

export default IngredientTable;