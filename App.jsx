import React, { Suspense } from 'react';
import { Toaster } from 'react-hot-toast';
import { useTheme } from './hooks/useTheme';
import { HelmetProvider } from 'react-helmet-async';
import { ErrorBoundary } from 'react-error-boundary';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { LoadingSpinner, ErrorFallback } from './components/ui';
import AppRoutes from './routes/AppRoutes';

function App() {
  const { theme } = useTheme();

  return (
    <HelmetProvider>
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
                <LoadingSpinner size="xl" text="جاري التحميل..." />
              </div>
            }
          >
            <AppRoutes />
          </Suspense>
        </ErrorBoundary>
        <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
      </div>
    </HelmetProvider>
  );
}

export default App;