import { useState } from "react";
import Cookies from "js-cookie";
import axiosInstance from "../hook/commom/axiosConfig";
import {
  signInStart,
  signInSucess,
  signInFailure,
  signoutUserStart,
  signoutUserSucess,
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
          let date = new Date();
          date.setTime(date.getTime() + 1 * 60 * 1000);
          Cookies.set("token", response.data.token, {
            expires: date,
          });
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
      dispatch(signoutUserSucess);
    };
    return signout;
  },
};
export default AuthService;
