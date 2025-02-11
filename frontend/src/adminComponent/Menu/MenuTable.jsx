import { Avatar, Box, Button, Card, CardActions, CardHeader, Chip, IconButton } from '@mui/material'
import React, { useEffect } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import CreateIcon from '@mui/icons-material/Create';
import { Delete } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { deleteMenuItem, getMenuItemsByRestaurantId } from '../../component/State/Menu/Action';

const orders = [
  1, 1, 1, 1, 1, 1, 1, 1, 1
];
const MenuTable = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt")
  const { restaurant, ingredients, menu } = useSelector(store => store)
  useEffect(() => {
    dispatch(getMenuItemsByRestaurantId({ restaurantId: restaurant.usersRestaurant.id, jwt }))
  }, [])
  const handleDeleteFood=(foodID)=>{
    dispatch(deleteMenuItem({foodID:foodID, jwt:jwt}))
  }
  return (
    <Box>
      <Card className='mt-1'>
        <CardHeader
          action={
            <IconButton onClick={() => navigate("/admin/restaurant/add-menu")} aria-label="settings">
              <CreateIcon />
            </IconButton>
          }
          title={"Menu"}
          sx={{ pt: 2, alignItems: "center" }}
        />

        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="left">Image</TableCell>
                <TableCell align="right">Title</TableCell>
                <TableCell align="center">Ingredients</TableCell>
                <TableCell align="right">Price</TableCell>
                <TableCell align="center">Avaibility</TableCell>
                <TableCell align="right">Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {menu.menuItems.map((item) => (
                <TableRow
                  key={item.name}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell align="left"><Avatar src={item.images[0]}></Avatar></TableCell>
                  <TableCell align="right">{item.name}</TableCell>
                  <TableCell align="center">
                    {item.ingredients?.map((ingredient) => (
                      <Chip key={ingredient.id} label={ingredient.name} />
                    ))}
                  </TableCell>

                  <TableCell align="right">{item.price}</TableCell>
                  <TableCell align="center"><Button>{item.available?"instock":"out of stock"}</Button></TableCell>
                  <TableCell align="right"><IconButton color='primary' onClick={()=>handleDeleteFood(item.id)}><Delete /></IconButton></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </Box>
  )
}

export default MenuTable