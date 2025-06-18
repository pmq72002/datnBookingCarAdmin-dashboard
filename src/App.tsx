import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminHomePage from '../src/pages/AminHomePage';

import DriverRegisterForm from '../src/components/DriverRegisterForm';
import DriverManagementPage from './pages/DriverManagament';
import DriverList from './components/DriverList';
import UserManager from './pages/UserManagament';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AdminHomePage />} />
        <Route path="/drivers" element={<DriverManagementPage />} />
        <Route path="/driver-register" element={<DriverRegisterForm />} />
        <Route path="/driver-list" element={<DriverList />} />
        <Route path="/users" element={<UserManager />} />
      </Routes>
    </Router>
  );
}

export default App;
