import { useState, useCallback } from "react";
import UserService from "../../services/UserService";
export const useUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const getUsers = useCallback(async () => {
    setLoading(true);
    try {
      const response = await UserService.getUsers();
      setUsers(response.data);
    } catch (error) {
      console.error("Failed to fetch users:", error);
    } finally {
      setLoading(false);
    }
  }, []);
  const getUserById = async (id) => {
    try {
      const response = await UserService.getUserById(id);
      return response.data;
    } catch (error) {
      console.error("Failed to fetch user by id:", error);
    }
  };
  const creatUser = async (user) => {
    try {
      await UserService.createUser(user);
      getUsers();
    } catch (error) {
      console.error("Failed to create user:", error);
    }
  };
  const deleteUser = async (id) => {
    try {
      await UserService.deleteUser(id);
      getUsers();
    } catch (error) {
      console.error("Failed to delete category:", error);
    }
  };
  return {
    loading,
    users,
    getUsers,
    getUserById,
    creatUser,
    deleteUser,
  };
};
