import React, { useEffect, useRef } from 'react';

const LocationSearch = ({ onSelectLocation }: { onSelectLocation: (coordinates: { lat: number; lng: number }) => void }) => {
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.google) {
      const autocomplete = new window.google.maps.places.Autocomplete(searchInputRef.current as HTMLInputElement);
      
      autocomplete.addListener('place_changed', () => {
        const place = autocomplete.getPlace();
        if (place.geometry && place.geometry.location) {
          const lat = place.geometry.location.lat();
          const lng = place.geometry.location.lng();
          onSelectLocation({ lat, lng });
        }
      });
    }
  }, []);

  return (
    <div className="w-full">
      <input
        type="text"
        ref={searchInputRef}
        placeholder="Search for a place"
        className="w-full p-2 border rounded"
      />
    </div>
  );
};

export default LocationSearch;
