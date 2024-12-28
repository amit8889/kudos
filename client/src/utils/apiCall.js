import { useState } from 'react';
import axios from 'axios';
import APP from '../constants/main';

const instance = axios.create({
  baseURL: APP.API_END_POINT,
  timeout: 1000,
});

const useApiCall = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const makeApiCall = async (url, method = 'GET', body = null, customHeaders = {}) => {
    setLoading(true);
    setError(null);

    try {
      const response = await instance({
        url,
        method,
        data: body,
        headers: { ...customHeaders, 'X-Custom-Header': 'foobar' },  // Merge custom headers with the default header
      });
      setData(response.data);
      setLoading(false);
    } catch (err) {
      setError(err.response ? err.response.data : 'Something went wrong');
      setLoading(false);
    }
  };

  return { loading, data, error, makeApiCall };
};

export default useApiCall;
