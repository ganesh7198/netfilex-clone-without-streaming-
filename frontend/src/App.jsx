import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import axios from "axios";
import Homepage from "./Pages/Homepage";
import Loginpage from "./Pages/Loginpage";
import Signuppage from "./Pages/Singuppage";
import Innerhomepage from "./Pages/Innerhomepage";
import "./App.css";
function App() {
  const [isLogin, setIsLogin] = useState(null); // null = checking

  useEffect(() => {
    async function checkAuth() {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/v1/auth/getme",
          { withCredentials: true }
        );

        if (response.data.success) {
          setIsLogin(true);
        } else {
          setIsLogin(false);
        }
      } catch (error) {
        console.log(error);
        setIsLogin(false);
      }
    }

    checkAuth();
  }, []);


  return (
    <Routes>
      {/* Public Routes: redirect logged-in users */}
      <Route
        path="/"
        element={isLogin ? <Navigate to="/home" replace /> : <Homepage />}
      />
      <Route
        path="/login"
        element={isLogin ? <Navigate to="/home" replace /> : <Loginpage />}
      />
      <Route
        path="/signup"
        element={isLogin ? <Navigate to="/home" replace /> : <Signuppage />}
      />

      {/* Protected Route */}
      <Route
        path="/home"
        element={isLogin ? <Innerhomepage /> : <Navigate to="/login" replace />}
      />
    </Routes>
  );
}

export default App;
