import React, { useState, ChangeEvent } from 'react';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

interface AutocompleteOption {
  description: string;
  place_id: string;
}

const AutocompleteComponent: React.FC = () => {
  const [options, setOptions] = useState<AutocompleteOption[]>([]);

  const handleInputChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (value.length > 2) {
      const response = await axios.get(`https://maps.olakrutrim.com/api/v1/autocomplete`, {
        params: {
          query: value,
          key: 'icfNcKmIgt8MDVrX0qiufkj4Lm8jGntF9CyNwtlT',
        },
      });
      setOptions(response.data.predictions);
    }
  };

  return (
    <Autocomplete
      freeSolo
      options={options.map((option) => option.description)}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Search places"
          onChange={handleInputChange}
        />
      )}
    />
  );
};

export default AutocompleteComponent;
