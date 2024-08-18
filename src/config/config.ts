const config = {
    auth0: {
      issuerBaseURL: process.env.NEXT_PUBLIC_AUTH0_ISSUER_BASE_URL || '',
      baseURL: process.env.AUTH0_BASE_URL || '',
      clientID: process.env.AUTH0_CLIENT_ID || '',
      clientSecret: process.env.AUTH0_CLIENT_SECRET || '',
    },
    mongodb: {
      uri: process.env.MONGODB_URI || '',
    },
    mapbox: {
      token: process.env.NEXT_PUBLIC_MAPBOX_TOKEN || '',
    },
    googleMaps: {
      apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
    },
  };
  
  export default config;
  