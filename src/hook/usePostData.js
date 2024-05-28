import { useState } from "react";
import axiosInstance from "./axiosConfig";
const usePostData = (url) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const postData = async (postData) => {
    setLoading(true);
    try {
      const response = await axiosInstance.post(url, postData);
      setData(response.data);
      console.log(response.data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return [postData, data, error, loading];
};

export default usePostData;
