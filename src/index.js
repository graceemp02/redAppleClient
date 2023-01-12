/** @format */

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import axios from 'axios';

axios.defaults.baseURL = 'http://192.168.18.5/red/';
// axios.defaults.baseURL = 'https://iamredapple.com/php/';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
