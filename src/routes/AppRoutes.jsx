import React from "react";
import { Routes, Route } from "react-router-dom";

// Auth pages
import Home from "../pages/public/Home/LandingPage";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Registration";
import ForgotPassword from "../pages/auth/ForgotPassword";
import ResetPassword from "../pages/auth/ResetPassword";
import PasswordRestSuccess from "../pages/auth/PasswordResetSuccess";
import NotFound from "../pages/error/NotFound404";
import ServerError from "../pages/error/ServerError500";

// Define application routes
export default function AppRoutes() {
  return (
    <Routes>
      {/* Authentication routes */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password/:token" element={<ResetPassword />} />
      <Route path="/reset-success" element={<PasswordRestSuccess />} />

      {/* Catch-all route for 404 */}
      <Route path="*" element={<NotFound />} />
      <Route path="/error-500" element={<ServerError />} />
    </Routes>
  );
}
