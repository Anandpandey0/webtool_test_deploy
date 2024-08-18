import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, TextField, Button, DialogActions } from '@mui/material';
import axios from 'axios';

interface ShapefileUploadPopupProps {
  open: boolean;
  onClose: () => void;
  onSave: (drawingData: {
    name: string;
    photo: string;
    id: string;
    files: {
      shx: File | null;
      dbf: File | null;
      prj: File | null;
      shp: File | null;
    };
  }) => void;
}

const ShapefileUploadPopup: React.FC<ShapefileUploadPopupProps> = ({ open, onClose, onSave }) => {
  const [name, setName] = useState('');
  const [photo, setPhoto] = useState('');
  const [id, setId] = useState('');
  const [shxFile, setShxFile] = useState<File | null>(null);
  const [dbfFile, setDbfFile] = useState<File | null>(null);
  const [prjFile, setPrjFile] = useState<File | null>(null);
  const [shpFile, setShpFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>, fileType: string) => {
    const file = event.target.files?.[0] || null;
    switch (fileType) {
      case 'shx':
        setShxFile(file);
        break;
      case 'dbf':
        setDbfFile(file);
        break;
      case 'prj':
        setPrjFile(file);
        break;
      case 'shp':
        setShpFile(file);
        break;
      default:
        break;
    }
  };

  const handleSave = async () => {
    try {
      // First, send the files directly to the Flask API
      const formData = new FormData();
      if (shxFile) formData.append('shx', shxFile);
      if (dbfFile) formData.append('dbf', dbfFile);
      if (prjFile) formData.append('prj', prjFile);
      if (shpFile) formData.append('shp', shpFile);

      const flaskResponse = await axios.post('http://127.0.0.1:5025/convert', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Files processed by Flask API:', flaskResponse.data);

      // Now, save the metadata and the GeoJSON response to MongoDB via Next.js API
      const saveResponse = await axios.post('/api/upload/shapefile', {
        name,
        photo,
        id,
        geojson: flaskResponse.data.geojson, // Pass the GeoJSON data from Flask API
      });

      console.log('Shapefile data saved:', saveResponse.data);

      // Call onSave with the form data and close the popup
      onSave({ name, photo, id, files: { shx: shxFile, dbf: dbfFile, prj: prjFile, shp: shpFile } });
      onClose();
    } catch (error) {
      console.error('There was an error processing the request:', error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}   sx={{ zIndex: 1300 }} >
      <DialogTitle>Upload the Shapefile</DialogTitle>
      <DialogContent>
        <TextField
          label="Name"
          fullWidth
          value={name}
          onChange={(e) => setName(e.target.value)}
          margin="dense"
        />
        <TextField
          label="Photo URL"
          fullWidth
          value={photo}
          onChange={(e) => setPhoto(e.target.value)}
          margin="dense"
        />
        <TextField
          label="ID"
          fullWidth
          value={id}
          onChange={(e) => setId(e.target.value)}
          margin="dense"
        />
        <Button
          variant="contained"
          component="label"
          fullWidth
          style={{ marginTop: '16px' }}
        >
          Upload .shx file
          <input
            type="file"
            hidden
            accept=".shx"
            onChange={(e) => handleFileChange(e, 'shx')}
          />
        </Button>
        <Button
          variant="contained"
          component="label"
          fullWidth
          style={{ marginTop: '16px' }}
        >
          Upload .dbf file
          <input
            type="file"
            hidden
            accept=".dbf"
            onChange={(e) => handleFileChange(e, 'dbf')}
          />
        </Button>
        <Button
          variant="contained"
          component="label"
          fullWidth
          style={{ marginTop: '16px' }}
        >
          Upload .prj file
          <input
            type="file"
            hidden
            accept=".prj"
            onChange={(e) => handleFileChange(e, 'prj')}
          />
        </Button>
        <Button
          variant="contained"
          component="label"
          fullWidth
          style={{ marginTop: '16px' }}
        >
          Upload .shp file
          <input
            type="file"
            hidden
            accept=".shp"
            onChange={(e) => handleFileChange(e, 'shp')}
          />
        </Button>
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

export default ShapefileUploadPopup;
