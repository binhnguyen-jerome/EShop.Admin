import React, { useEffect, useState } from "react";
import { Formik } from "formik";
import * as yup from "yup";
import { toast } from "react-toastify";
import {
  TextField,
  Button,
  Grid,
  MenuItem,
  Box,
  Typography,
  Paper,
} from "@mui/material";
import Header from "../../components/Header";
import ProductService from "../../services/ProductService";
import { useCategories } from "../../hook/category/useCategory";
import FlexBetWeen from "../../components/FlexBetween";
import { storeImage, removeImage } from "../../services/firebaseService";
import { useParams } from "react-router-dom";
import { useProducts } from "../../hook/product/useProducts";

const checkoutSchema = yup.object({
  name: yup.string().required("Product name is required"),
  price: yup
    .number()
    .required("Price is required")
    .positive("Price must be positive"),
  categoryId: yup.string().required("CategoryId is required"),
});

const ProductForm = () => {
  const { id } = useParams();
  const isEditMode = !!id;
  const { categories, getCategories } = useCategories();
  useEffect(() => {
    getCategories();
  }, [getCategories]);
  const { getProductById, updateProduct, createProduct } = useProducts();
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [imageUploadError, setImageUploadError] = useState(false);
  const [formValues, setFormValues] = useState({
    name: "",
    description: "",
    summary: "",
    price: "",
    priceDiscount: "",
    categoryId: "",
    stock: "",
    productImages: [],
  });
  useEffect(() => {
    if (isEditMode) {
      const fetchProduct = async () => {
        try {
          const data = await getProductById(id);
          setFormValues(data);
        } catch (error) {
          console.error("Error:", error);
        }
      };
      fetchProduct();
    }
  }, [id]);
  const handleImageSubmit = async (e) => {
    e.preventDefault();
    if (
      files.length > 0 &&
      files.length + formValues.productImages.length < 7
    ) {
      setUploading(true);
      setImageUploadError(false);
      try {
        const promises = files.map((file) => storeImage(file));
        const urls = await Promise.all(promises);
        setFormValues((prevValues) => ({
          ...prevValues,
          productImages: [
            ...prevValues.productImages,
            ...urls.map((url) => ({ imageUrl: url })),
          ],
        }));
        setImageUploadError(false);
      } catch (err) {
        setImageUploadError("Image upload failed (2 mb max per image)");
      } finally {
        setUploading(false);
      }
    } else {
      setImageUploadError("You can only upload 6 product images per listing");
    }
  };

  const handleFormSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      if (isEditMode) {
        await updateProduct(id, values);
        toast.success("Product updated successfully");
      } else {
        await createProduct(values);
        toast.success("Create product successfully");
      }
      resetForm();
      setFormValues({
        name: "",
        description: "",
        summary: "",
        price: "",
        priceDiscount: "",
        categoryId: "",
        stock: "",
        productImages: [],
      });
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setSubmitting(false);
    }
  };
  const removeImageUpload = async (index) => {
    const image = formValues.productImages[index];
    try {
      await removeImage(image.imageUrl);
      setFormValues((prevValues) => ({
        ...prevValues,
        productImages: prevValues.productImages.filter(
          (img, imgIndex) => imgIndex !== index
        ),
      }));
    } catch (error) {
      toast.error("Failed to remove image");
    }
  };
  return (
    <Box m="1.5rem 2.5rem">
      <Header title="Product" subtitle="Create New Product" />
      <Paper elevation={3}>
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
              <Grid container spacing={2} padding={3}>
                <Grid item xs={8}>
                  <TextField
                    fullWidth
                    id="name"
                    name="name"
                    label="Product Name"
                    value={values.name}
                    onChange={(e) => {
                      handleChange(e);
                      setFormValues((prevValues) => ({
                        ...prevValues,
                        name: e.target.value,
                      }));
                    }}
                    onBlur={handleBlur}
                    error={touched.name && Boolean(errors.name)}
                    helperText={touched.name && errors.name}
                  />
                  <TextField
                    select
                    fullWidth
                    id="categoryId"
                    name="categoryId"
                    label="Category"
                    value={values.categoryId}
                    onChange={(e) => {
                      handleChange(e);
                      setFormValues((prevValues) => ({
                        ...prevValues,
                        categoryId: e.target.value,
                      }));
                    }}
                    onBlur={handleBlur}
                    error={touched.categoryId && Boolean(errors.categoryId)}
                    helperText={touched.categoryId && errors.categoryId}
                    sx={{ mt: 2 }}
                  >
                    {categories.map((option) => (
                      <MenuItem key={option.id} value={option.id}>
                        {option.name}
                      </MenuItem>
                    ))}
                  </TextField>
                  <TextField
                    fullWidth
                    id="summary"
                    name="summary"
                    label="Summary"
                    multiline
                    rows={4}
                    value={values.summary}
                    onChange={(e) => {
                      handleChange(e);
                      setFormValues((prevValues) => ({
                        ...prevValues,
                        summary: e.target.value,
                      }));
                    }}
                    onBlur={handleBlur}
                    error={touched.summary && Boolean(errors.summary)}
                    helperText={touched.summary && errors.summary}
                    sx={{ mt: 2 }}
                  />
                  <TextField
                    fullWidth
                    id="description"
                    name="description"
                    label="Description"
                    multiline
                    rows={4}
                    value={values.description}
                    onChange={(e) => {
                      handleChange(e);
                      setFormValues((prevValues) => ({
                        ...prevValues,
                        description: e.target.value,
                      }));
                    }}
                    onBlur={handleBlur}
                    error={touched.description && Boolean(errors.description)}
                    helperText={touched.description && errors.description}
                    sx={{ mt: 2 }}
                  />
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <TextField
                        fullWidth
                        id="price"
                        name="price"
                        label="Price"
                        type="number"
                        value={values.price}
                        onChange={(e) => {
                          handleChange(e);
                          setFormValues((prevValues) => ({
                            ...prevValues,
                            price: e.target.value,
                          }));
                        }}
                        onBlur={handleBlur}
                        error={touched.price && Boolean(errors.price)}
                        helperText={touched.price && errors.price}
                        sx={{ mt: 2 }}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        fullWidth
                        id="priceDiscount"
                        name="priceDiscount"
                        label="Product Discount"
                        type="number"
                        value={values.priceDiscount}
                        onChange={(e) => {
                          handleChange(e);
                          setFormValues((prevValues) => ({
                            ...prevValues,
                            priceDiscount: e.target.value,
                          }));
                        }}
                        onBlur={handleBlur}
                        error={
                          touched.priceDiscount && Boolean(errors.priceDiscount)
                        }
                        helperText={
                          touched.priceDiscount && errors.priceDiscount
                        }
                        sx={{ mt: 2 }}
                      />
                    </Grid>
                  </Grid>
                  <TextField
                    fullWidth
                    id="stock"
                    name="stock"
                    label="Stock"
                    type="number"
                    value={values.stock}
                    onChange={(e) => {
                      handleChange(e);
                      setFormValues((prevValues) => ({
                        ...prevValues,
                        stock: e.target.value,
                      }));
                    }}
                    onBlur={handleBlur}
                    error={touched.stock && Boolean(errors.stock)}
                    helperText={touched.stock && errors.stock}
                    sx={{ mt: 2 }}
                  />
                </Grid>
                {/* Handle Image */}
                <Grid item xs={4}>
                  <FlexBetWeen>
                    <input
                      accept="image/*"
                      id="contained-button-file"
                      type="file"
                      multiple
                      onChange={(event) => {
                        setFiles(Array.from(event.target.files));
                      }}
                    />
                    <Button
                      variant="contained"
                      color="secondary"
                      component="span"
                      onClick={handleImageSubmit}
                    >
                      {uploading ? "Uploading" : "Upload"}
                    </Button>
                  </FlexBetWeen>
                  <Box
                    border="1px solid #ccc"
                    borderRadius="8px"
                    padding="16px"
                    marginTop="16px"
                  >
                    {imageUploadError && (
                      <Typography color="red" marginBottom="16px">
                        {imageUploadError}
                      </Typography>
                    )}
                    {formValues.productImages.length > 0 ? (
                      formValues.productImages.map((image, index) => (
                        <FlexBetWeen key={index} mt={2}>
                          <img
                            src={image.imageUrl}
                            alt="product"
                            style={{
                              width: "100px",
                              height: "100px",
                              marginRight: "8px",
                            }}
                          />
                          <Button
                            variant="contained"
                            color="secondary"
                            onClick={() => removeImageUpload(index)}
                          >
                            Delete
                          </Button>
                        </FlexBetWeen>
                      ))
                    ) : (
                      <Typography>No image uploaded</Typography>
                    )}
                  </Box>
                </Grid>
                <Grid item xs={8}>
                  <Button
                    color="primary"
                    variant="contained"
                    fullWidth
                    type="submit"
                  >
                    {isEditMode ? "Update Product" : "Create Product"}
                  </Button>
                </Grid>
              </Grid>
            </form>
          )}
        </Formik>
      </Paper>
    </Box>
  );
};

export default ProductForm;
