import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import SchoolsPage from './pages/SchoolsPage';
import ComplaintsPage from './pages/ComplaintsPage';
import EvaluationsPage from './pages/EvaluationsPage';
import ReportsPage from './pages/ReportsPage';
import ProfilePage from './pages/ProfilePage';
import SettingsPage from './pages/SettingsPage';

const SupervisorDashboardLayout = () => {
  return (
    <Layout>
      <Routes>
        <Route index element={<Dashboard />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="schools" element={<SchoolsPage />} />
        <Route path="complaints" element={<ComplaintsPage />} />
        <Route path="evaluations" element={<EvaluationsPage />} />
        <Route path="reports" element={<ReportsPage />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="settings" element={<SettingsPage />} />
        
        {/* Default route */}
        <Route path="*" element={<Dashboard />} />
      </Routes>
    </Layout>
  );
};

export default SupervisorDashboardLayout;
