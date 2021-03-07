import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import App from './App';
import { ThemeProvider, UserProvider } from './contexts';
import './index.css';
// import reportWebVitals from './reportWebVitals';
import 'fontsource-roboto';

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider>
      <UserProvider>
        <Router>
          <App />
          <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
        </Router>
      </UserProvider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
