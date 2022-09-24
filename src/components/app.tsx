import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from '@src/components/appRoutes';

export default function App() {
  return (
    <div>
      <React.StrictMode>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </React.StrictMode>
    </div>
  );
}
