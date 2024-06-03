import React, { useEffect, useState } from "react";
import { Formik } from "formik";
import * as yup from "yup";
import { Box, TextField, Button, Paper } from "@mui/material";
import Header from "../../components/Header";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useCategories } from "../../hook/category/useCategory";
const CategoryForm = () => {
  const { id } = useParams();
  const isEditMode = !!id;
  const navigate = useNavigate();
  const [initialValues, setInitialValues] = useState({
    name: "",
    description: "",
  });
  const checkoutSchema = yup.object().shape({
    name: yup.string().required("Name is required"),
  });
  const { createCategory, updateCategory, getCategoryById } = useCategories();
  const handleFormSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      if (isEditMode) {
        await updateCategory(id, values);
      } else {
        await createCategory(values);
      }
      resetForm({ values: { name: "", description: "" } });
      toast.success("Submit sucessfully");
      navigate("/categories");
    } catch (error) {
      console.error("Error:", error);
      toast.error(error.message);
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    if (isEditMode) {
      const fetchCategory = async () => {
        try {
          const data = await getCategoryById(id);
          setInitialValues(data);
          console.log(data);
        } catch (error) {
          console.error("Error:", error);
        }
      };
      fetchCategory();
    }
  }, [id]);
  return (
    <Box m="1.5rem 2.5rem">
      <Header
        title="Category"
        subtitle={isEditMode ? "Update Category" : "Create New Category"}
      />
      <Paper sx={{ padding: "2rem", borderRadius: "8px" }}>
        <Formik
          onSubmit={handleFormSubmit}
          initialValues={initialValues}
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
              <TextField
                fullWidth
                id="name"
                name="name"
                label="Name"
                variant="outlined"
                margin="normal"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                helperText={touched.name && errors.name}
                error={Boolean(touched.name && errors.name)}
                autoComplete="name"
              />
              <TextField
                fullWidth
                id="description"
                name="description"
                type="description"
                label="Description"
                variant="outlined"
                margin="normal"
                value={values.description}
                onChange={handleChange}
                onBlur={handleBlur}
                helperText={touched.description && errors.description}
                error={Boolean(touched.description && errors.description)}
                autoComplete="current-description"
              />
              <Button
                fullWidth
                variant="contained"
                color="secondary"
                style={{ marginTop: "1rem" }}
                type="submit"
              >
                {isEditMode ? "Update" : "Create"}
              </Button>
            </form>
          )}
        </Formik>
      </Paper>
    </Box>
  );
};

export default CategoryForm;
