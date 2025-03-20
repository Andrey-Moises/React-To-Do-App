import React, { useState } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  TextField, 
  Button, 
  List, 
  ListItem, 
  ListItemIcon, 
  ListItemText, 
  ListItemSecondaryAction, 
  Checkbox, 
  IconButton,
  Paper,
  Divider
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { createTheme, ThemeProvider } from '@mui/material/styles';

// Creamos un tema personalizado
const theme = createTheme({
  palette: {
    primary: {
      main: '#3b82f6', // Equivalente al azul que usábamos antes
    },
    secondary: {
      main: '#ef4444', // Equivalente al rojo para eliminar
    },
  },
});

const TodoList = () => {
  // Estado para almacenar la lista de tareas
  const [todos, setTodos] = useState([]);
  
  // Estado para la nueva tarea que se está escribiendo
  const [newTodo, setNewTodo] = useState('');
  
  // Función para agregar una nueva tarea
  const addTodo = () => {
    // Verificamos que la tarea no esté vacía
    if (newTodo.trim() === '') return;
    
    // Creamos un nuevo objeto de tarea con un ID único
    const todo = {
      id: Date.now(),
      text: newTodo,
      completed: false
    };
    
    // Agregamos la nueva tarea al array de tareas
    setTodos([...todos, todo]);
    
    // Limpiamos el campo de entrada
    setNewTodo('');
  };
  
  // Función para marcar una tarea como completada o no completada
  const toggleComplete = (id) => {
    setTodos(
      todos.map(todo => {
        if (todo.id === id) {
          // Invertimos el estado de completado para la tarea seleccionada
          return { ...todo, completed: !todo.completed };
        }
        return todo;
      })
    );
  };
  
  // Función para eliminar una tarea
  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };
  
  // Función para manejar la tecla Enter cuando se presiona
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addTodo();
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="sm" sx={{ mt: 4 }}>
        <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
          <Typography 
            variant="h4" 
            component="h1" 
            align="center" 
            gutterBottom 
            sx={{ fontWeight: 'bold', color: 'text.primary' }}
          >
            Lista de Tareas
          </Typography>
          
          {/* Entrada para agregar nuevas tareas */}
          <Box sx={{ display: 'flex', mb: 3 }}>
            <TextField
              variant="outlined"
              size="small"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Agregar nueva tarea..."
              fullWidth
              sx={{ mr: 1 }}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={addTodo}
              startIcon={<AddIcon />}
            >
              Agregar
            </Button>
          </Box>
          
          <Divider sx={{ mb: 2 }} />
          
          {/* Lista de tareas */}
          {todos.length === 0 ? (
            <Typography 
              color="text.secondary" 
              align="center" 
              sx={{ py: 2 }}
            >
              No hay tareas pendientes
            </Typography>
          ) : (
            <List>
              {todos.map(todo => (
                <ListItem 
                  key={todo.id}
                  dense
                  sx={{ 
                    borderRadius: 1, 
                    mb: 1,
                    bgcolor: 'background.paper',
                    border: '1px solid',
                    borderColor: 'divider',
                  }}
                >
                  <ListItemIcon>
                    <Checkbox
                      edge="start"
                      checked={todo.completed}
                      onChange={() => toggleComplete(todo.id)}
                      color="primary"
                    />
                  </ListItemIcon>
                  <ListItemText 
                    primary={todo.text} 
                    sx={{ 
                      textDecoration: todo.completed ? 'line-through' : 'none',
                      color: todo.completed ? 'text.disabled' : 'text.primary'
                    }}
                  />
                  <ListItemSecondaryAction>
                    <IconButton 
                      edge="end" 
                      onClick={() => deleteTodo(todo.id)}
                      color="secondary"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
          )}
          
          {/* Contador de tareas */}
          {todos.length > 0 && (
            <Typography 
              variant="body2" 
              color="text.secondary" 
              sx={{ mt: 2 }}
            >
              {todos.filter(todo => !todo.completed).length} tareas pendientes de {todos.length} totales
            </Typography>
          )}
        </Paper>
      </Container>
    </ThemeProvider>
  );
};

export default TodoList;