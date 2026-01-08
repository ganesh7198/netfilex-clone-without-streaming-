// Layouts/ProtectedLayout.jsx
import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import Navbar from "./Navbar";

function ProtectedLayout({ isLogin }) {
  if (isLogin === null) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Checking authentication...
      </div>
    );
  }

  if (!isLogin) {
    return <Navigate to="/login" replace />;
  }

  return (
    <>
     <Navbar></Navbar>
      <div className="pt-20">
        <Outlet />
      </div>
    </>
  );
}

export default ProtectedLayout;
