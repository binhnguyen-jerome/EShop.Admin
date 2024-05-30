import { useState, useCallback } from "react";
import ProductService from "../../services/ProductService";

export const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const getProducts = useCallback(async () => {
    setLoading(true);
    try {
      const response = await ProductService.getProducts();
      setProducts(response.data);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    } finally {
      setLoading(false);
    }
  }, []);
  const getProductById = async (id) => {
    try {
      const response = await ProductService.getProductById(id);
      return response.data;
    } catch (error) {
      console.error("Failed to fetch category by id:", error);
    }
  };
  const createProduct = async (category) => {
    try {
      await ProductService.createProduct(category);
      getProducts();
    } catch (error) {
      console.error("Failed to create category:", error);
    }
  };
  const updateProduct = async (id, category) => {
    try {
      await ProductService.updateProduct(id, category);
      getProducts();
    } catch (error) {
      console.error("Failed to update category:", error);
    }
  };
  const deleteProduct = async (id) => {
    try {
      await ProductService.deleteProduct(id);
      getProducts();
    } catch (error) {
      console.error("Failed to delete category:", error);
    }
  };
  return {
    loading,
    products,
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
  };
};
