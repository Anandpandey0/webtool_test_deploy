import axios from 'axios';
import FormData from 'form-data';

export const convertShapefileToGeoJSON = async (files: { shx: File | null; dbf: File | null; prj: File | null; shp: File | null; }) => {
  const formData = new FormData();

  if (files.shx) formData.append('shapefile', files.shx);
  if (files.dbf) formData.append('shapefile', files.dbf);
  if (files.prj) formData.append('shapefile', files.prj);
  if (files.shp) formData.append('shapefile', files.shp);

  const response = await axios.post('http://127.0.0.1:5025/convert', formData, {
    headers: {
      ...formData.getHeaders(),
    },
  });

  return response.data.geojson_path;
};
