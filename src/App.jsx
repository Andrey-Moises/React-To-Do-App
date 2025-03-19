import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Box, CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import TodoList from './components/TodoList';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import NotFound from './components/NotFound';

// Creamos un tema personalizado
const theme = createTheme({
  palette: {
    primary: {
      main: '#3b82f6',
    },
    secondary: {
      main: '#10b981',
    },
    error: {
      main: '#ef4444',
    },
  },
});

function App() {
  // Estado para manejar la autenticación
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  // Simulación básica de login (esto se reemplazará con tu API real)
  const handleLogin = (credentials) => {
    // Aquí eventualmente llamarías a tu API de autenticación
    console.log('Intentando iniciar sesión con:', credentials);
    setIsAuthenticated(true);
    return true;
  };
  
  // Simulación de logout
  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  // Componente para rutas protegidas
  const ProtectedRoute = ({ children }) => {
    if (!isAuthenticated) {
      return <Navigate to="/login" replace />;
    }
    return children;
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Box sx={{ 
          display: 'flex', 
          flexDirection: 'column',
          minHeight: '100vh',
          bgcolor: '#f5f5f5',
        }}>
          <Navbar isAuthenticated={isAuthenticated} onLogout={handleLogout} />
          <Box sx={{ flex: 1, py: 3, px: 2 }}>
            <Routes>
              <Route path="/" element={
                <Box sx={{ textAlign: 'center', py: 4 }}>
                  <h1>Bienvenido a Tu Lista de Tareas</h1>
                  <p>Por favor inicia sesión para acceder a tu lista de tareas.</p>
                </Box>
              } />
              <Route path="/login" element={
                <Login onLogin={handleLogin} />
              } />
              <Route path="/register" element={
                <Register />
              } />
              <Route path="/dashboard" element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } />
              <Route path="/todos" element={
                <ProtectedRoute>
                  <TodoList />
                </ProtectedRoute>
              } />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Box>
          <Footer />
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;