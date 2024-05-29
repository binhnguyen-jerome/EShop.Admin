import axiosInstance from "../hook/axiosConfig";
const CategoryService = {
  getCategories: () => {
    const url = "/categories";
    return axiosInstance.get(url);
  },

  getCategoryById: (id) => {
    const url = `/categories/${id}`;
    return axiosInstance.get(url);
  },

  createCategory: (body) => {
    const url = "/categories";
    return axiosInstance.post(url, body);
  },

  updateCategory: (id, category) => {
    const url = "/categories";
    return axiosInstance.put(`${url}/${id}`, category);
  },
  deleteCategory: (id) => {
    const url = `/categories/${id}`;
    return axiosInstance.delete(url);
  },
};

export default CategoryService;
