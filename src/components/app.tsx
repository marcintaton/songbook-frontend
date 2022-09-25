import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import AppRoutes from '@src/components/appRoutes';
import RenderError from '@src/components/renderError';

export default function App() {
  return (
    <div>
      <React.StrictMode>
        <BrowserRouter>
          <ErrorBoundary FallbackComponent={RenderError}>
            <AppRoutes />
          </ErrorBoundary>
        </BrowserRouter>
      </React.StrictMode>
    </div>
  );
}
