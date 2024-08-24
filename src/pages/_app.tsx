import { AppProps } from 'next/app';
import Layout from '@/components/Layout';

import '@/styles/globals.css'; // Adjust the path to your global styles if necessary
import ContextProvider from '@/context/contextProvider';

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <ContextProvider>
    <Layout>
      <Component {...pageProps} />
    </Layout>
    </ContextProvider>
  );
};

export default MyApp;
