/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { useState } from "react";

type Props = {
  url: string;
  method: string;
  data?: object;
  params?: object;
};

const useAxios = () => {
  const [response, setResponse] = useState<null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const axiosInstance = axios.create({
    baseURL: "https://reqres.in/api",
  });

  const fetchData = async ({ url, method, data, params }: Props) => {
    setLoading(true);
    try {
      const result = await axiosInstance({
        url,
        method,
        data,
        params,
      });
      setResponse(result.data);
    } catch (error: any) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };
  return { response, error, loading, fetchData };
};

export default useAxios;
