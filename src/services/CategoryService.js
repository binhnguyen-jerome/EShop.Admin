import axiosInstance from "../hook/commom/axiosConfig";
const url = "/categories";
const CategoryService = {
  getCategories: () => {
    return axiosInstance.get(url);
  },

  getCategoryById: (id) => {
    return axiosInstance.get(`${url}/${id}`);
  },

  createCategory: (body) => {
    return axiosInstance.post(url, body);
  },

  updateCategory: (id, category) => {
    return axiosInstance.put(`${url}/${id}`, category);
  },
  deleteCategory: (id) => {
    return axiosInstance.delete(`${url}/${id}`);
  },
};

export default CategoryService;
