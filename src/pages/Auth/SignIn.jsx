import React from "react";
import { Box, Container, Typography, TextField, Button } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import AuthService from "../../services/AuthService";
const SignIn = () => {
  const [postData, error, loading] = AuthService.SignIn();
  const handleFormSubmit = async (values) => {
    postData("/auth/login", values);
  };
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
    >
      <Container maxWidth="sm">
        <Typography variant="h4" align="center" gutterBottom>
          Welcome to Grocery Freshser
        </Typography>
        <Typography variant="h4" align="center" gutterBottom>
          Sign In
        </Typography>
        <Formik
          onSubmit={handleFormSubmit}
          initialValues={initialValues}
          validationSchema={checkoutSchema}
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
              <TextField
                fullWidth
                id="email"
                name="email"
                label="Email"
                variant="outlined"
                margin="normal"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                helperText={touched.email && errors.email}
                error={Boolean(touched.email && errors.email)}
                autoComplete="email"
              />
              <TextField
                fullWidth
                id="password"
                name="password"
                type="password"
                label="Password"
                variant="outlined"
                margin="normal"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                helperText={touched.password && errors.password}
                error={Boolean(touched.password && errors.password)}
                autoComplete="current-password"
              />
              <Button
                fullWidth
                variant="contained"
                color="primary"
                style={{ marginTop: "1rem" }}
                type="submit"
              >
                Sign In
              </Button>
            </form>
          )}
        </Formik>
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error}</p>}
      </Container>
    </Box>
  );
};

const initialValues = {
  email: "",
  password: "",
};

const checkoutSchema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Required"),
  password: yup.string().required("Required"),
});

export default SignIn;
