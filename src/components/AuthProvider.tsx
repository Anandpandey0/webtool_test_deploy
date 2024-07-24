// components/AuthProvider.tsx
import { Auth0Provider } from '@auth0/auth0-react';
import React from 'react';
import { useRouter } from 'next/router';

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const router = useRouter();

  const onRedirectCallback = (appState: any) => {
    router.push(appState?.returnTo || '/');
  };

  const domain = process.env.NEXT_PUBLIC_AUTH0_ISSUER_BASE_URL || 'https://anandpiitr.us.auth0.com';
  const clientId = process.env.AUTH0_CLIENT_ID || 'KpgXBv5Vva3unTEUQTRTd96ZRIndBTfI';
  const redirectUri = process.env.AUTH0_BASE_URL|| 'http://localhost:3000/callback';

  if (!domain || !clientId || !redirectUri) {
    return <div>Auth0 domain, client ID, and redirect URI must be provided</div>;
  }

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{ redirect_uri: redirectUri }}
      onRedirectCallback={onRedirectCallback}
    >
      {children}
    </Auth0Provider>
  );
};

export default AuthProvider;
