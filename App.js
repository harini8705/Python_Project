import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login.jsx';
import SignUp from './pages/SignUp.jsx';
import ExpLogin from './pages/ExpertLogin.jsx';
import ExpSignUp from './pages/ExpertSignup.jsx';
import ExpForgotPassword from './pages/expforgotPassword.jsx';
import ForgotPassword from './pages/forgotPassword.jsx';
import Weather from './pages/Weather.jsx';
import Home from './pages/Home.jsx';
import ExpertAnalysis from './pages/ExpertAnalysis.jsx';
import ExpertAnswer from './pages/Expertanswer.jsx';
import GovernmentSchemes from './pages/Schemes.jsx';
import PriceUpdates from './pages/PriceUpdates.jsx';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/explogin" element={<ExpLogin />} />
        <Route path="/expsignup" element={<ExpSignUp />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/expforgotpassword" element={<ExpForgotPassword/>}/>   
        <Route path="/weather" element={<Weather/>}/>
        <Route path="/expertAnalysis" element={<ExpertAnalysis />} />
        <Route path="/expertanswer" element={<ExpertAnswer />} />
        <Route path="/schemes" element={<GovernmentSchemes />} />
        <Route path="/priceupdates" element={<PriceUpdates/>}/>
      </Routes>
    </Router>
  );
}

export default App;
