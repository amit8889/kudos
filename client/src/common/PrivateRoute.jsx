import { Navigate } from "react-router-dom";


const PrivateRoute = ({ element, userData }) => {
  return userData ? element : <Navigate to="/" replace />;
};


export default PrivateRoute;
