import React, { useEffect, useState } from "react";
import { Box, Typography, Grid, Paper, Button } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import moment from "moment";
import Header from "../../components/Header";
import { useProducts } from "../../hook/product/useProducts";
const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const navigate = useNavigate();
  const { getProductById } = useProducts();
  const fetchProduct = async () => {
    try {
      const data = await getProductById(id);
      console.log(data);
      setProduct(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  useEffect(() => {
    fetchProduct();
  }, [id]);
  return (
    <Box m="1.5rem 2.5rem">
      <Header
        title="Product"
        subtitle="Product Detail"
        route="/products/create"
      />
      <Paper sx={{ padding: "2rem", borderRadius: "8px" }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Box>
              {product.productImages && product.productImages.length > 0 ? (
                <Grid container spacing={2}>
                  {product.productImages.map((img, index) => (
                    <Grid item key={index} xs={6}>
                      <img
                        src={img.imageUrl}
                        alt={`Product ${index}`}
                        style={{ width: "90%", borderRadius: "8px" }}
                      />
                    </Grid>
                  ))}
                </Grid>
              ) : (
                <Typography>No image available</Typography>
              )}
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h5" gutterBottom>
              Name: {product.name}
            </Typography>
            <Typography variant="body1" gutterBottom>
              Description: {product.description}
            </Typography>
            <Typography variant="body2" color="textSecondary" gutterBottom>
              Summary: {product.summary}
            </Typography>
            <Typography variant="h6" gutterBottom>
              Price: ${product.price}
            </Typography>
            {product.priceDiscount && (
              <Typography variant="body1" gutterBottom>
                Discount Price: ${product.priceDiscount}
              </Typography>
            )}
            <Typography variant="body2" color="textSecondary" gutterBottom>
              Stock: {product.stock}
            </Typography>
            <Typography variant="body2" color="textSecondary" gutterBottom>
              Category: {product.categoryId}
            </Typography>
            <Typography variant="body2" color="textSecondary" gutterBottom>
              Created At:
              {moment(product.createdAt).format("YYYY-MM-DD HH:mm:ss")}
            </Typography>
            {product.updatedAt ? (
              <Typography variant="body2" color="textSecondary" gutterBottom>
                Updated At:
                {moment(product.updatedAt).format("YYYY-MM-DD HH:mm:ss")}
              </Typography>
            ) : (
              <Typography variant="body2" color="textSecondary" gutterBottom>
                Not Updated
              </Typography>
            )}
            <Button
              variant="contained"
              onClick={() => navigate("/products")}
              sx={{ mt: 2, mr: 2 }}
            >
              Back to List
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => navigate(`/products/edit/${id}`)}
              sx={{ mt: 2 }}
            >
              Edit Product
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default ProductDetail;

function formatDate(date) {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = `${d.getMonth() + 1}`.padStart(2, "0");
  const day = `${d.getDate()}`.padStart(2, "0");
  const hours = `${d.getHours()}`.padStart(2, "0");
  const minutes = `${d.getMinutes()}`.padStart(2, "0");
  const seconds = `${d.getSeconds()}`.padStart(2, "0");
  const milliseconds = `${d.getMilliseconds()}`.padStart(7, "0");

  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${milliseconds}`;
}
