import React from 'react';
import List from './List';
import { Container, Typography } from '@mui/material';

const App: React.FC = () => {
  return (
      <Container maxWidth="sm">
        <Typography variant="h3" align="center" gutterBottom>
        </Typography>
        <List />
      </Container>
  );
};

export default App;
