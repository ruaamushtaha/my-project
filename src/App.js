import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { ErrorBoundary } from 'react-error-boundary';

// Context Providers
import QueryProvider from './contexts/QueryProvider';
import { AuthProvider } from './contexts/AuthProvider';
import { ThemeProvider } from './contexts/ThemeProvider';

// Routes
import AppRoutes from "./routes/AppRoutes";

// Error Fallback Component
const ErrorFallback = ({ error, resetErrorBoundary }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50" dir="rtl">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-6 text-center">
        <div className="text-red-500 text-6xl mb-4">⚠️</div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">حدث خطأ غير متوقع</h1>
        <p className="text-gray-600 mb-4">نعتذر، حدث خطأ في التطبيق</p>
        <details className="text-left bg-gray-100 p-3 rounded text-sm mb-4">
          <summary className="cursor-pointer font-medium">تفاصيل الخطأ</summary>
          <pre className="mt-2 text-xs text-red-600 whitespace-pre-wrap">
            {error?.message}
          </pre>
        </details>
        <button
          onClick={resetErrorBoundary}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
        >
          إعادة المحاولة
        </button>
      </div>
    </div>
  );
};

function App() {
  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onReset={() => window.location.reload()}
    >
      <ThemeProvider>
        <QueryProvider>
          <AuthProvider>
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
              {/* Toast Notifications */}
              <Toaster
                position="top-center"
                reverseOrder={false}
                gutter={8}
                containerClassName=""
                containerStyle={{}}
                toastOptions={{
                  className: '',
                  duration: 4000,
                  style: {
                    background: 'var(--toast-bg, #ffffff)',
                    color: 'var(--toast-color, #1f2937)',
                    border: '1px solid var(--toast-border, #e5e7eb)',
                    borderRadius: '0.5rem',
                    padding: '12px 16px',
                    fontSize: '14px',
                    fontFamily: 'system-ui, -apple-system, sans-serif',
                    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
                  },
                  success: {
                    iconTheme: {
                      primary: '#10b981',
                      secondary: '#ffffff',
                    },
                  },
                  error: {
                    iconTheme: {
                      primary: '#ef4444',
                      secondary: '#ffffff',
                    },
                  },
                }}
              />
              
              {/* Routes */}
              <AppRoutes />
            </div>
          </AuthProvider>
        </QueryProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
