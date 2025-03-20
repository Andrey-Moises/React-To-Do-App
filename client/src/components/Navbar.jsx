import React, { useState } from 'react';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  IconButton, 
  Box, 
  Menu, 
  MenuItem, 
  Container,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ChecklistIcon from '@mui/icons-material/Checklist';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

const Navbar = ({ isAuthenticated, onLogout }) => {
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  
  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  
  const handleLogout = () => {
    handleMenuClose();
    onLogout();
    navigate('/login');
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        TaskMaster
      </Typography>
      <Divider />
      <List>
        {isAuthenticated ? (
          <>
            <ListItem component={RouterLink} to="/dashboard">
              <ListItemIcon>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItem>
            <ListItem component={RouterLink} to="/todos">
              <ListItemIcon>
                <ChecklistIcon />
              </ListItemIcon>
              <ListItemText primary="Mis Tareas" />
            </ListItem>
            <ListItem button onClick={handleLogout}>
              <ListItemIcon>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText primary="Cerrar Sesión" />
            </ListItem>
          </>
        ) : (
          <>
            <ListItem component={RouterLink} to="/login">
              <ListItemText primary="Iniciar Sesión" />
            </ListItem>
            <ListItem component={RouterLink} to="/register">
              <ListItemText primary="Registrarse" />
            </ListItem>
          </>
        )}
      </List>
    </Box>
  );

  return (
    <>
      <AppBar position="static">
        <Container maxWidth="lg">
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="abrir menu"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
            <ChecklistIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
            <Typography
              variant="h6"
              component={RouterLink}
              to="/"
              sx={{
                flexGrow: 1,
                textDecoration: 'none',
                color: 'inherit',
                fontWeight: 700
              }}
            >
              TaskMaster
            </Typography>
            
            <Box sx={{ display: { xs: 'none', sm: 'flex' } }}>
              {isAuthenticated ? (
                <>
                  <Button color="inherit" component={RouterLink} to="/dashboard">
                    Dashboard
                  </Button>
                  <Button color="inherit" component={RouterLink} to="/todos">
                    Mis Tareas
                  </Button>
                  <IconButton
                    color="inherit"
                    onClick={handleMenuOpen}
                  >
                    <AccountCircleIcon />
                  </IconButton>
                  <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleMenuClose}
                  >
                    <MenuItem component={RouterLink} to="/profile">
                      Mi Perfil
                    </MenuItem>
                    <MenuItem onClick={handleLogout}>
                      Cerrar Sesión
                    </MenuItem>
                  </Menu>
                </>
              ) : (
                <>
                  <Button color="inherit" component={RouterLink} to="/login">
                    Iniciar Sesión
                  </Button>
                  <Button 
                    variant="outlined" 
                    color="inherit" 
                    component={RouterLink} 
                    to="/register"
                    sx={{ ml: 1 }}
                  >
                    Registrarse
                  </Button>
                </>
              )}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Mejor rendimiento en dispositivos móviles
        }}
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240 },
        }}
      >
        {drawer}
      </Drawer>
    </>
  );
};

export default Navbar;