import type { NextApiRequest, NextApiResponse } from 'next';
import mongoose from 'mongoose';
import Shapefile, { IShapefile } from '@/models/Shapefile';


// MongoDB connection function
const connectToMongoDB = async () => {
  if (!mongoose.connection.readyState) {
    await mongoose.connect(process.env.MONGODB_URI as string);
  }
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      // Connect to MongoDB
      await connectToMongoDB();

      const { name, photo, id, geojson } = req.body;

      // Save the metadata and GeoJSON to MongoDB
      const shapefileData: IShapefile = new Shapefile({
        name,
        photo,
        id,
        geojson,
      });
      await shapefileData.save();

      // Send a success response back to the client
      res.status(200).json({ message: 'Shapefile saved successfully', shapefileData });
    } catch (error) {
      console.error('Error saving shapefile:', error);
      res.status(500).json({ error: 'Error saving shapefile' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
