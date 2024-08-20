import React from 'react';
import { Line } from 'react-chartjs-2';
import { Typography } from '@mui/material';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Registering Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale, 
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface ChartDisplayProps {
  graphData: any;
}

const ChartDisplay: React.FC<ChartDisplayProps> = ({ graphData }) => {
  const graphOptions = {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: 1500,
      easing: 'easeInOutQuart' as const,
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    plugins: {
      legend: {
        display: false, // Hide legend if not needed
      },
      tooltip: {
        callbacks: {
          label: (context: any) => `${context.dataset.label}: ${context.raw}`, // Customize tooltip
        },
      },
    },
  };

  return (
    <div style={{ padding: '20px', backgroundColor: '#ffffff', height: '400px', width: '600px' }}>
      <Typography variant="h6" gutterBottom>
        Statistics Graph
      </Typography>
      <div style={{ height: '100%', width: '100%' }}>
        <Line data={graphData} options={graphOptions} />
      </div>
    </div>
  );
};

export default ChartDisplay
