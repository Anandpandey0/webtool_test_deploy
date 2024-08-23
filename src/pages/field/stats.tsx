import React, { useState, useEffect } from 'react';
import { Box, TextField, Button, Typography, CircularProgress } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useRouter } from 'next/router';
import ChartDisplay from './ChartDisplay'; 
import Map from './index'

const SurveyStatsPage = () => {
  const router = useRouter();
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [selectedField, setSelectedField] = useState<any>(null);
  const [showGraph, setShowGraph] = useState(false);
  const [graphData, setGraphData] = useState<any>(null);
  const [coordinates, setCoordinates] = useState<any>([]);
  const [centroid, setCentroid] = useState<[number, number] | null>(null);
  const [loading, setLoading] = useState(false); // Loading state
  const [apiResponse,setApiResponse] = useState();

  useEffect(() => {
    const fieldData = localStorage.getItem('selectedField');

    if (router.isReady) {
      const { centroid: centroidParams } = router.query;

      if (centroidParams) {
        const centroidArray = Array.isArray(centroidParams) 
          ? centroidParams.map(Number) 
          : [Number(centroidParams)];

        if (centroidArray.length === 2) {
          setCentroid([centroidArray[0], centroidArray[1]]);
        }
      }
      
      if (fieldData) {
        const field = JSON.parse(fieldData);
        setCoordinates(field.mapDrawing?.geometry?.coordinates);
        setSelectedField(field);
      } else {
        console.log("No data found for 'selectedField'");
      }
    }
  }, [router.isReady, router.query]);

  const handleViewStats = async () => {
    try {
      setLoading(true); // Start loading
      const formData = new FormData();
      formData.append('coordinates', JSON.stringify(coordinates[0]));
      formData.append('start_date', startDate);
      formData.append('end_date', endDate);

      const response = await fetch('http://127.0.0.1:5025/query', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to fetch statistics');
      }

      const data = await response.json();
      setApiResponse(data)
      console.log(data.stat_api.Date);

      setShowGraph(true);
      setGraphData(data.stat_api); // Set the graph data for Recharts
    } catch (error) {
      console.error('Error fetching statistics:', error);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
      <div style={{ width: '300px', padding: '20px', backgroundColor: '#f8f9fa' }}>
        <button className='flex align-center gap-2' onClick={() => router.push('/')}><ArrowBackIcon />Back</button>
        <Typography variant="h6" gutterBottom>
          {selectedField?.name || 'Field Name'}
        </Typography>
        <Box mb={2}>
          <Typography variant="body1">Bhoomiscore: 97</Typography>
        </Box>
        <Box mb={2}>
          <TextField
            label="Start Date"
            type="date"
            fullWidth
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Box>
        <Box mb={2}>
          <TextField
            label="End Date"
            type="date"
            fullWidth
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Box>
        <Box>
          <Button variant="contained" color="primary" fullWidth onClick={handleViewStats} disabled={loading}>
            {loading ? 'Loading...' : 'View Stats'}
          </Button>
        </Box>
      </div>

      <div style={{ flex: 1, position: 'relative', display: 'flex', flexDirection: 'column' }}>
        <div className="map_container">
          {/* Map component */}
          <Map fieldDetails={selectedField} centroids={centroid} apiResponse={apiResponse}/>
        </div>
        <div
          style={{
            flex: showGraph ? 1 : 0,
            overflow: 'hidden',
            transition: 'flex 1s ease',
            backgroundColor: '#ffffff',
            padding: showGraph ? '20px' : '0px',
            opacity: showGraph ? 1 : 0,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {loading ? (
            <CircularProgress />
          ) : (
            showGraph && graphData && (
              <ChartDisplay graphData={graphData} />
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default SurveyStatsPage;
