import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Box, useTheme, useMediaQuery, CircularProgress } from "@mui/material";
import Swal from "sweetalert2";
import Header from "../../components/Header";
import ProductService from "../../services/ProductService";
import ProductCard from "./components/ProductCard";
import { useProducts } from "../../hook/product/useProducts";
const ProductList = () => {
  const theme = useTheme();
  const isNonMobile = useMediaQuery("(min-width: 1000px)");
  const navigate = useNavigate();
  const handleEdit = (id) => {
    navigate(`/products/edit/${id}`);
  };
  const navigateProductDetail = (id) => {
    navigate(`/products/${id}`);
  };
  const { products, getProducts, loading, deleteProduct } = useProducts();
  useEffect(() => {
    getProducts();
  }, [getProducts]);
  // Alert before delete
  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You will not be able to recover this product!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, keep it",
    });

    if (result.isConfirmed) {
      try {
        await deleteProduct(id);
        Swal.fire("Deleted!", "Your product has been deleted.", "success");
      } catch (error) {
        Swal.fire(
          "Error!",
          "There was an error deleting this product.",
          "error"
        );
      }
    }
  };
  return (
    <Box m="1.5rem 2.5rem">
      <Header
        title="PRODUCTS"
        subtitle="See your list of products."
        route="/products/create"
      />
      {products && !loading ? (
        <Box
          mt="20px"
          display="grid"
          gridTemplateColumns="repeat(4, minmax(0, 1fr))"
          justifyContent="space-between"
          rowGap="20px"
          columnGap="1.33%"
          sx={{
            "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
          }}
        >
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              theme={theme}
              handleDelete={handleDelete}
              handleEdit={handleEdit}
              navigateProductDetail={navigateProductDetail}
            />
          ))}
        </Box>
      ) : (
        <CircularProgress color="success" />
      )}
    </Box>
  );
};

export default ProductList;
