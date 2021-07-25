import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { QueryClient, QueryClientProvider } from 'react-query';
import axios from 'axios';

const queryClient = new QueryClient();
axios.defaults.baseURL = process.env.REACT_APP_SERVER_URI;

ReactDOM.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
    <App />
    </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById('root')
);