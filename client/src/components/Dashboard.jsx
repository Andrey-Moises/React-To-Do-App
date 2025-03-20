import React from 'react';
import { 
  Container, 
  Grid, 
  Paper, 
  Typography, 
  Box, 
  Button,
  Card,
  CardContent,
  CardActions,
  Divider
} from '@mui/material';
import AssignmentIcon from '@mui/icons-material/Assignment';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import AssignmentLateIcon from '@mui/icons-material/AssignmentLate';
import AddTaskIcon from '@mui/icons-material/AddTask';
import { Link as RouterLink } from 'react-router-dom';

const Dashboard = () => {
  // Estos datos se cargarían desde tu API en un caso real
  const stats = {
    totalTasks: 12,
    completedTasks: 5,
    pendingTasks: 7,
    lateTasks: 2
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Dashboard
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Bienvenido de nuevo. Aquí tienes un resumen de tus tareas.
        </Typography>
      </Box>

      {/* Tarjetas de estadísticas */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Paper 
            elevation={2} 
            sx={{ 
              p: 3, 
              display: 'flex', 
              flexDirection: 'column',
              alignItems: 'center',
              bgcolor: 'primary.light',
              color: 'primary.contrastText'
            }}
          >
            <AssignmentIcon sx={{ fontSize: 40, mb: 1 }} />
            <Typography variant="h4" component="div">{stats.totalTasks}</Typography>
            <Typography variant="body2">Tareas Totales</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper 
            elevation={2} 
            sx={{ 
              p: 3, 
              display: 'flex', 
              flexDirection: 'column',
              alignItems: 'center',
              bgcolor: 'success.light',
              color: 'success.contrastText'
            }}
          >
            <AssignmentTurnedInIcon sx={{ fontSize: 40, mb: 1 }} />
            <Typography variant="h4" component="div">{stats.completedTasks}</Typography>
            <Typography variant="body2">Tareas Completadas</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper 
            elevation={2} 
            sx={{ 
              p: 3, 
              display: 'flex', 
              flexDirection: 'column',
              alignItems: 'center',
              bgcolor: 'warning.light',
              color: 'warning.contrastText'
            }}
          >
            <AssignmentIcon sx={{ fontSize: 40, mb: 1 }} />
            <Typography variant="h4" component="div">{stats.pendingTasks}</Typography>
            <Typography variant="body2">Tareas Pendientes</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper 
            elevation={2} 
            sx={{ 
              p: 3, 
              display: 'flex', 
              flexDirection: 'column',
              alignItems: 'center',
              bgcolor: 'error.light',
              color: 'error.contrastText'
            }}
          >
            <AssignmentLateIcon sx={{ fontSize: 40, mb: 1 }} />
            <Typography variant="h4" component="div">{stats.lateTasks}</Typography>
            <Typography variant="body2">Tareas Atrasadas</Typography>
          </Paper>
        </Grid>
      </Grid>

      {/* Acciones rápidas */}
      <Typography variant="h5" sx={{ mb: 2 }}>Acciones Rápidas</Typography>
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <AddTaskIcon color="primary" sx={{ mr: 1 }} />
                <Typography variant="h6">Gestionar Tareas</Typography>
              </Box>
              <Divider sx={{ mb: 2 }} />
              <Typography variant="body2" color="text.secondary">
                Accede a tu lista de tareas para crear, editar o marcar tareas como completadas.
              </Typography>
            </CardContent>
            <CardActions>
              <Button 
                variant="contained" 
                color="primary" 
                component={RouterLink} 
                to="/todos"
              >
                Ir a Mis Tareas
              </Button>
            </CardActions>
          </Card>
        </Grid>
        
        {/* Más tarjetas de acciones rápidas pueden ir aquí */}
      </Grid>
      
      {/* Área para contenido adicional */}
      <Box sx={{ mt: 4 }}>
        <Typography variant="h5" sx={{ mb: 2 }}>Actividad Reciente</Typography>
        <Paper sx={{ p: 3 }}>
          <Typography variant="body1" color="text.secondary" sx={{ textAlign: 'center' }}>
            La actividad reciente aparecerá aquí una vez que empieces a usar la aplicación.
          </Typography>
        </Paper>
      </Box>
    </Container>
  );
};

export default Dashboard;