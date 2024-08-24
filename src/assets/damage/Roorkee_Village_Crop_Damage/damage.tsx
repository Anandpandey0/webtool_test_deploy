import React, { useState } from 'react';
import { Box, Typography, TextField } from '@mui/material';
import Map from './index';

const Roorkee_Village_Crop_Damage_Component = () => {
  

  return (
    <Box sx={{ marginLeft: '15rem', padding: '10px', width: '60vw', flexWrap: 'wrap' }}>
      <Typography variant="h5" gutterBottom>
       Roorkee Village Crop Damage (March 2024 - Hailstone)
      </Typography>
      
      {/* Map component always renders */}
      <Box sx={{ marginTop: '20px' }}>
        <Map
        />
      </Box>
    </Box>
  );
};

export default Roorkee_Village_Crop_Damage_Component;
