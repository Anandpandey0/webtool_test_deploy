// import type { NextApiRequest, NextApiResponse } from 'next';
// import mongoose from 'mongoose';
// import Shapefile from '../../models/Shapefile';

// // MongoDB connection function
// const connectToMongoDB = async () => {
//   if (!mongoose.connection.readyState) {
//     await mongoose.connect(process.env.MONGODB_URI as string);
//   }
// };

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method === 'GET') {
//     try {
//       // Connect to MongoDB
//       await connectToMongoDB();

//       // Fetch all shapefiles from MongoDB
//       const shapefiles = await Shapefile.find({});

//       // Send the shapefiles as the response
//       res.status(200).json(shapefiles);
//     } catch (error) {
//       console.error('Error fetching shapefiles:', error);
//       res.status(500).json({ error: 'Error fetching shapefiles' });
//     }
//   } else {
//     res.status(405).json({ error: 'Method not allowed' });
//   }
// }
