import React, { useState } from 'react';
import axios from 'axios';

const MapboxSearch = ({ onSelectLocation }: { onSelectLocation: (coordinates: { lat: number; lng: number }) => void }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);

  const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchQuery = e.target.value;
    setQuery(searchQuery);

    if (searchQuery.length > 2) {
      const response = await axios.get(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(searchQuery)}.json`,
        {
          params: {
            access_token: process.env.NEXT_PUBLIC_MAPBOX_TOKEN,
            autocomplete: true,
            limit: 5,
          },
        }
      );

      setResults(response.data.features);
    } else {
      setResults([]);
    }
  };

  const handleSelect = (place: any) => {
    const [lng, lat] = place.center;
    onSelectLocation({ lat, lng });
    setQuery(place.place_name);
    setResults([]);
  };

  return (
    <div className="relative">
      <input
        type="text"
        value={query}
        onChange={handleSearch}
        placeholder="Search location"
        className="w-full p-2 border rounded-md"
      />
      {results.length > 0 && (
        <ul className="absolute top-full left-0 w-full bg-white border rounded-md shadow-lg z-10">
          {results.map((result) => (
            <li
              key={result.id}
              className="p-2 cursor-pointer hover:bg-gray-200"
              onClick={() => handleSelect(result)}
            >
              {result.place_name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MapboxSearch;
