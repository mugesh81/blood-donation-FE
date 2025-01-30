import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import DonateBlood from "./components/DonateBlood";
import "./App.css"; 

const App = () => {
  return (
    <div className="app-container">
      <header className="app-header">
        <h1> Magizhvithu Magizh Blood Donation Platform </h1>
        <p>
          Saving lives starts with you! Every drop of blood you donate can be a lifeline for someone in need.  
          Join us in making a difference today! 
        </p>
      </header>
      
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route path="/donate" element={<DonateBlood />} />
          </Routes>
        </Router>
      </AuthProvider>
    </div>
  );
};

export default App;
