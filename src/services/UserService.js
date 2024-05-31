import axiosInstance from "../hook/commom/axiosConfig";
const url = "/users";
const UserService = {
  getUsers: () => {
    return axiosInstance.get(url);
  },

  getUserById: (id) => {
    return axiosInstance.get(`${url}/${id}`);
  },

  createUser: (body) => {
    const urlRegister = "/auth/register";
    return axiosInstance.post(urlRegister, body);
  },
  deleteUser: (id) => {
    return axiosInstance.delete(`${url}/${id}`);
  },
};

export default UserService;
