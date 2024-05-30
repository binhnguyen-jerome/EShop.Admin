import { useState, useCallback } from "react";
import CategoryService from "../../services/CategoryService";

export const useCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const getCategories = useCallback(async () => {
    setLoading(true);
    try {
      const response = await CategoryService.getCategories();
      setCategories(response.data);
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    } finally {
      setLoading(false);
    }
  }, []);
  const getCategoryById = async (id) => {
    try {
      const response = await CategoryService.getCategoryById(id);
      return response.data;
    } catch (error) {
      console.error("Failed to fetch category by id:", error);
    }
  };
  const createCategory = async (category) => {
    try {
      await CategoryService.createCategory(category);
      getCategories();
    } catch (error) {
      console.error("Failed to create category:", error);
    }
  };
  const updateCategory = async (id, category) => {
    try {
      await CategoryService.updateCategory(id, category);
      getCategories();
    } catch (error) {
      console.error("Failed to update category:", error);
    }
  };
  const deleteCategory = async (id) => {
    try {
      await CategoryService.deleteCategory(id);
      getCategories();
    } catch (error) {
      console.error("Failed to delete category:", error);
    }
  };
  return {
    loading,
    categories,
    getCategories,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory,
  };
};
