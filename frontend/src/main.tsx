import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
/* Theme/Styling */
import { ThemeContextProvider } from 'context/ThemeContextWrapper';
import GlobalStyle from 'styles/globalStyles';
/* Router/routes */
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import routes from './routes/router.tsx'


const router = createBrowserRouter(routes);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeContextProvider>
      <GlobalStyle/>
      <RouterProvider router={router}/>
    </ThemeContextProvider>
  </StrictMode>,
)
