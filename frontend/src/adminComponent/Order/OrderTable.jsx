import { Avatar, AvatarGroup, Box, Button, Card, CardHeader, Chip, Menu, MenuItem } from '@mui/material'
import React, { useEffect } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useDispatch, useSelector } from 'react-redux';
import { getRestaurantsOrder, updateOrderStatus } from '../../component/State/RestaurantOrder/Action';


const orderStatus = [
  { value: "PENDING", label: "Pending" },
  { value: "COMPLETED", label: "Completed" },
  { value: "OUT_FOR_DELIVERY", label: "Out For Delivery" },
  { value: "DELIVERED", label: "Delivered" },
];


const OrderTable = () => {
  const [activeOrderId, setActiveOrderId] = React.useState(null); // Lưu ID của hàng hiện tại
  const [anchorEl, setAnchorEl] = React.useState(null);

  const open = Boolean(anchorEl);

  const handleClick = (event, orderId) => {
    setAnchorEl(event.currentTarget); // Gắn menu vào nút được nhấn
    setActiveOrderId(orderId); // Lưu ID của hàng hiện tại
  };

  const handleClose = () => {
    setAnchorEl(null);
    setActiveOrderId(null); // Đặt lại ID khi đóng menu
  };

  const handleUpdateOrder = (orderId, orderStatus) => {
    console.log("Updating order:", orderId, "to status:", orderStatus); // Debug
    dispatch(updateOrderStatus({ orderId, orderStatus, jwt }));
    handleClose(); // Đóng menu sau khi cập nhật
  };

  const dispatch = useDispatch();
  const jwt = localStorage.getItem('jwt');
  const { restaurant, restaurantOrder } = useSelector((store) => store);

  useEffect(() => {
    dispatch(getRestaurantsOrder({ restaurantId: restaurant.usersRestaurant?.id, jwt }));
  }, []);

  return (
    <Box>
      <Card className='mt-1'>
        <CardHeader title={"All Orders"} sx={{ pt: 2, alignItems: "center" }} />
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell align="right">Image</TableCell>
                <TableCell align="right">Customer</TableCell>
                <TableCell align="right">Price</TableCell>
                <TableCell align="right">Name</TableCell>
                <TableCell align="center">Ingredients</TableCell>
                <TableCell align="right">Status</TableCell>
                <TableCell align="right">Update</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {restaurantOrder.restaurantOrders.map((item) => (
                <TableRow key={item.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell component="th" scope="row">
                    {item.id}
                  </TableCell>
                  <TableCell align="right">
                    <AvatarGroup>
                      {item.items.map((orderItem) => (
                        <Avatar key={orderItem.food?.id} src={orderItem.food?.images[0]} />
                      ))}
                    </AvatarGroup>
                  </TableCell>
                  <TableCell align="right">{item.customer?.email}</TableCell>
                  <TableCell align="right">{item.totalPrice}</TableCell>
                  <TableCell align="right">
                    {item.items.map((orderItem) => (
                      <p key={orderItem.food?.id}>{orderItem.food?.name}</p>
                    ))}
                  </TableCell>
                  <TableCell align="center">
                    {item.items.map((orderItem) => (
                      <div key={orderItem.food?.id}>
                        {orderItem.ingredients.map((ingredient, index) => (
                          <Chip key={index} label={ingredient} />
                        ))}
                      </div>
                    ))}
                  </TableCell>
                  <TableCell align="right">{item.orderStatus}</TableCell>
                  <TableCell align="right">
                    <Button
                      id={`basic-button-${item.id}`}
                      aria-controls={open && activeOrderId === item.id ? 'basic-menu' : undefined}
                      aria-haspopup="true"
                      aria-expanded={open && activeOrderId === item.id ? 'true' : undefined}
                      onClick={(event) => handleClick(event, item.id)} // Gắn ID vào nút
                    >
                      Update
                    </Button>
                    <Menu
                      id={`basic-menu-${item.id}`}
                      anchorEl={open && activeOrderId === item.id ? anchorEl : null} // Hiển thị menu cho đúng hàng
                      open={open && activeOrderId === item.id}
                      onClose={handleClose}
                      MenuListProps={{
                        'aria-labelledby': `basic-button-${item.id}`,
                      }}
                    >
                      {orderStatus.map((status) => (
                        <MenuItem
                          key={status.value}
                          onClick={() => handleUpdateOrder(item.id, status.value)} // Cập nhật trạng thái
                        >
                          {status.label}
                        </MenuItem>
                      ))}
                    </Menu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </Box>
  );
};

export default OrderTable;
