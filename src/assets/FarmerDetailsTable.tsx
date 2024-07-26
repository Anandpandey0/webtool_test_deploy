import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, FormControl, TextField } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import { styled } from '@mui/material/styles';

const LocationDB = [
  "Bhagwanpur",
  "Dhandera",
  "Mukliali Dundi",
  "Nagla Koyal",
  "Pirpura",
  "Shikarpur",
  "Talheri",
  "Zainpur Jhanjheri",
];

interface FarmerDetail {
  farm_id: number;
  '2019_Rabi': number;
  '2020_Rabi': number;
  '2021_Rabi': number;
  '2018_Rabi': number;
  '2022_Rabi': number;
  '2019_Kharib': number;
  '2020_Kharib': number;
  '2021_Kharib': number;
  '2022_Kharib': number;
  '2023_Rabi': number;
  '2023_Kharib': number;
  Name: string;
  Age: number;
  Sex: string;
  Area: number;
  crop_1_rabi: string;
  value_1_rabi: number;
  crop_2_rabi: string;
  value_2_rabi: number;
  crop_3_rabi: string;
  value_3_rabi: number;
  crop_1_kharif: string;
  value_1_kharif: number;
  crop_2_kharif: string;
  value_2_kharif: number;
  crop_3_kharif: string;
  value_3_kharif: number;
  Village: string;
  Kharif_soil: number;
  Rabi_Soil: number;
  Current_rabi: string;
  Current_Kharif: string;
  bhoomiscore: any;
}

interface Props {
  data: FarmerDetail[];
}

const StyledTableContainer = styled(TableContainer)({
  maxHeight: '100vh',
});

const FarmerDetailsTable: React.FC<Props> = ({ data }) => {
  const [season, setSeason] = useState<string | null>(null);
  const [location, setLocation] = useState<string | null>(null);
  const [rows, setRows] = useState<FarmerDetail[]>([]);

  const handleSeasonChange = (event: any, value: string | null) => {
    setSeason(value);

    if (value && location) {
      const seasonSpell = value === "Rabi" ? "Rabi" : "Kharib";
      const filteredData = data.filter((i) => i.Village === location);

      const updatedRows = filteredData.map((i) => {
        const bhoomiscore = Math.floor(Math.random() * 10) + 1;

        return {
          farm_id: i.farm_id,
          '2019_Rabi': i['2019_Rabi'],
          '2020_Rabi': i['2020_Rabi'],
          '2021_Rabi': i['2021_Rabi'],
          '2018_Rabi': i['2018_Rabi'],
          '2022_Rabi': i['2022_Rabi'],
          '2019_Kharib': i['2019_Kharib'],
          '2020_Kharib': i['2020_Kharib'],
          '2021_Kharib': i['2021_Kharib'],
          '2022_Kharib': i['2022_Kharib'],
          '2023_Rabi': i['2023_Rabi'],
          '2023_Kharib': i['2023_Kharib'],
          Name: i.Name,
          Age: i.Age,
          Sex: i.Sex,
          Area: i.Area,
          crop_1_rabi: i.crop_1_rabi,
          value_1_rabi: i.value_1_rabi,
          crop_2_rabi: i.crop_2_rabi,
          value_2_rabi: i.value_2_rabi,
          crop_3_rabi: i.crop_3_rabi,
          value_3_rabi: i.value_3_rabi,
          crop_1_kharif: i.crop_1_kharif,
          value_1_kharif: i.value_1_kharif,
          crop_2_kharif: i.crop_2_kharif,
          value_2_kharif: i.value_2_kharif,
          crop_3_kharif: i.crop_3_kharif,
          value_3_kharif: i.value_3_kharif,
          Village: i.Village,
          Kharif_soil: i.Kharif_soil,
          Rabi_Soil: i.Rabi_Soil,
          Current_rabi: i.Current_rabi,
          Current_Kharif: i.Current_Kharif,
          bhoomiscore: `${bhoomiscore}/10`,
        };
      });

      setRows(updatedRows);
    }
  };

  const handleLocationChange = (event: any, value: string | null) => {
    setLocation(value);
    setSeason(null);
    setRows([]);
  };

  return (
    <div style={{overflow:"hidden"}}>
      <div style={{ display: 'flex', marginBottom: '10px' ,marginTop:"5rem"}}>
        <FormControl style={{ marginRight: '10px', width: '25vh' }}>
          <Autocomplete
            id="location-autocomplete"
            options={LocationDB}
            value={location}
            onChange={handleLocationChange}
            renderInput={(params) => <TextField {...params} label="Location" />}
          />
        </FormControl>
        <FormControl style={{ marginRight: '10px', width: '25vh' }}>
          <Autocomplete
            id="season-autocomplete"
            options={["Kharif", "Rabi"]}
            value={season}
            onChange={handleSeasonChange}
            renderInput={(params) => <TextField {...params} label="Season" />}
            disabled={!location}
          />
        </FormControl>
      </div>

      <StyledTableContainer >
        <Paper>

        <Table stickyHeader sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Farmers</TableCell>
              <TableCell align="right">Village</TableCell>
              <TableCell align="right">Farm Area</TableCell>
              <TableCell align="right">Current Crop</TableCell>
              <TableCell align="right">Bhoomiscore ({season})</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.farm_id}>
                <TableCell component="th" scope="row">
                  {row.Name}
                </TableCell>
                <TableCell align="right">{row.Village}</TableCell>
                <TableCell align="right">{row.Area}</TableCell>
                <TableCell align="right">{season === 'Rabi' ? row.Current_rabi : row.Current_Kharif}</TableCell>
                <TableCell align="right">{row.bhoomiscore}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
            </Paper>
      </StyledTableContainer>
    </div>
  );
};

export default FarmerDetailsTable;
