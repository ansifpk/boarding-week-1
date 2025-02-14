import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { GoogleOAuthProvider } from '@react-oauth/google'
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from 'sonner';
import { Provider } from 'react-redux';
import { persist, store } from './redux/store.ts';
import { PersistGate } from 'redux-persist/integration/react';


createRoot(document.getElementById('root')!).render(
  // <StrictMode>
    <BrowserRouter>
      <GoogleOAuthProvider clientId={"760421877823-3kco1lt3a1477v488i8q2bsljpdpsdsn.apps.googleusercontent.com"} >
        <Toaster position="bottom-right" richColors />
          <Provider store={store}>
            <PersistGate persistor={persist}>
               <App  />
            </PersistGate>
          </Provider> 
      </GoogleOAuthProvider>
    </BrowserRouter>
  // </StrictMode>,
)
