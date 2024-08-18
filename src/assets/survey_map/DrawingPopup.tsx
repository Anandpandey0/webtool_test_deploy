import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, TextField, Button, DialogActions } from '@mui/material';

interface DrawingPopupProps {
  open: boolean;
  onClose: () => void;
  onSave: (drawingData: { name: string; photo: string; id: string }) => void;
}

const DrawingPopup: React.FC<DrawingPopupProps> = ({ open, onClose, onSave }) => {
  const [name, setName] = useState('');
  const [photo, setPhoto] = useState('');
  const [id, setId] = useState('');

  const handleSave = () => {
    if (name && photo && id) {  // Ensure all fields are filled before saving
      onSave({ name, photo, id });
      onClose();
    } else {
      // Optionally: you could add some form validation here to inform the user
      alert('Please fill out all fields.');
    }
  };

  return (
    <Dialog
      open={open}
      onClose={(event, reason) => {
        if (reason === 'backdropClick' || reason === 'escapeKeyDown') {
          return;
        }
        onClose();
      }}
      disableEscapeKeyDown
    >
      <DialogTitle>Enter Drawing Details</DialogTitle>
      <DialogContent>
        <TextField
          label="Name"
          fullWidth
          margin="normal"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          label="Photo URL"
          fullWidth
          margin="normal"
          value={photo}
          onChange={(e) => setPhoto(e.target.value)}
        />
        <TextField
          label="ID"
          fullWidth
          margin="normal"
          value={id}
          onChange={(e) => setId(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleSave} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DrawingPopup;
