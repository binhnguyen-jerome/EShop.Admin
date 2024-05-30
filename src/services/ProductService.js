import axiosInstance from "../hook/commom/axiosConfig";
const ProductService = {
  getProducts: () => {
    const url = "/products";
    return axiosInstance.get(url);
  },

  getProductById: (id) => {
    const url = `/products/${id}`;
    return axiosInstance.get(url);
  },

  createProduct: (body) => {
    const url = "/products";
    return axiosInstance.post(url, body);
  },

  updateProduct: (id, category) => {
    const url = "/products";
    return axiosInstance.put(`${url}/${id}`, category);
  },
  deleteProduct: (id) => {
    const url = `/products/${id}`;
    return axiosInstance.delete(url);
  },
};

export default ProductService;
