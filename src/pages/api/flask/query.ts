import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import FormData from 'form-data';
import formidable from 'formidable';
import { IncomingForm } from 'formidable';

export const config = {
  api: {
    bodyParser: false, // Disable Next.js body parsing to let formidable handle it
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    // Parse form-data with formidable
    const form = new IncomingForm();

    form.parse(req, async (err, fields, files) => {
      if (err) {
        console.error('Error parsing form data:', err);
        return res.status(500).json({ error: 'Error parsing form data' });
      }

      const { coordinates, start_date, end_date } = fields;

      // Validate the parsed form data
      if (!coordinates || !start_date || !end_date) {
        return res.status(400).json({ error: 'Missing required fields' });
      }

      try {
        // Create a new form-data object
        const formData = new FormData();

        // Serialize the array to a JSON string
        formData.append('coordinates', JSON.stringify(coordinates));
        formData.append('start_date', start_date);
        formData.append('end_date', end_date);

        console.log('FormData:', formData);

        // Make a request to the Flask API
        const flaskResponse = await axios.post('http://127.0.0.1:5000/query', formData, {
          headers: {
            ...formData.getHeaders(), // Ensure the correct headers are set for form-data
          },
        });

        // Send the response from the Flask API back to the client
        res.status(200).json(flaskResponse.data);
      } catch (error) {
        console.error('Error hitting Flask API:', error);
        res.status(500).json({ error: 'Failed to fetch data from Flask API' });
      }
    });
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
