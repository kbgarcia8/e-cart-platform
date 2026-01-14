import React from 'react';
import { ThemeContextProvider } from 'context/ThemeContextWrapper';
import GlobalStyle from 'styles/globalStyles';
import { RouterProvider } from 'react-router-dom';
import { createBrowserRouter } from 'react-router-dom';
import routes from './router';

const router = createBrowserRouter(routes);

interface ProvidersProps {
  children?: React.ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <ThemeContextProvider>
      <GlobalStyle />
      <RouterProvider router={router} />
      {children}
    </ThemeContextProvider>
  );
}
