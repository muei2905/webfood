import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Button, Grid, TextField, Typography, MenuItem, Select, FormControl, InputLabel, Link } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../State/Authentication/Action";
import { useDispatch } from "react-redux";

const validationSchema = Yup.object().shape({
  fullName: Yup.string()
    .min(3, "Full Name must be at least 3 characters")
    .required("Full Name is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
  role: Yup.string().required("Please select a role"),
});

const initialValues = {
  fullName: "",
  email: "",
  password: "",
  confirmPassword: "",
  role: "",
};

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onSubmit = (values) => {
    const { confirmPassword, ...userData } = values;
    dispatch(registerUser({ userData, navigate }));
  };
  

  return (
    <div>
      <Typography variant="h4" component="h1" gutterBottom align="center">
        Register
      </Typography>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ isSubmitting, setFieldValue, values }) => (
          <Form>
            <Grid container spacing={2}>
              {/* Full Name Field */}
              <Grid item xs={12}>
                <Field
                  as={TextField}
                  name="fullName"
                  label="Full Name"
                  variant="outlined"
                  fullWidth
                  helperText={<ErrorMessage name="fullName" />}
                />
              </Grid>

              {/* Email Field */}
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

              {/* Password Field */}
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

              {/* Confirm Password Field */}
              <Grid item xs={12}>
                <Field
                  as={TextField}
                  name="confirmPassword"
                  label="Confirm Password"
                  type="password"
                  variant="outlined"
                  fullWidth
                  helperText={<ErrorMessage name="confirmPassword" />}
                />
              </Grid>

              {/* Role Selection */}
              <Grid item xs={12}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel id="role-label">Select Role</InputLabel>
                  <Select
                    labelId="role-label"
                    id="role"
                    value={values.role}
                    onChange={(e) => setFieldValue("role", e.target.value)}
                    label="Select Role"
                  >
                    <MenuItem value="ROLE_CUSTOMER">Customer</MenuItem>
                    <MenuItem value="ROLE_RESTAURANT_OWNER">Restaurant Owner</MenuItem>
                  </Select>
                  <Typography color="error" variant="body2">
                    <ErrorMessage name="role" />
                  </Typography>
                </FormControl>
              </Grid>

              {/* Submit Button */}
              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Registering..." : "Register"}
                </Button>
              </Grid>

              {/* Already have an account */}
              <Grid item xs={12} align="center">
                <Typography variant="body2">
                  Already have an account?{" "}
                  <Link
                    component="button"
                    variant="body2"
                    onClick={() => navigate("/account/login")}
                  >
                    Login
                  </Link>
                </Typography>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Register;
