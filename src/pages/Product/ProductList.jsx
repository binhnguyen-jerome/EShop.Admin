import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  useTheme,
  useMediaQuery,
  CircularProgress,
  Button,
} from "@mui/material";
import Header from "../../components/Header";
import ProductCard from "./components/ProductCard";
import { useProducts } from "../../hook/product/useProducts";
import confirmDelete from "../../utils/confirmDelete";
import BoxStyles from "../../components/BoxStyles";
import ProductGrid from "./components/ProductGrid";

const ProductList = () => {
  const theme = useTheme();
  const isNonMobile = useMediaQuery("(min-width: 1000px)");
  const navigate = useNavigate();
  const [view, setView] = useState("grid");
  const { products, getProducts, loading, deleteProduct } = useProducts();

  useEffect(() => {
    getProducts();
  }, [getProducts]);

  const handleEdit = (id) => {
    navigate(`/products/edit/${id}`);
  };

  const navigateProductDetail = (id) => {
    navigate(`/products/${id}`);
  };

  const handleDelete = async (id) => {
    confirmDelete(id, deleteProduct);
  };

  const toggleView = () => {
    setView(view === "card" ? "grid" : "card");
  };

  return (
    <Box m="1.5rem 2.5rem">
      <Header
        title="PRODUCTS"
        subtitle="See your list of products."
        route="/products/create"
      />
      <Button
        onClick={toggleView}
        variant="contained"
        color="primary"
        style={{ marginBottom: "1rem" }}
      >
        Switch to {view === "card" ? "Grid" : "Card"} View
      </Button>
      {loading ? (
        <CircularProgress color="success" />
      ) : view === "card" ? (
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
        <BoxStyles height="70vh" mt={2}>
          <ProductGrid
            products={products}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
            navigateProductDetail={navigateProductDetail}
          />
        </BoxStyles>
      )}
    </Box>
  );
};

export default ProductList;
