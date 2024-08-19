import React, { useState } from 'react';
import { Box, FormControl, InputLabel, MenuItem, Select, Typography, TextField, Autocomplete } from '@mui/material';
import Map from './index';

const DamageComponent = () => {
  const [year, setYear] = useState('');
  const [season, setSeason] = useState('');

  // Handles the change in the year dropdown
  const handleYearChange = (event: any) => {
    setYear(event.target.value);
    setSeason(''); // Reset season when year changes
  };

  // Handles the change in the season dropdown
  const handleSeasonChange = (event: any) => {
    setSeason(event.target.value);
  };

  // Array of year options
  const yearOptions = ['2022', '2023', '2024'];

  // Array of season options based on year
  const getSeasonOptions = (selectedYear: string) => {
    if (selectedYear === '2022') {
      return ['Rabi'];
    } else if (selectedYear === '2024') {
      return ['Kharif'];
    } else if (selectedYear === '2023') {
      return ['Kharif', 'Rabi'];
    }
    return [];
  };

  return (
    <Box sx={{ marginLeft: '15rem', padding: '10px', width: '60vw', flexWrap: 'wrap' }}>
      <Typography variant="h5" gutterBottom>
        Bhadras Component
      </Typography>
      <Box sx={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
        {/* Select Year */}
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel id="year-select-label">Select Year</InputLabel>
          <Select
            labelId="year-select-label"
            id="year-select"
            value={year}
            onChange={handleYearChange}
            sx={{ marginTop: '10px' }}
          >
            <MenuItem value="">
              <em>Select a year</em>
            </MenuItem>
            {yearOptions.map((year) => (
              <MenuItem key={year} value={year}>
                {year}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Select Season */}
        <FormControl sx={{ minWidth: 200 }} disabled={!year}>
          <InputLabel id="season-select-label">Select Season</InputLabel>
          <Select
            labelId="season-select-label"
            id="season-select"
            value={season}
            onChange={handleSeasonChange}
            sx={{ marginTop: '10px' }}
          >
            <MenuItem value="">
              <em>Select a season</em>
            </MenuItem>
            {getSeasonOptions(year).map((seasonOption) => (
              <MenuItem key={seasonOption} value={seasonOption}>
                {seasonOption}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      {/* Load Map component only if both year and season are selected */}
      {year && season && (
        <Box sx={{ marginTop: '20px' }}>
          <Map year={year} season={season} />
        </Box>
      )}
    </Box>
  );
};

export default DamageComponent;
