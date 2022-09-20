import React from 'react'
import ReactDOM from 'react-dom/client'
import AppRoutes from './router'

import './styles/global.css';
import './styles/animations.css';
import './styles/colors.css';
import 'react-toastify/dist/ReactToastify.css';

import { Toast } from './components/Toast';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Toast />
    <AppRoutes />
  </React.StrictMode>
)
