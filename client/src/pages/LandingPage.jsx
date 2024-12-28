import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Landing from "../component/Landing/Landing";

// eslint-disable-next-line react/prop-types
const LandingPage = ({ userData }) => {
  const navigate = useNavigate(); // Corrected hook name
  
  useEffect(() => {
    // eslint-disable-next-line react/prop-types
    if (!userData || !userData.name) {
      navigate("/");
    }
  }, [userData, navigate]); // Added navigate as a dependency

  return <Landing userData={userData} />;
};

export default LandingPage;
