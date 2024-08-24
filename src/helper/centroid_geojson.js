import * as turf from '@turf/turf';

const getGeoJsonCenter = (geoJson) => {
  const centroid = turf.centroid(geoJson);
  return centroid.geometry.coordinates;
};
export default getGeoJsonCenter
// // Example usage
// const geoJson = {
//   "type": "Feature",
//   "geometry": {
//     "type": "Polygon",
//     "coordinates": [
//       [
//         [-77.03653, 38.897676],
//         [-77.009051, 38.889939],
//         [-77.003129, 38.89768],
//         [-77.03653, 38.897676]
//       ]
//     ]
//   },
//   "properties": {}
// };

// const centerCoordinates = getGeoJsonCenter(geoJson);
// console.log(centerCoordinates); // Output will be the centroid coordinates [longitude, latitude]
