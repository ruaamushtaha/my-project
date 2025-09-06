import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Toaster } from 'react-hot-toast';
import { useTheme } from './hooks/useTheme';
import { HelmetProvider } from 'react-helmet-async';
import { ErrorBoundary } from 'react-error-boundary';
import LoadingSpinner from './components/ui/LoadingSpinner';
import ErrorFallback from './components/ui/ErrorFallback';

// Lazy load pages
const Login = React.lazy(() => import('./pages/auth/Login'));
const ForgotPassword = React.lazy(() => import('./pages/auth/ForgotPassword'));
const ResetPassword = React.lazy(() => import('./pages/auth/ResetPassword'));
const AdminDashboard = React.lazy(() => import('./pages/dashboard/AdminDashboard'));
const Users = React.lazy(() => import('./pages/dashboard/admin/Users'));
const UserDetails = React.lazy(() => import('./pages/dashboard/admin/UserDetails'));
const Roles = React.lazy(() => import('./pages/dashboard/admin/Roles'));
const Content = React.lazy(() => import('./pages/dashboard/admin/Content'));
const Support = React.lazy(() => import('./pages/dashboard/admin/Support'));
const Settings = React.lazy(() => import('./pages/dashboard/admin/Settings'));
const Profile = React.lazy(() => import('./pages/dashboard/Profile'));
const Page404 = React.lazy(() => import('./pages/errors/Page404'));

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

// Auth wrapper component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

// Public route wrapper
const PublicRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (isAuthenticated) {
    const from = location.state?.from?.pathname || '/admin';
    return <Navigate to={from} replace />;
  }

  return children;
};

function App() {
  const { theme } = useTheme();

  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <div className={theme} dir="rtl">
          <Toaster
            position="top-center"
            reverseOrder={false}
            toastOptions={{
              className: 'font-sans',
              duration: 5000,
              style: {
                background: theme === 'dark' ? '#1f2937' : '#fff',
                color: theme === 'dark' ? '#fff' : '#111827',
                border: `1px solid ${theme === 'dark' ? '#374151' : '#e5e7eb'}`,
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
              },
            }}
          />
          <ErrorBoundary FallbackComponent={ErrorFallback}>
            <Suspense
              fallback={
                <div className="flex items-center justify-center min-h-screen">
                  <LoadingSpinner size="xl" />
                </div>
              }
            >
              <Router>
                <Routes>
                  {/* Public Routes */}
                  <Route
                    path="/login"
                    element={
                      <PublicRoute>
                        <Login />
                      </PublicRoute>
                    }
                  />
                  <Route
                    path="/forgot-password"
                    element={
                      <PublicRoute>
                        <ForgotPassword />
                      </PublicRoute>
                    }
                  />
                  <Route
                    path="/reset-password"
                    element={
                      <PublicRoute>
                        <ResetPassword />
                      </PublicRoute>
                    }
                  />

                  {/* Admin Routes */}
                  <Route
                    path="/admin"
                    element={
                      <ProtectedRoute>
                        <AdminDashboard />
                      </ProtectedRoute>
                    }
                  >
                    <Route index element={<Navigate to="overview" replace />} />
                    <Route path="overview" element={<div>لوحة التحكم</div>} />
                    <Route path="users" element={<Users />} />
                    <Route path="users/:id" element={<UserDetails />} />
                    <Route path="roles" element={<Roles />} />
                    <Route path="content" element={<Content />} />
                    <Route path="support" element={<Support />} />
                    <Route path="settings" element={<Settings />} />
                  </Route>

                  {/* Profile Route */}
                  <Route
                    path="/profile"
                    element={
                      <ProtectedRoute>
                        <Profile />
                      </ProtectedRoute>
                    }
                  />

                  {/* 404 Route */}
                  <Route path="*" element={<Page404 />} />
                </Routes>
              </Router>
            </Suspense>
          </ErrorBoundary>
          <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
        </div>
      </QueryClientProvider>
    </HelmetProvider>
  );
}

export default App;
