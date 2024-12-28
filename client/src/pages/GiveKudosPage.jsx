import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import GiveKudos from "../component/GiveKudos/GiveKudos"
const GiveKudosPage = ({userData}) => {
    const navigate = useNavigate(); // Corrected hook name
  
  useEffect(() => {
    // eslint-disable-next-line react/prop-types
    if (!userData || !userData.name) {
      navigate("/");
    }
  }, [userData, navigate]); 
  return <GiveKudos userData={userData}/>
}

export default GiveKudosPage