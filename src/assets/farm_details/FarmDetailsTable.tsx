import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

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
  return (
    <TableContainer component={Paper} sx={{
      width: '80vw',
      height: '100vh',
      overflow: 'scroll',
      margin: '2.5rem',
      border: 'solid 2px black'
    }}>
      <Table className="min-w-full" aria-label="farm details table">
        <TableHead sx={{
          position: 'sticky',
          top: '0',
          backgroundColor: 'white',
          zIndex: 1
        }}>
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
          {data.map((row) => (
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
  );
};

export default FarmDetailsTable;
