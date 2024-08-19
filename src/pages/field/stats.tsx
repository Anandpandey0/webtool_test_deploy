// import React, { useState, useEffect, useRef, useMemo } from 'react';
// import Map, { MapRef } from 'react-map-gl';
// import mapboxgl from 'mapbox-gl';
// import 'mapbox-gl/dist/mapbox-gl.css';
// import { Box, TextField, Button, Typography } from '@mui/material';
// import { Line } from 'react-chartjs-2';
// import ArrowBackIcon from '@mui/icons-material/ArrowBack';
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend,
// } from 'chart.js';
// import { useRouter } from 'next/router';

// // Registering chart components
// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend
// );

// mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN!;

// const SurveyStatsPage = () => {
//   const router = useRouter()
//   const mapRef = useRef<MapRef | null>(null);
//   const [startDate, setStartDate] = useState('');
//   const [endDate, setEndDate] = useState('');
//   const [selectedField, setSelectedField] = useState<any>(null);
//   const [showGraph, setShowGraph] = useState(false);

//   const coordinates = useMemo(() => {
//     return selectedField?.mapDrawing?.geometry?.coordinates || [[[78.078743, 27.891535]]];
//   }, [selectedField]);

//   useEffect(() => {
//     const fieldData = localStorage.getItem('selectedField');
//     if (fieldData) {
//       setSelectedField(JSON.parse(fieldData));
//     }
//   }, []);

//   const bhoomiScore = 97;

//   useEffect(() => {
//     if (mapRef.current && selectedField) {
//       const map = mapRef.current.getMap();

//       map.on('load', () => {
//         map.addSource('selected-field', {
//           type: 'geojson',
//           data: selectedField.mapDrawing,
//         });

//         map.addLayer({
//           id: 'selected-field-fill',
//           type: 'fill',
//           source: 'selected-field',
//           layout: {},
//           paint: {
//             'fill-color': '#87CEEB',
//             'fill-opacity': 0.4,
//           },
//         });

//         map.addLayer({
//           id: 'selected-field-border',
//           type: 'line',
//           source: 'selected-field',
//           layout: {},
//           paint: {
//             'line-color': '#000000',
//             'line-width': 2,
//           },
//         });

//         const bounds = new mapboxgl.LngLatBounds();
//         coordinates[0].forEach((coord: [number, number]) => bounds.extend(coord));
//         map.fitBounds(bounds, { padding: 20 });
//       });
//     }
//   }, [coordinates, selectedField]);

//   const handleViewStats = () => {
//     if (mapRef.current) {
//       const map = mapRef.current.getMap();
//       map.flyTo({
//         zoom: 6,
//         speed: 1.2,
//         curve: 1,
//         easing: (t) => t,
//         essential: true,
//       });
//     }
//     setShowGraph(true); // Show graph when "View Stats" is clicked
//   };

//   // Data for the graph (hardcoded as per your request)
//   const graphData = {
//     labels: ['2024-03-14', '2024-03-19', '2024-03-29', '2024-04-08'],
//     datasets: [
//       {
//         label: 'Mean NDVI',
//         data: [0.549, 0.587, 0.442, 0.366],
//         borderColor: 'rgba(75, 192, 192, 1)',
//         backgroundColor: 'rgba(75, 192, 192, 0.2)',
//         fill: true,
//       },
//       {
//         label: 'Mean GCI',
//         data: [3.577, 5.623, 1.904, 1.868],
//         borderColor: 'rgba(153, 102, 255, 1)',
//         backgroundColor: 'rgba(153, 102, 255, 0.2)',
//         fill: true,
//       },
//       {
//         label: 'Mean NDMI',
//         data: [0.175, 0.175, 0.077, -0.008],
//         borderColor: 'rgba(255, 159, 64, 1)',
//         backgroundColor: 'rgba(255, 159, 64, 0.2)',
//         fill: true,
//       },
//     ],
//   };

//   const graphOptions = {
//     responsive: true,
//     maintainAspectRatio: false,
//     animation: {
//       duration: 1500, // Animation duration in ms
//       easing: 'easeInOutQuart', // Easing function for animation
//     },
//     scales: {
//       y: {
//         beginAtZero: true,
//       },
//     },
//   };

//   return (
//     <div style={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
//       <div style={{ width: '300px', padding: '20px', backgroundColor: '#f8f9fa' }}>
//       <button className='flex align-center gap-2' onClick={()=>router.push('/')}><ArrowBackIcon />Back</button>
//         <Typography variant="h6" gutterBottom>
//           {selectedField?.name || 'Field Name'}
//         </Typography>
//         <Box mb={2}>
//           <Typography variant="body1">Bhoomiscore: {bhoomiScore}</Typography>
//         </Box>
//         <Box mb={2}>
//           <TextField
//             label="Start Date"
//             type="date"
//             fullWidth
//             value={startDate}
//             onChange={(e) => setStartDate(e.target.value)}
//             InputLabelProps={{
//               shrink: true,
//             }}
//           />
//         </Box>
//         <Box mb={2}>
//           <TextField
//             label="End Date"
//             type="date"
//             fullWidth
//             value={endDate}
//             onChange={(e) => setEndDate(e.target.value)}
//             InputLabelProps={{
//               shrink: true,
//             }}
//           />
//         </Box>
//         <Box>
//           <Button variant="contained" color="primary" fullWidth onClick={handleViewStats}>
//             View Stats
//           </Button>
//         </Box>
//       </div>

//       <div style={{ flex: 1, position: 'relative', display: 'flex', flexDirection: 'column' }}>
//         <div
//           style={{
//             flex: showGraph ? 1 : 2,
//             transition: 'flex 1s ease',
//             overflow: 'hidden',
//           }}
//         >
//           <Map
//             ref={mapRef}
//             initialViewState={{
//               latitude: coordinates[0][0][1],
//               longitude: coordinates[0][0][0],
//               zoom: 12,
//             }}
//             mapStyle="mapbox://styles/mapbox/satellite-v9"
//             mapboxAccessToken={mapboxgl.accessToken}
//             style={{ width: '100%', height: '100%' }}
//           />
//         </div>

//         <div
//           style={{
//             flex: showGraph ? 1 : 0,
//             overflow: 'hidden',
//             transition: 'flex 1s ease',
//             backgroundColor: '#ffffff',
//             padding: showGraph ? '20px' : '0px',
//             opacity: showGraph ? 1 : 0,
//           }}
//         >
//           {showGraph && (
//             <>
//               <Typography variant="h6" gutterBottom>
//                 Statistics Graph
//               </Typography>
//               <Line data={graphData} options={graphOptions} />
//             </>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SurveyStatsPage;


import React from 'react'

const stats = () => {
  return (
    <div>stats</div>
  )
}

export default stats


