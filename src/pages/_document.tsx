import { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Other head elements (e.g., title, meta tags) can go here */}
      </Head>
      <body>
        <Main />
        <NextScript />
        {/* <Script // Move the script here, after NextScript
          src="https://apis.mapmyindia.com/advancedmaps/v1/icfNcKmIgt8MDVrX0qiufkj4Lm8jGntF9CyNwtlT/map_load?v=1.2"
          strategy="beforeInteractive"
        /> */}
        <Script
          src="https://apis.mapmyindia.com/advancedmaps/v1/0566016b9c5085980487560d7c798313/map_load?v=1.2" // Replace with your actual API key
          strategy="beforeInteractive"
        />
      </body>
    </Html>
  );
}
