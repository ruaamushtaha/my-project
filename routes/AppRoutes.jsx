import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Auth Components
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Registration';
import ForgotPassword from '../pages/auth/ForgotPassword';
import ResetPassword from '../pages/auth/ResetPassword';
import PasswordResetSuccess from '../pages/auth/PasswordResetSuccess';

// Public Pages
import LandingPage from '../pages/public/Home/LandingPage';
import About from '../pages/public/About/index';
import Objectives from '../pages/public/Objectives/index';
import Ratings from '../pages/public/Ratings/index';
import Schools from '../pages/public/Schools/index';
import Services from '../pages/public/Services/index';
import Contact from '../pages/public/Contact/index';
import Privacy from '../pages/public/Privacy/index';
import Terms from '../pages/public/Terms/index';

// Dashboard Components
import ParentsDashboardLayout from '../pages/dashboard/parents/ParentsDashboardLayout';
import SupervisorDashboardLayout from '../src/pages/dashboard/supervisor/SupervisorDashboardLayout';
import SchoolManagerDashboardLayout from '../src/pages/dashboard/school-manager/SchoolManagerDashboardLayout';

// Error Page
import NotFound from '../pages/error/NotFound404';

// Utils
import PrivateRoute from './PrivateRoute';

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/about" element={<About />} />
      <Route path="/objectives" element={<Objectives />} />
      <Route path="/ratings" element={<Ratings />} />
      <Route path="/schools" element={<Schools />} />
      <Route path="/services" element={<Services />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/privacy" element={<Privacy />} />
      <Route path="/terms" element={<Terms />} />
      <Route path="/dashboard/parents/*" element={<ParentsDashboardLayout />} />

      {/* Auth routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password/:token" element={<ResetPassword />} />
      <Route path="/reset-success" element={<PasswordResetSuccess />} />

      {/* Protected Dashboards */}
      <Route path="/dashboard/supervisor/*" element={<SupervisorDashboardLayout />} />
      <Route path="/dashboard/school-manager/*" element={<SchoolManagerDashboardLayout />} />

      {/* 404 Route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}