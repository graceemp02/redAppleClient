/** @format */

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import axios from 'axios';

axios.defaults.baseURL = 'http://192.168.18.5/red/';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
