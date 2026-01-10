import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import axios from "axios";

import Homepage from "./Pages/Homepage";
import Loginpage from "./Pages/Loginpage";
import Signuppage from "./Pages/Singuppage";
import Innerhomepage from "./Pages/Innerhomepage";
import ProtectedLayout from "../src/Comopontes/ProtectedLayout";

import "./App.css";
import Tv from "./Pages/Tv";

function App() {
  const [isLogin, setIsLogin] = useState(null);

  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await axios.get("http://localhost:5000/api/v1/auth/getme", {
          withCredentials: true,
        });
        setIsLogin(res.data.success);
      } catch {
        setIsLogin(false);
      }
    }

    checkAuth();
  }, []);

  return (
    <Routes>
      {/* Public Routes */}
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

      {/* Protected Layout */}
      <Route element={<ProtectedLayout isLogin={isLogin} />}>
        <Route path="/home" element={<Innerhomepage />} />
       <Route path="/tv" element={<Tv/>} />
      </Route>
    </Routes>
  );
}

export default App;
