import './index.css'; // Tailwind CSS file
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {useState} from 'react'
import HomePage from "./pages/HomePage";
import LandingPage from "./pages/LandingPage"
import AnalyticsPage from "./pages/AnalyticsPage"
import GiveKudosPage from "./pages/GiveKudosPage"
function App() {
  const [userData,setUserData] = useState(null)
  return (
    <Router>
      <Routes>
       <Route exact path="/landing" element={<LandingPage userData={userData} />} />
       <Route  exact path="/analytics" element={<AnalyticsPage userData={userData} />} />
       <Route exact path="/givekudos" element={<GiveKudosPage userData={userData}/>}/>
       <Route path="*" element={<HomePage setUserData={setUserData} />} />

       
      </Routes>
    </Router>
  );
}

export default App;
