import React, { useState } from 'react';
import { Box, Typography, Select, MenuItem, FormControl, InputLabel, Paper } from '@mui/material';
import Roorkee_Crop_Damage_Component from '../Roorkee_Crop_Damage/damage';
import Roorkee_Village_Crop_Damage_Component from '../Roorkee_Village_Crop_Damage/damage';
import Saharanpur_Village_Crop_Damage from '../Saharanpur_Village_Crop_Damage/damage';

const Parent = () => {
  const [selectedComponent, setSelectedComponent] = useState('');

  const renderComponent = () => {
    switch (selectedComponent) {
      case 'RoorkeeCropDamage':
        return <Roorkee_Crop_Damage_Component />;
      case 'RoorkeeVillageCropDamage':
        return <Roorkee_Village_Crop_Damage_Component />;
      case 'SaharanpurVillageCropDamage':
        return <Saharanpur_Village_Crop_Damage />;
      default:
        return null; // No component is rendered by default
    }
  };

  return (
    <Box sx={{ padding: '10px', maxWidth: '90%', margin: 'auto' }}>
      <Paper elevation={3} sx={{ padding: '10px', marginBottom: '10px' }}>
        <Typography variant="h6" gutterBottom>
          Select a Damage Component
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
            <MenuItem value="RoorkeeCropDamage">Roorkee Crop Damage</MenuItem>
            <MenuItem value="RoorkeeVillageCropDamage">Roorkee Village Crop Damage</MenuItem>
            <MenuItem value="SaharanpurVillageCropDamage">Saharanpur Village Crop Damage</MenuItem>
          </Select>
        </FormControl>
        {selectedComponent ? (
          <Box sx={{ width: '100%', height: '80vh' }}>
            {renderComponent()}
          </Box>
        ) : (
          <Typography variant="body1" color="textSecondary">
            Please select a component to render.
          </Typography>
        )}
      </Paper>
    </Box>
  );
};

export default Parent;
