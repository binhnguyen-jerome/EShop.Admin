import useSWR from "swr";
import axios from "axios";
import axiosInstance from "./axiosConfig";
const fetcher = (url) => axiosInstance.get(url).then((res) => res.data);

const useFetchData = (url) => {
  const { data, error } = useSWR(url, fetcher);

  return {
    data,
    isLoading: !error && !data,
    isError: error,
  };
};
export default useFetchData;
