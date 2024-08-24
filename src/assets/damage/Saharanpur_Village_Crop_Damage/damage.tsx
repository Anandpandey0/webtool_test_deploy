import React, { useState } from 'react';
import { Box, Typography, TextField } from '@mui/material';
import Map from './index';

const Saharanpur_Village_Crop_Damage = () => {
  

  return (
    <Box sx={{ marginLeft: '15rem', padding: '10px', width: '60vw', flexWrap: 'wrap' }}>
      <Typography variant="h5" gutterBottom>
       Saharanpur Village Crop Damage (March 2024 - Hailstone)
      </Typography>
      
      {/* Map component always renders */}
      <Box sx={{ marginTop: '20px' }}>
        <Map
        />
      </Box>
    </Box>
  );
};

export default Saharanpur_Village_Crop_Damage;
