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

  const makeApiCall = async (url, method = 'GET', body = null, customHeaders = {},cb = null) => {
    setLoading(true);
    setError(null);
    try {
        const {data} = await instance({
        url,
        method,
        data: body,
        headers: { ...customHeaders, 'X-Custom-Header': 'foobar' },  // Merge custom headers with the default header
      });
      console.log(data)
      if(data.success){
        setData(data.data);

      }else{
        setError(data.message);
      }
      setLoading(false);
      if(cb){
        cb();
      }
      
    } catch (err) {
        console.log(err.response.data?.message)
      setError(err.response ? err.response.data?.message : 'Something went wrong');
      setLoading(false);
    }
  };

  return { loading, data, error, makeApiCall };
};

export default useApiCall;
