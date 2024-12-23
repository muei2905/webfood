import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Button, Grid, TextField, Typography, Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginUser } from '../State/Authentication/Action';

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email format')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});
const initialValues = {
  email: '',
  password: '',
};

const Login = () => {
    const dispatch= useDispatch()
    const onSubmit = (values) => {
        dispatch(loginUser({userData:values, navigate}))
      };
  const navigate = useNavigate();
  return (
    <div>
      <Typography variant="h4" component="h1" gutterBottom align="center">
        Login
      </Typography>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Field
                  as={TextField}
                  name="email"
                  label="Email"
                  variant="outlined"
                  fullWidth
                  helperText={<ErrorMessage name="email" />}
                />
              </Grid>
              <Grid item xs={12}>
                <Field
                  as={TextField}
                  name="password"
                  label="Password"
                  type="password"
                  variant="outlined"
                  fullWidth
                  helperText={<ErrorMessage name="password" />}
                />
              </Grid>
                
              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Logging in...' : 'Login'}
                </Button>
              </Grid>
              <Grid item xs={12} align="center">
                <Typography variant="body2">
                  Don't have an account ? {' '}
                  <Link
                    component="button"
                    variant="body2"
                    onClick={() => navigate('/account/register')}
                  >
                    Sign up
                  </Link>
                </Typography>
              </Grid>
              <Grid item xs={12} align="center">
                <Link
                  component="button"
                  variant="body2"
                  onClick={() => navigate('/forgot-password')}
                >
                  Forgot Password?
                </Link>
              </Grid>           
            </Grid>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Login;
