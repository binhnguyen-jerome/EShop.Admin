import { useState } from "react";
import Cookies from "js-cookie";
import axiosInstance from "../hook/axiosConfig";
import {
  signInStart,
  signInSucess,
  signInFailure,
  signoutUserStart,
} from "../state/Slice/userSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

const AuthService = {
  SignIn: () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const postData = async (url, data) => {
      try {
        setLoading(true);
        dispatch(signInStart());
        const response = await axiosInstance.post(url, data);
        if (response.data.token) {
          Cookies.set("token", response.data.token, { expires: 1 });
        }
        dispatch(signInSucess(response.data));
        navigate("/");
        return response.data;
      } catch (error) {
        dispatch(signInFailure());
        setError(error.response.data.message);
        toast.error(error.response.data.message);
      } finally {
        setLoading(false);
      }
    };

    return [postData, error, loading];
  },
  SignOut: () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const signout = () => {
      dispatch(signoutUserStart());
      Cookies.remove("token");
      navigate("/sign-in");
    };
    return signout;
  },
};
export default AuthService;
