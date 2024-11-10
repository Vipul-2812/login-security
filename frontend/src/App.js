


import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import Signup from './pages/Signup';
import AdminWelcome from './pages/AdminWelcome'; // New page for admin
import Home from './pages/Home'; // New page for user
import { useState, useEffect } from 'react';
import RefrshHandler from './RefrshHandler';
import { jwtDecode as jwt_decode } from 'jwt-decode'; 

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userType, setUserType] = useState(null); 

  // Check if user is logged in and set userType
  useEffect(() => {
    const token = localStorage.getItem('jwtToken');
    if (token) {
      const decodedToken = jwt_decode(token); // Decode token to get userType
      setIsAuthenticated(true);
      setUserType(decodedToken.userType);
    }
  }, []);

  const PrivateRoute = ({ element }) => {
    return isAuthenticated ? element : <Navigate to="/login" />;
  };

  return (
    <div className="App">
      <RefrshHandler setIsAuthenticated={setIsAuthenticated} />
      <Routes>
        <Route path='/' element={<Navigate to="/login" />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/admin-welcome' element={<PrivateRoute element={<AdminWelcome />} />} />
        <Route path='/home' element={<PrivateRoute element={<Home />} />} />
      </Routes>
    </div>
  );
}

export default App;
