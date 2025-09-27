import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import SchoolsPage from './pages/SchoolsPage';
import SchoolComparisonPage from './pages/SchoolComparisonPage';
import ComplaintsPage from './pages/ComplaintsPage';
import EvaluationsPage from './pages/EvaluationsPage';
import ProfilePage from './pages/ProfilePage';
import ChatPage from './pages/ChatPage';
import NotificationsPage from './pages/NotificationsPage';
import SettingsPage from './pages/SettingsPage';
import TestNotifications from './TestNotifications';
import ResetData from './ResetData';

const ParentsDashboardLayout = () => {
  return (
    <Layout>
      <Routes>
        <Route index element={<SchoolsPage />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="schools" element={<SchoolsPage />} />
        <Route path="schools/comparison" element={<SchoolComparisonPage />} />
        <Route path="complaints" element={<ComplaintsPage />} />
        <Route path="evaluations" element={<EvaluationsPage />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="chat" element={<ChatPage />} />
        <Route path="notifications" element={<NotificationsPage />} />
        <Route path="settings" element={<SettingsPage />} />
        <Route path="test-notifications" element={<TestNotifications />} />
        <Route path="reset-data" element={<ResetData />} />
        
        {/* Calendar and Reports - placeholders for now */}
        <Route path="calendar" element={
          <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">التقويم</h1>
            <p className="text-gray-600 dark:text-gray-400">سيتم تنفيذ هذه الصفحة في الإصدار القادم.</p>
          </div>
        } />
        <Route path="reports" element={
          <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">التقارير</h1>
            <p className="text-gray-600 dark:text-gray-400">سيتم تنفيذ هذه الصفحة في الإصدار القادم.</p>
          </div>
        } />

        {/* Default route to schools page */}
        <Route path="*" element={<SchoolsPage />} />
      </Routes>
    </Layout>
  );
};

export default ParentsDashboardLayout;