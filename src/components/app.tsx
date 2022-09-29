import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import { CookiesProvider } from 'react-cookie';
import AppRoutes from '@src/components/appRoutes';
import RenderError from '@src/components/renderError';
import TopBar from './topBar';
import ViewRoot from './viewRoot';
import Context from './context';

export default function App() {
  return (
    <div>
      <React.StrictMode>
        <CookiesProvider>
          <Context>
            <ChakraProvider>
              <BrowserRouter>
                <ErrorBoundary FallbackComponent={RenderError}>
                  <TopBar />
                  <ViewRoot maxWidth="50em">
                    <AppRoutes />
                  </ViewRoot>
                </ErrorBoundary>
              </BrowserRouter>
            </ChakraProvider>
          </Context>
        </CookiesProvider>
      </React.StrictMode>
    </div>
  );
}
