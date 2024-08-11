import React from 'react';
import { Container, Box } from '@mui/material';
import AutocompleteComponent from './AutocompleteComponent';
import Map from './map';


const ParentMap: React.FC = () => {
  return (
    <Container>
      <Box my={4}>
        <AutocompleteComponent />
        <Map />
      </Box>
    </Container>
  );
};

export default ParentMap;
