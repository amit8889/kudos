import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Analytics from "../component/Analytics/Analytics"  
// eslint-disable-next-line react/prop-types
const AnalyticsPage = ({userData}) => {
    const navigate = useNavigate(); // Corrected hook name
  
  useEffect(() => {
    // eslint-disable-next-line react/prop-types
    if (!userData || !userData.name) {
      navigate("/");
    }
  }, [userData, navigate]); // Added navigate as a dependency

  return <Analytics userData={userData}/>
}

export default AnalyticsPage