import React from 'react';
import TodoList from './components/TodoList';
import { Box } from '@mui/material';

function App() {
  return (
    <Box sx={{ 
      bgcolor: '#f5f5f5', 
      minHeight: '100vh', 
      py: 4 
    }}>
      <TodoList />
    </Box>
  );
}

export default App;