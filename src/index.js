import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import store, { persistor } from './app/store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'
import { BrowserRouter as Router, Routes, Route, Switch } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { StyledEngineProvider } from '@mui/material/styles';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <GoogleOAuthProvider clientId='195803029050-8tvhphtcii74f4jr974cac78ltick1rb.apps.googleusercontent.com'>
    {/* <React.StrictMode> */}
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <StyledEngineProvider injectFirst>
          <Router>
            <Switch>
              <Routes>
                <Route path="/*" element={<App />} />
              </Routes>
            </Switch>
          </Router>
        </StyledEngineProvider>
      </PersistGate>
    </Provider>
    {/* </React.StrictMode> */}
  </GoogleOAuthProvider>
);

