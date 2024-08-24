import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

// Register the components in ChartJS
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface StatApiData {
  Date: string[];
  'Mean GCI': number[];
  'Mean NDMI': number[];
  'Mean NDVI': number[];
}

interface GraphComponentProps {
  data: StatApiData;
}

const GraphComponent: React.FC<GraphComponentProps> = ({ data }) => {
  const chartData = {
    labels: data.Date, // X-axis labels (dates)
    datasets: [
      {
        label: 'Mean GCI',
        data: data['Mean GCI'],
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true,
      },
      {
        label: 'Mean NDMI',
        data: data['Mean NDMI'],
        borderColor: 'rgba(153, 102, 255, 1)',
        backgroundColor: 'rgba(153, 102, 255, 0.2)',
        fill: true,
      },
      {
        label: 'Mean NDVI',
        data: data['Mean NDVI'],
        borderColor: 'rgba(255, 99, 132, 1)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Field Statistics Over Time',
      },
    },
  };

  return <Line data={chartData} options={options} />;
};

export default GraphComponent;
