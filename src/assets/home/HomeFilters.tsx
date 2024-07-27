import React, { useState } from 'react';
import { Box, FormControl, InputLabel, MenuItem, Select, Avatar, Typography, TextField, Autocomplete } from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';
import Map from './map';

const View = () => {

    
    
    const [selectedState, setSelectedState] = useState('Uttarakhand');
    const [selectedLevel, setSelectedLevel] = useState('district');
    const [selectedMonthYear, setSelectedMonthYear] = useState('January 2023');
  
    // Function to handle state change
    const handleStateChange = (event:any) => {
      setSelectedState(event.target.value);
      setSelectedLevel('district'); // Reset level to 'district' on state change
    };
  
    // Function to handle level change
    const handleLevelChange = (event:any) => {
      setSelectedLevel(event.target.value);
    };
  
    // Function to handle month-year change
    const handleMonthYearChange = (event:any, value:any) => {
      setSelectedMonthYear(value);
    };
  
    // Function to format month-year as needed
    const formatMonthYear = (monthYear:any) => {
      const [selectedMonth, selectedYear] = monthYear.split(' ');
      return `${selectedYear}-${(new Date(Date.parse(selectedMonth + " 1, " + selectedYear)).getMonth() + 1).toString().padStart(2, '0')}`;
    };
  
    // Array of month-year options from January 2023 to May 2024
    const monthYearOptions = [
      'January 2023', 'February 2023', 'March 2023', 'April 2023', 'May 2023',
      'June 2023', 'July 2023', 'August 2023', 'September 2023', 'October 2023', 'November 2023', 'December 2023',
      'January 2024', 'February 2024', 'March 2024', 'April 2024', 'May 2024'
    ];
  
    return (
      <div style={{marginLeft:"15rem"}}>
        <div style={{ padding: "10px", display: 'flex', gap: '10px' , width:'60vw' , flexWrap:'wrap' }}>
          {/* Select State */}
          <FormControl style={{ minWidth: 200 }}>
            <InputLabel id="state-select-label">Select State</InputLabel>
            <Select
              style={{marginTop:"10px"}}
              labelId="state-select-label"
              id="state-select"
              value={selectedState}
              onChange={handleStateChange}
            >
              <MenuItem value="Uttarakhand">Uttarakhand</MenuItem>
              <MenuItem value="UttarPradesh">Uttar Pradesh</MenuItem>
            </Select>
          </FormControl>
  
          {/* Select Level */}
          <FormControl style={{ minWidth: 200 }}>
            <InputLabel id="level-select-label">Select Level</InputLabel>
            <Select
              labelId="level-select-label"
              style={{marginTop:"10px"}}
              id="level-select"
              value={selectedLevel}
              onChange={handleLevelChange}
            >
              <MenuItem value="district">District</MenuItem>
              <MenuItem value="tehsil">Tehsil</MenuItem>
              <MenuItem value="village">Village</MenuItem>
            </Select>
          </FormControl>
  
          {/* Select Month and Year */}
          <Autocomplete
            id="month-year-autocomplete"
            options={monthYearOptions}
            value={selectedMonthYear}
            onChange={handleMonthYearChange}
            renderInput={(params) => <TextField {...params} label="Select Month and Year" style={{marginTop:'10px'}} variant="outlined" />}
            style={{ minWidth: 200 }}
          />
        </div>
  
        {/* Render the map component */}
        <Map
          selectedState={selectedState}
          selectedLevel={selectedLevel}
          selectedMonthYear={selectedMonthYear}
          formattedMonthYear={formatMonthYear(selectedMonthYear)}
        />
      </div>
    );
  };
  
  export default View;
  