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

  const fetchData = async (props: Props) => {
    const { url, method, data, params } = props;
    setLoading(true);
    try {
      const result = await axios({
        url: `https://reqres.in/api${url}`,
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
