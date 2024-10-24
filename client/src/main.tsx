import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import routes from './routes';
import { GoogleOAuthProvider } from '@react-oauth/google';

const router = createBrowserRouter(routes);

createRoot(document.getElementById('root')!).render(
  <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>
  </GoogleOAuthProvider>,
)
