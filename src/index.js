import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import axios from 'axios';


axios.defaults.baseURL = 'http://cvtheque.activsolution.fr:33066';
axios.defaults.https = false;
// axios.defaults.trustAsAny = true;
// axios.defaults.withCredentials = true;
// axios.defaults.ignoreHTTPSErrors = true;
// axios.defaults.ignoreSSL = true;



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
