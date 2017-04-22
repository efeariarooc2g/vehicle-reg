import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import axios from 'axios';

let token = localStorage.vehJwtToken;
if(token) {
	axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
} else {
	delete axios.defaults.headers.common['Authorization'];
}

ReactDOM.render(
<Router>
  <App />
  </Router>,
  document.getElementById('root')
);
