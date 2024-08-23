import React, { useState } from 'react';
import { Modal, Button, Box } from '@mui/material';
import PopupModal from './PopupModal';

const FarmDetailsModal = () => {
  const [open, setOpen] = useState(true); // Set the initial state to true to open the modal by default

  const handleClose = () => setOpen(false);

  return (
    <div >
      {/* This button will not be necessary if the modal is open by default, but you can keep it to reopen if needed */}
 
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box 
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
            outline: 'none', // Remove focus outline from modal
            width: '70%', // Adjust the width as needed (e.g., '50%', '70%', '80%')
          }}
        >
          <PopupModal />
        </Box>
      </Modal>
    </div>
  );
};

export default FarmDetailsModal;
