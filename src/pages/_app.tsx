import { AppProps } from 'next/app';
import Layout from '@/components/Layout';
import { PATHS } from '@/helper/PageHandler';

import '@/styles/globals.css'; // Adjust the path to your global styles if necessary

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
};

export default MyApp;
