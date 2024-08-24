import { Box, Modal } from '@mui/material'
import React, { useState } from 'react'


const BottomModal = () => {
  const [open, setOpen] = useState(true); // Set the initial state to true to open the modal by default

  const handleClose = () => setOpen(false);
  return (
    <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box 
          sx={{
            position: 'absolute',
            bottom:'0%',
            // transform: 'translate(-50%, -50%)',
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
            outline: 'none', // Remove focus outline from modal
            width: '70%', // Adjust the width as needed (e.g., '50%', '70%', '80%')
          }}
        >
         <h1>Hi</h1>
        </Box>
      </Modal>
  )
}

export default BottomModal