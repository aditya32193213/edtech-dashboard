import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import * as Sentry from "@sentry/react";

// ✅ Initialize Sentry as early as possible (CRA way)
Sentry.init({
  dsn: process.env.REACT_APP_SENTRY_DSN,
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
