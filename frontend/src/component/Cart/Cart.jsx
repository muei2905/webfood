import { Button, Divider, Grid, Modal, TextField, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import React from 'react';
import CartItem from './CartItem';
import AddressCard from './AddressCard';
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';
import { Card } from '@mui/material';
import Box from '@mui/material/Box';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { createOrder, createOrderWithPayment } from '../State/Order/Action';

export const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  outline: 'none',
  boxShadow: 24,
  p: 4,
};

const initialValues = {
  streetAddress: '',
  ward: '',
  district: '',
  city: '',
  postalCode: '',
  paymentMethod: 'cash', // Phương thức thanh toán mặc định là tiền mặt
};

const validationSchema = Yup.object().shape({
  streetAddress: Yup.string()
    .required('Street address is required')
    .min(5, 'Street address must be at least 5 characters long'),
  ward: Yup.string()
    .required('Ward is required')
    .min(1, 'Ward must be at least 1 characters long'),
  district: Yup.string()
    .required('District is required')
    .min(1, 'District must be at least 1 characters long'),
  city: Yup.string()
    .required('City is required')
    .min(2, 'City must be at least 2 characters long'),
  postalCode: Yup.string()
    .required('Postal code is required')
    .matches(/^\d{5,6}$/, 'Postal code must be 5 or 6 digits'),
  paymentMethod: Yup.string().required('Please select a payment method'),
});

const Cart = () => {
  const { cart, auth } = useSelector(store => store);
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch();

  const handleClose = () => setOpen(false);
  const createOrderUsingSelectedAddress = () => {};
  const handleOpenAddressModal = () => setOpen(true);

  const handleSubmit = (value) => {
    const data = {
      jwt: localStorage.getItem("jwt"),
      order: {
        restaurantId: cart.cartItems[0].food?.restaurant.id,
        deliveryAddress: {
          fullName: auth.user?.fullName,
          streetAddress: value.streetAddress,
          city: value.city,
          ward: value.ward,
          district: value.district,
          postalCode: value.postalCode,
        },
      },
    };

    if (value.paymentMethod === 'cash') {
      dispatch(createOrder(data)); 
    } else {
      dispatch(createOrderWithPayment(data));
    }
  };

  return (
    <div>
      <main className="lg:flex justify-between">
        <section className="lg:w-[30%] space-y-6 lg:min-h-screen pt-10">
          {cart.cartItems.map((item) => (
            <CartItem item={item} />
          ))}
          <Divider />
          <div className="billDetails px-5 text-sm">
            <p className="font-extralight py-5">Bill Details</p>
            <div className="space-y-3">
              <div className="flex justify-between text-gray-400">
                <p>Item Total</p>
                <p>${cart.cart.total}</p>
              </div>
              <div className="flex justify-between text-gray-400">
                <p>Delivery Fee</p>
                <p>$15</p>
              </div>
              <div className="flex justify-between text-gray-400">
                <p>GST and Restaurant Charges</p>
                <p>$28</p>
              </div>
              <Divider />
            </div>
            <div className="flex justify-between text-gray-400">
              <p>Total pay</p>
              <p>${cart.cart.total + 28 + 15}</p>
            </div>
          </div>
        </section>
        <Divider orientation="vertical" flexItem />
        <section className="lg:w-[70%] flex justify-center px-5 pb-10 lg:pb-0">
          <div>
            <h1 className="text-center font-semibold text-2xl py-10">
              Choose Delivery Address
            </h1>
            <div className="flex gap-5 flex-wrap justify-center">
              {[1, 1, 1, 1, 1].map((item) => (
                <AddressCard handleSelectAddress={createOrderUsingSelectedAddress} item={item} showButton={true} />
              ))}
              <Card className="flex gap-5 w-64 p-5">
                <AddLocationAltIcon />
                <div className="space-y-3 text-gray-500">
                  <h1 className="font-semibold text-lg text-white">Add New Address</h1>
                  <Button variant="outlined" fullWidth onClick={handleOpenAddressModal}>
                    Select
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <Box sx={style}>
          <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={validationSchema}>
            {({ values, setFieldValue }) => (
              <Form>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Field
                      as={TextField}
                      name="streetAddress"
                      label="Street Address"
                      fullWidth
                      variant="outlined"
                      helperText={<ErrorMessage name="streetAddress" />}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <Field
                      as={TextField}
                      name="ward"
                      label="Ward"
                      fullWidth
                      variant="outlined"
                      helperText={<ErrorMessage name="ward" />}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <Field
                      as={TextField}
                      name="district"
                      label="District"
                      fullWidth
                      variant="outlined"
                      helperText={<ErrorMessage name="district" />}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Field
                      as={TextField}
                      name="city"
                      label="City"
                      fullWidth
                      variant="outlined"
                      helperText={<ErrorMessage name="city" />}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Field
                      as={TextField}
                      name="postalCode"
                      label="Postal Code"
                      fullWidth
                      variant="outlined"
                      helperText={<ErrorMessage name="postalCode" />}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl fullWidth>
                      <InputLabel id="payment-method-label">Payment Method</InputLabel>
                      <Select
                        labelId="payment-method-label"
                        value={values.paymentMethod}
                        onChange={(e) => setFieldValue("paymentMethod", e.target.value)}
                      >
                        <MenuItem value="cash">Cash</MenuItem>
                        <MenuItem value="card">Card</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <Button type="submit" variant="contained" color="primary" fullWidth>
                      Submit
                    </Button>
                  </Grid>
                </Grid>
              </Form>
            )}
          </Formik>
        </Box>
      </Modal>
    </div>
  );
};

export default Cart;
