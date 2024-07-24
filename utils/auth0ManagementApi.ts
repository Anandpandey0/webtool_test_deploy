import axios from 'axios';

const getAccessToken = async () => {
  const response = await axios.post('https://anandpiitr.us.auth0.com/oauth/token', {
    client_id: process.env.AUTH0_M2M_CLIENT_ID,
    client_secret: process.env.AUTH0_M2M_CLIENT_SECRET,
    audience: 'https://anandpiitr.us.auth0.com/api/v2/',
    grant_type: 'client_credentials',
  });

  return response.data.access_token;
};

export default getAccessToken;
