import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import SchoolProfilePage from './pages/SchoolProfilePage';
import SchoolsPage from './pages/SchoolsPage';
import StudentsPage from './pages/StudentsPage';
import TeachersPage from './pages/TeachersPage';
import ComplaintsPage from './pages/ComplaintsPage';
import MessagesPage from './pages/MessagesPage';
import NotificationsPage from './pages/NotificationsPage';
import ReportsPage from './pages/ReportsPage';
import ProfilePage from './pages/ProfilePage';
import SettingsPage from './pages/SettingsPage';

const SchoolManagerDashboardLayout = () => {
  return (
    <Layout>
      <Routes>
        <Route index element={<Dashboard />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="school-profile" element={<SchoolProfilePage />} />
        <Route path="schools" element={<SchoolsPage />} />
        <Route path="students" element={<StudentsPage />} />
        <Route path="teachers" element={<TeachersPage />} />
        <Route path="complaints" element={<ComplaintsPage />} />
        <Route path="messages" element={<MessagesPage />} />
        <Route path="notifications" element={<NotificationsPage />} />
        <Route path="reports" element={<ReportsPage />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="settings" element={<SettingsPage />} />
        
        {/* Default route */}
        <Route path="*" element={<Dashboard />} />
      </Routes>
    </Layout>
  );
};

export default SchoolManagerDashboardLayout;
