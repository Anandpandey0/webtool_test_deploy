import React, { useState } from 'react';
import SnackbarAlert from './SnackbarAlert';


const ExamplePage: React.FC = () => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error' | 'warning' | 'info'>('success');

  const handleClose = () => {
    setSnackbarOpen(false);
  };

  const handleApiCall = async () => {
    try {
      // Replace with your API call
    //   const response = await fetch('/api/your-endpoint');
    //   const data = await response.json();
      
      setSnackbarMessage("successfully ");
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
    } catch (error) {
      setSnackbarMessage('An error occurred');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <button
        className="px-4 py-2 bg-blue-500 text-white rounded"
        onClick={handleApiCall}
      >
        Make API Call
      </button>
      <SnackbarAlert
        message={snackbarMessage}
        severity={snackbarSeverity}
        open={snackbarOpen}
        handleClose={handleClose}
      />
    </div>
  );
};

export default ExamplePage;
