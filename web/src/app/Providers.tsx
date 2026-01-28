import React from 'react';
import { ThemeContextProvider } from 'shared/context/ThemeContextWrapper';
import GlobalStyle from 'shared/styles/globalStyles';
import { RouterProvider } from 'react-router-dom';
import { createBrowserRouter } from 'react-router-dom';
import routes from './router';
import { ToastContainer } from 'react-toastify';
//import 'react-toastify/dist/ReactToastify.css';
import errorIcon from 'shared/assets/error.png'
import warningIcon from 'shared/assets/warning.png'
import successIcon from 'shared/assets/success2.png'
import infoIcon from 'shared/assets/info.svg'

const router = createBrowserRouter(routes);

interface ProvidersProps {
  children?: React.ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <ThemeContextProvider>
      <GlobalStyle />
      <RouterProvider router={router} />
      <ToastContainer 
          position="top-right" 
          autoClose={5000} 
          hideProgressBar={false} 
          newestOnTop={true} 
          closeOnClick 
          pauseOnFocusLoss
          draggable
          pauseOnHover
          icon={({ type }) => {
            switch (type) {
              case "success":
                return <img src={successIcon} alt="Success Icon" style={{ width: '100%', height: '100%' }} />;
              case "error":
                return <img src={errorIcon} alt="Error Icon" style={{ width: '100%', height: '100%' }} />;
              case "info":
                return <img src={infoIcon} alt="Info Icon" style={{ width: '100%', height: '100%' }} />;
              case "warning":
                return <img src={warningIcon} alt="Warning Icon" style={{ width: '100%', height: '100%' }} />;
              case "default":
                return "🔔";
              default:
                return "🔔";
            }
          }}
      />
      {children}
    </ThemeContextProvider>
  );
}
