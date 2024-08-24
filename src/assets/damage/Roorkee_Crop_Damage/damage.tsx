import React, { useState } from 'react';
import { Box, Typography, TextField } from '@mui/material';
import Map from './index';

const Roorkee_Crop_Damage_Component = () => {
  const [damagedArea, setDamagedArea] = useState('');
  const [percentageDamage, setPercentageDamage] = useState('');
  const [reimbursement, setReimbursement] = useState('');

  // Handles the change in the damaged area field
  
  return (
    <Box sx={{ marginLeft: '15rem', padding: '10px', width: '60vw', flexWrap: 'wrap' }}>
      <Typography variant="h5" gutterBottom>
        Damage  Component For Roorkee Fields (March 2024 - Hailstone)
      </Typography>
     

      {/* Map component always renders */}
      <Box sx={{ marginTop: '20px' }}>
        <Map
          damagedArea={damagedArea}
          percentageDamage={percentageDamage}
          reimbursement={reimbursement}
        />
      </Box>
    </Box>
  );
};

export default Roorkee_Crop_Damage_Component;
