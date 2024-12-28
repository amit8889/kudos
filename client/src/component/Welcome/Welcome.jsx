import {useState,useEffect} from 'react'
import useApiCall from "../../networks/api.js"
import { useNavigate } from "react-router-dom";
import Loading from "../Loading/Loading"
// eslint-disable-next-line react/prop-types
export default function WelcomePage({setUserData}) {
  const navigate = useNavigate();
  const { loading, data, error, makeApiCall } = useApiCall();
  const [email, setEmail] = useState('');
  const handleLogin = async() => {
    const customHeaders = { 'Authorization': 'Bearer your_token_here' };
    const URL  =  "/api/users/login/?search="+email
    await makeApiCall(URL, 'GET',null, customHeaders);

  };
  useEffect(()=>{
    console.log(data)
    if(data?.name){
      setUserData(()=>data)
      navigate('/landing')
    }
  },[data, data?._id, data?.name, navigate, setUserData])


  const handleEmailChange = (e)=>{
    setEmail(e.target.value);
  }
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-blue-500 to-purple-600 text-white">
      <h1 className="text-5xl font-bold mb-6">Welcome to KudoSpot!</h1>
      <div className="w-full max-w-xs bg-white p-6 rounded-lg shadow-lg">
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="username"
          type="text"
          placeholder="Enter your email"
          value={email}
          onChange={handleEmailChange}
        />
        {error && <span className="text-red-500" title={error}>{error}</span>}
        {loading?<Loading/>:<button
          className="w-full bg-blue-600 text-white py-2 mt-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          onClick ={()=>handleLogin()}
          disabled={loading}
        >
          Submit
        </button>}
        
      </div>
    </div>
  );
}
