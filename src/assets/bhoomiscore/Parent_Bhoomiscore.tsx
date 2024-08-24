import React, { useState } from 'react';
import { Box, Typography, Select, MenuItem, FormControl, InputLabel, Paper } from '@mui/material';
import Bhadras_Bhooscore_Component from './bhadras/Bhadras_Bhooscore_Component';
import Roorkee_Bhooscore_Component from './roorkee/Roorkee_Bhooscore_Component';


const Parent_Bhoomiscore = () => {
  const [selectedComponent, setSelectedComponent] = useState('');

  const renderComponent = () => {
    switch (selectedComponent) {
      case 'Bhadras':
        return <Bhadras_Bhooscore_Component />;
      case 'Roorkee':
        return <Roorkee_Bhooscore_Component />;
      default:
        return null; // No component is rendered by default
    }
  };

  return (
    <Box sx={{ padding: '10px', maxWidth: '90%', margin: 'auto' }}>
      <Paper elevation={3} sx={{ padding: '10px', marginBottom: '10px' }}>
        <Typography variant="h6" gutterBottom>
          Select a Area to see Bhoomiscore
        </Typography>
        <FormControl fullWidth variant="outlined" sx={{ marginBottom: '10px' }}>
          <InputLabel>Select Component</InputLabel>
          <Select
            value={selectedComponent}
            onChange={(e) => setSelectedComponent(e.target.value)}
            label="Select Component"
          >
            <MenuItem value="">
              <em>Choose an option</em>
            </MenuItem>
            <MenuItem value="Bhadras">Bhadras</MenuItem>
            <MenuItem value="Roorkee">Roorkee</MenuItem>
          </Select>
        </FormControl>
        {selectedComponent ? (
          <Box sx={{ width: '100%', height: '90vh' }}>
            {renderComponent()}
          </Box>
        ) : (
          <Typography variant="body1" color="textSecondary">
            Please select a area to render.
          </Typography>
        )}
      </Paper>
    </Box>
  );
};

export default Parent_Bhoomiscore;
