import { ChakraProvider } from "@chakra-ui/react";
import Head from "next/head";
import "@fontsource/raleway/200.css";
import "@fontsource/raleway/300.css";
import "@fontsource/raleway/400.css";
import "@fontsource/raleway/500.css";
import "@fontsource/raleway/600.css";
import "@fontsource/raleway/700.css";
import "@fontsource/raleway/800.css";
import "@fontsource/raleway/900.css";
import "@fontsource/inter/200.css";
import "@fontsource/inter/300.css";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/700.css";
import "@fontsource/inter/800.css";
import "@fontsource/inter/900.css";
import theme from "@/components/theme";

import en from "../locales/en";
import mn from "../locales/mn";

function MyApp({ Component, pageProps }) {
  //language

  const language = mn;

  return (
    <ChakraProvider resetCSS theme={theme}>
      <Script
        strategy="lazyOnload"
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
      />

      <Script strategy="lazyOnload">
        {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}', {
              page_path: window.location.pathname,
            });
                `}
      </Script>
      <Head>
        <title>NUMO - {language.title}</title>
        <link rel="manifest" href="./site.webmanifest"></link>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="./favicon/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="./favicon/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="./favicon/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <meta
          name="viewport"
          content="initial-scale=1, viewport-fit=cover, user-scalable=no"
        ></meta>
        <meta name="description" content="Даалгавар төлөвлөх апп, платформ" />
      </Head>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
