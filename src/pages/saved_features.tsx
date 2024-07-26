import React from 'react';
import { Box, Typography, Button, Paper, TextField, Select, MenuItem, FormControl, InputLabel, IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import SearchIcon from '@mui/icons-material/Search';
import UpgradeIcon from '@mui/icons-material/Upgrade';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const Sidebar = styled(Box)(({ theme }) => ({
  width: '280px',
  backgroundColor: theme.palette.background.paper,
  height: '100vh',
  display: 'flex',
  flexDirection: 'column',
  padding: theme.spacing(2),
  boxShadow: theme.shadows[2],
}));

const FilterContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(2),
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[2],
}));

const Content = styled(Box)(({ theme }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  height: '100vh',
  overflowY: 'auto',
  position: 'relative',
}));

const MapContainer = styled(Box)(({ theme }) => ({
  height: 'calc(100vh - 200px)', // Adjust the height as needed
  overflow: 'hidden',
  position: 'relative',
}));

const mapContainerStyle = {
  width: '100%',
  height: '100%',
};

const center = {
  lat: 29.8649,
  lng: 77.8969,
};

const Saved_Features: React.FC = () => {
  return (
    <Box display="flex" sx={{ backgroundColor: 'gray' }}>
      <Sidebar sx={{ width: '50rem' }}>
        <Typography variant="h6" gutterBottom>
          Crop Insurances
        </Typography>
        <Button variant="outlined" color="primary" startIcon={<AddCircleIcon />}>
          Add Crop for Insurance
        </Button>
        <Box mt={2}>
          <Paper variant="outlined" style={{ padding: '16px', marginBottom: '16px' }}>
            <Typography variant="body2" color="textSecondary">
              Crop Name
            </Typography>
            <Typography variant="h6">
              320 ha | Field Name
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Proposal Number: DIGI2024-53923
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Uttarakhand | Pin Code: 2011234
            </Typography>
            <Button variant="contained" color="success" fullWidth style={{ marginTop: '16px' }}>
              Requested
            </Button>
            <Button variant="outlined" color="primary" fullWidth style={{ marginTop: '8px' }}>
              Continue Insurance
            </Button>
          </Paper>
          {/* Add more insurance cards as needed */}
        </Box>
      </Sidebar>
      <Box flexGrow={1}>
        <FilterContainer>
          <FormControl variant="outlined" style={{ marginRight: '16px', minWidth: '150px' }}>
            <InputLabel>State</InputLabel>
            <Select label="State">
              <MenuItem value=""><em>None</em></MenuItem>
              <MenuItem value={10}>State 1</MenuItem>
              <MenuItem value={20}>State 2</MenuItem>
            </Select>
          </FormControl>
          <FormControl variant="outlined" style={{ marginRight: '16px', minWidth: '150px' }}>
            <InputLabel>Select Level</InputLabel>
            <Select label="Select Level">
              <MenuItem value=""><em>None</em></MenuItem>
              <MenuItem value={10}>Level 1</MenuItem>
              <MenuItem value={20}>Level 2</MenuItem>
            </Select>
          </FormControl>
          <FormControl variant="outlined" style={{ marginRight: '16px', minWidth: '150px' }}>
            <InputLabel>District/Village</InputLabel>
            <Select label="District/Village">
              <MenuItem value=""><em>None</em></MenuItem>
              <MenuItem value={10}>Village 1</MenuItem>
              <MenuItem value={20}>Village 2</MenuItem>
            </Select>
          </FormControl>
          <TextField variant="outlined" label="Select Area" style={{ marginRight: '16px' }} />
          <IconButton color="primary" aria-label="search">
            <SearchIcon />
          </IconButton>
        </FilterContainer>
        <Content>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            <Box display="flex">
              <Button variant="contained" color="primary" style={{ marginRight: '16px' }}>
                Greenness
              </Button>
              <Button variant="contained" color="primary" style={{ marginRight: '16px' }}>
                Humidity
              </Button>
            </Box>
            <Button variant="outlined" color="primary" startIcon={<UpgradeIcon />}>
              Upgrade Plan
            </Button>
          </Box>
          <MapContainer>
            <LoadScript googleMapsApiKey="AIzaSyA5sYadpLcoOTM2irEsfD4HdA0SyE-n5Eg">
              <GoogleMap mapContainerStyle={mapContainerStyle} center={center} zoom={15}>
                <Marker position={center} />
              </GoogleMap>
            </LoadScript>
          </MapContainer>
          <Button variant="contained" color="primary" fullWidth style={{ marginTop: '16px' }}>
            View Graphs
          </Button>
        </Content>
      </Box>
    </Box>
  );
};

export default Saved_Features;
