import React, { useEffect, useState } from "react";
import { Formik } from "formik";
import * as yup from "yup";
import { Box, TextField, Button, Paper, MenuItem, Grid } from "@mui/material";
import Header from "../../components/Header";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useUsers } from "../../hook/user/useUsers";

const UserForm = () => {
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    streetAddress: "",
    city: "",
    state: "",
    postalCode: "",
    password: "",
    role: "",
  });

  const { creatUser } = useUsers();

  const handleFormSubmit = async (values, { setSubmitting }) => {
    try {
      await creatUser(values);
      toast.success("Submit successfully");
      navigate("/users");
    } catch (error) {
      console.error("Error:", error);
      toast.error(error.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="User" subtitle="Create New User" />
      <Paper sx={{ padding: "2rem", borderRadius: "8px", width: "80%" }}>
        <Formik
          onSubmit={handleFormSubmit}
          initialValues={formValues}
          validationSchema={checkoutSchema}
          enableReinitialize
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
          }) => (
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    id="firstName"
                    name="firstName"
                    label="First Name"
                    variant="outlined"
                    margin="normal"
                    value={values.firstName}
                    onChange={(e) => {
                      handleChange(e);
                      setFormValues((prevValues) => ({
                        ...prevValues,
                        firstName: e.target.value,
                      }));
                    }}
                    onBlur={handleBlur}
                    helperText={touched.firstName && errors.firstName}
                    error={Boolean(touched.firstName && errors.firstName)}
                    autoComplete="firstName"
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    id="lastName"
                    name="lastName"
                    label="Last Name"
                    variant="outlined"
                    margin="normal"
                    value={values.lastName}
                    onChange={(e) => {
                      handleChange(e);
                      setFormValues((prevValues) => ({
                        ...prevValues,
                        lastName: e.target.value,
                      }));
                    }}
                    onBlur={handleBlur}
                    helperText={touched.lastName && errors.lastName}
                    error={Boolean(touched.lastName && errors.lastName)}
                    autoComplete="lastName"
                  />
                </Grid>
              </Grid>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    id="email"
                    name="email"
                    type="email"
                    label="Email"
                    variant="outlined"
                    margin="normal"
                    value={values.email}
                    onChange={(e) => {
                      handleChange(e);
                      setFormValues((prevValues) => ({
                        ...prevValues,
                        email: e.target.value,
                      }));
                    }}
                    onBlur={handleBlur}
                    helperText={touched.email && errors.email}
                    error={Boolean(touched.email && errors.email)}
                    autoComplete="current-description"
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    id="phoneNumber"
                    name="phoneNumber"
                    label="Phone Number"
                    variant="outlined"
                    margin="normal"
                    value={values.phoneNumber}
                    onChange={(e) => {
                      handleChange(e);
                      setFormValues((prevValues) => ({
                        ...prevValues,
                        phoneNumber: e.target.value,
                      }));
                    }}
                    onBlur={handleBlur}
                    helperText={touched.phoneNumber && errors.phoneNumber}
                    error={Boolean(touched.phoneNumber && errors.phoneNumber)}
                    autoComplete="phoneNumber"
                  />
                </Grid>
              </Grid>
              <Grid container spacing={2}>
                <Grid item xs={3}>
                  <TextField
                    fullWidth
                    id="streetAddress"
                    name="streetAddress"
                    label="Street Address"
                    variant="outlined"
                    margin="normal"
                    value={values.streetAddress}
                    onChange={(e) => {
                      handleChange(e);
                      setFormValues((prevValues) => ({
                        ...prevValues,
                        streetAddress: e.target.value,
                      }));
                    }}
                    onBlur={handleBlur}
                    helperText={touched.streetAddress && errors.streetAddress}
                    error={Boolean(
                      touched.streetAddress && errors.streetAddress
                    )}
                    autoComplete="streetAddress"
                  />
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    fullWidth
                    id="city"
                    name="city"
                    label="City"
                    variant="outlined"
                    margin="normal"
                    value={values.city}
                    onChange={(e) => {
                      handleChange(e);
                      setFormValues((prevValues) => ({
                        ...prevValues,
                        city: e.target.value,
                      }));
                    }}
                    onBlur={handleBlur}
                    helperText={touched.city && errors.city}
                    error={Boolean(touched.city && errors.city)}
                    autoComplete="city"
                  />
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    fullWidth
                    id="state"
                    name="state"
                    label="State"
                    variant="outlined"
                    margin="normal"
                    value={values.state}
                    onChange={(e) => {
                      handleChange(e);
                      setFormValues((prevValues) => ({
                        ...prevValues,
                        state: e.target.value,
                      }));
                    }}
                    onBlur={handleBlur}
                    helperText={touched.state && errors.state}
                    error={Boolean(touched.state && errors.state)}
                    autoComplete="state"
                  />
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    fullWidth
                    id="postalCode"
                    name="postalCode"
                    label="Postal Code"
                    variant="outlined"
                    margin="normal"
                    value={values.postalCode}
                    onChange={(e) => {
                      handleChange(e);
                      setFormValues((prevValues) => ({
                        ...prevValues,
                        postalCode: e.target.value,
                      }));
                    }}
                    onBlur={handleBlur}
                    helperText={touched.postalCode && errors.postalCode}
                    error={Boolean(touched.postalCode && errors.postalCode)}
                    autoComplete="postalCode"
                  />
                </Grid>
              </Grid>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <TextField
                    select
                    fullWidth
                    id="role"
                    name="role"
                    label="Role"
                    variant="outlined"
                    margin="normal"
                    value={values.role}
                    onChange={(e) => {
                      handleChange(e);
                      setFormValues((prevValues) => ({
                        ...prevValues,
                        role: e.target.value,
                      }));
                    }}
                    onBlur={handleBlur}
                    helperText={touched.role && errors.role}
                    error={Boolean(touched.role && errors.role)}
                    autoComplete="role"
                  >
                    <MenuItem key="Customer" value="Customer">
                      Customer
                    </MenuItem>
                    <MenuItem key="Admin" value="Admin">
                      Admin
                    </MenuItem>
                  </TextField>
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    id="password"
                    name="password"
                    type="password"
                    label="Password"
                    variant="outlined"
                    margin="normal"
                    value={values.password}
                    onChange={(e) => {
                      handleChange(e);
                      setFormValues((prevValues) => ({
                        ...prevValues,
                        password: e.target.value,
                      }));
                    }}
                    onBlur={handleBlur}
                    helperText={touched.password && errors.password}
                    error={Boolean(touched.password && errors.password)}
                    autoComplete="current-password"
                  />
                </Grid>
              </Grid>
              <Button
                fullWidth
                variant="contained"
                color="secondary"
                style={{ marginTop: "1rem" }}
                type="submit"
              >
                Create
              </Button>
            </form>
          )}
        </Formik>
      </Paper>
    </Box>
  );
};

const checkoutSchema = yup.object().shape({
  firstName: yup.string().required("First Name is required"),
  lastName: yup.string().required("Last Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  phoneNumber: yup.string().required("Phone Number is required"),
  streetAddress: yup.string().required("Street Address is required"),
  city: yup.string().required("City is required"),
  state: yup.string().required("State is required"),
  postalCode: yup.string().required("Postal Code is required"),
  password: yup.string().required("Password is required"),
  role: yup.string().required("Role is required"),
});

export default UserForm;
