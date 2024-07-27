import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Select, MenuItem, FormControl, InputLabel, SelectChangeEvent } from '@mui/material';

interface FarmDetail {
  TEHSIL: string;
  DISTRICT: string;
  STATE: string;
  VILLAGE: string;
  AREA: number;
  ID: number;
  '2019_Rabi': number;
  '2020_Kharif': number;
  '2020_Rabi': number;
  '2021_Kharif': number;
  '2021_Rabi': number;
  '2022_Kharif': number;
  '2022_Rabi': number;
  '2023_Kharif': number;
  '2023_Rabi': number;
}

interface Props {
  data: FarmDetail[];
}

const FarmDetailsTable: React.FC<Props> = ({ data }) => {
  const [stateFilter, setStateFilter] = useState('');
  const [districtFilter, setDistrictFilter] = useState('');
  const [villageFilter, setVillageFilter] = useState('');
  const [yearSeasonFilter, setYearSeasonFilter] = useState('');

  const handleStateChange = (event: SelectChangeEvent<string>) => {
    setStateFilter(event.target.value);
    setDistrictFilter(''); // Reset district filter when state changes
    setVillageFilter(''); // Reset village filter when state changes
  };

  const handleDistrictChange = (event: SelectChangeEvent<string>) => {
    setDistrictFilter(event.target.value);
    setVillageFilter(''); // Reset village filter when district changes
  };

  const handleVillageChange = (event: SelectChangeEvent<string>) => {
    setVillageFilter(event.target.value);
  };

  const handleYearSeasonChange = (event: SelectChangeEvent<string>) => {
    setYearSeasonFilter(event.target.value);
  };


  const filteredData = data.filter((row) => {
    return (
      (!stateFilter || row.STATE === stateFilter) &&
      (!districtFilter || row.DISTRICT === districtFilter) &&
      (!villageFilter || row.VILLAGE === villageFilter) &&
      (!yearSeasonFilter || Object.keys(row).includes(yearSeasonFilter))
    );
  });

  const uniqueStates = Array.from(new Set(data.map((item) => item.STATE)));
  const uniqueDistricts = Array.from(new Set(data.filter((item) => item.STATE === stateFilter).map((item) => item.DISTRICT)));
  const uniqueVillages = Array.from(new Set(data.filter((item) => item.DISTRICT === districtFilter).map((item) => item.VILLAGE)));
  const yearSeasons = [
    '2019_Rabi',
    '2020_Kharif',
    '2020_Rabi',
    '2021_Kharif',
    '2021_Rabi',
    '2022_Kharif',
    '2022_Rabi',
    '2023_Kharif',
    '2023_Rabi',
  ];

  return (
    <>
      <div style={{ display: 'flex',gap:'5rem',marginLeft:'5rem', marginBottom: '1rem', paddingTop:'2rem' }}>
        <FormControl variant="outlined" sx={{ minWidth: 120 }}>
          <InputLabel>State</InputLabel>
          <Select value={stateFilter} onChange={handleStateChange} label="State">
            <MenuItem value="">
              <em>All</em>
            </MenuItem>
            {uniqueStates.map((state) => (
              <MenuItem key={state} value={state}>
                {state}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl variant="outlined" sx={{ minWidth: 120 }} disabled={!stateFilter}>
          <InputLabel>District</InputLabel>
          <Select value={districtFilter} onChange={handleDistrictChange} label="District">
            <MenuItem value="">
              <em>All</em>
            </MenuItem>
            {uniqueDistricts.map((district) => (
              <MenuItem key={district} value={district}>
                {district}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl variant="outlined" sx={{ minWidth: 120 }} disabled={!districtFilter}>
          <InputLabel>Village</InputLabel>
          <Select value={villageFilter} onChange={handleVillageChange} label="Village">
            <MenuItem value="">
              <em>All</em>
            </MenuItem>
            {uniqueVillages.map((village) => (
              <MenuItem key={village} value={village}>
                {village}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl variant="outlined" sx={{ minWidth: 120 }} disabled={!villageFilter}>
          <InputLabel>Year/Season</InputLabel>
          <Select value={yearSeasonFilter} onChange={handleYearSeasonChange} label="Year/Season">
            <MenuItem value="">
              <em>All</em>
            </MenuItem>
            {yearSeasons.map((yearSeason) => (
              <MenuItem key={yearSeason} value={yearSeason}>
                {yearSeason}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>

      {stateFilter && districtFilter && villageFilter && (
        <TableContainer component={Paper} sx={{ width: '80vw', height: '100vh', overflow: 'scroll', margin: 'auto', border: 'solid 2px black' }}>
          <Table className="min-w-full" aria-label="farm details table">
            <TableHead sx={{ position: 'sticky', top: '0', backgroundColor: 'white', zIndex: 1 }}>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold', backgroundColor: 'white' }}>Tehsil</TableCell>
                <TableCell sx={{ fontWeight: 'bold', backgroundColor: 'white' }}>District</TableCell>
                <TableCell sx={{ fontWeight: 'bold', backgroundColor: 'white' }}>State</TableCell>
                <TableCell sx={{ fontWeight: 'bold', backgroundColor: 'white' }}>Village</TableCell>
                <TableCell sx={{ fontWeight: 'bold', backgroundColor: 'white' }}>Area</TableCell>
                <TableCell sx={{ fontWeight: 'bold', backgroundColor: 'white' }}>ID</TableCell>
                <TableCell sx={{ fontWeight: 'bold', backgroundColor: 'white' }}>2019 Rabi</TableCell>
                <TableCell sx={{ fontWeight: 'bold', backgroundColor: 'white' }}>2020 Kharif</TableCell>
                <TableCell sx={{ fontWeight: 'bold', backgroundColor: 'white' }}>2020 Rabi</TableCell>
                <TableCell sx={{ fontWeight: 'bold', backgroundColor: 'white' }}>2021 Kharif</TableCell>
                <TableCell sx={{ fontWeight: 'bold', backgroundColor: 'white' }}>2021 Rabi</TableCell>
                <TableCell sx={{ fontWeight: 'bold', backgroundColor: 'white' }}>2022 Kharif</TableCell>
                <TableCell sx={{ fontWeight: 'bold', backgroundColor: 'white' }}>2022 Rabi</TableCell>
                <TableCell sx={{ fontWeight: 'bold', backgroundColor: 'white' }}>2023 Kharif</TableCell>
                <TableCell sx={{ fontWeight: 'bold', backgroundColor: 'white' }}>2023 Rabi</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredData.map((row) => (
                <TableRow key={row.ID}>
                  <TableCell>{row.TEHSIL}</TableCell>
                  <TableCell>{row.DISTRICT}</TableCell>
                  <TableCell>{row.STATE}</TableCell>
                  <TableCell>{row.VILLAGE}</TableCell>
                  <TableCell>{row.AREA}</TableCell>
                  <TableCell>{row.ID}</TableCell>
                  <TableCell>{row['2019_Rabi']}</TableCell>
                  <TableCell>{row['2020_Kharif']}</TableCell>
                  <TableCell>{row['2020_Rabi']}</TableCell>
                  <TableCell>{row['2021_Kharif']}</TableCell>
                  <TableCell>{row['2021_Rabi']}</TableCell>
                  <TableCell>{row['2022_Kharif']}</TableCell>
                  <TableCell>{row['2022_Rabi']}</TableCell>
                  <TableCell>{row['2023_Kharif']}</TableCell>
                  <TableCell>{row['2023_Rabi']}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </>
  );
};

export default FarmDetailsTable;
