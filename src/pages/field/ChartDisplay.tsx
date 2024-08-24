import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts';
import { Typography, FormGroup, FormControlLabel, Checkbox } from '@mui/material';
import styles from './ChartDisplay.module.css';

interface ChartDisplayProps {
  graphData: {
    Date: string[];
    "Mean GCI": number[];
    "Mean NDMI": number[];
    "Mean NDVI": number[];
  };
}

const ChartDisplay: React.FC<ChartDisplayProps> = ({ graphData }) => {
  const [showGCI, setShowGCI] = useState(true);
  const [showNDMI, setShowNDMI] = useState(false);
  const [showNDVI, setShowNDVI] = useState(false);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    if (name === 'GCI') setShowGCI(checked);
    if (name === 'NDMI') setShowNDMI(checked);
    if (name === 'NDVI') setShowNDVI(checked);
  };

  const data = graphData.Date.map((date, index) => ({
    name: date,
    "Mean GCI": graphData["Mean GCI"][index],
    "Moisture": graphData["Mean NDMI"][index],
    "Mean NDVI": graphData["Mean NDVI"][index],
  }));

  return (
    <div className={styles.lineWrapper}>
      <div className={styles.chartHeader}>
        <Typography variant="h6" gutterBottom>
          Statistics Graph
        </Typography>
      </div>

      <FormGroup row>
        <FormControlLabel
          control={<Checkbox checked={showGCI} onChange={handleCheckboxChange} name="GCI" />}
          label="Chlorophyll"
        />
        <FormControlLabel
          control={<Checkbox checked={showNDMI} onChange={handleCheckboxChange} name="NDMI" />}
          label="Moisture"
        />
        <FormControlLabel
          control={<Checkbox checked={showNDVI} onChange={handleCheckboxChange} name="NDVI" />}
          label="Greeness"
        />
      </FormGroup>

      <div style={{ height: '30vh', width: '100%' }}>
        <LineChart
          width={900} // Increase the width to make the graph larger
          height={300} // Increase the height, adjust this based on the 30vh requirement
          data={data}
          margin={{ top: 20, right: 100, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="name"
            angle={-40}
            textAnchor="end"
            height={60}
            interval={0}
            tick={{ fontSize: 12 }}
          />
          <YAxis />
          <Tooltip 
            position={{ x: 650, y: 0 }} // Adjust this if needed
            contentStyle={{ backgroundColor: '#f5f5f5', borderColor: '#ccc' }} 
          />
          <Legend />
          {showGCI && (
            <Line
              type="monotone"
              dataKey="Mean GCI"
              stroke="#8884d8"
              strokeWidth={2}
              dot={{ r: 1 }}
            />
          )}
          {showNDMI && (
            <Line
              type="monotone"
              dataKey="Mean NDMI"
              stroke="#82ca9d"
              strokeWidth={2}
              dot={{ r: 1 }}
            />
          )}
          {showNDVI && (
            <Line
              type="monotone"
              dataKey="Mean NDVI"
              stroke="#ffc658"
              strokeWidth={2}
              dot={{ r: 1 }}
            />
          )}
        </LineChart>
      </div>
    </div>
  );
};

export default ChartDisplay;
