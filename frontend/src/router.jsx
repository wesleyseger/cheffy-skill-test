import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';

import { Home } from './pages/Home';
import { ForgetPassword } from './pages/ForgetPassword';
import { ResetPassword } from './pages/ResetPassword';
import { Login } from './pages/Login';
import { SignUp } from './pages/SignUp';

import { ProtectedRoute } from './auth/ProtectedRoute';

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
          <ProtectedRoute><Home /></ProtectedRoute>
        }/>
        <Route path="/password-reset/:token" element={<ResetPassword />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot" element={<ForgetPassword />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes;