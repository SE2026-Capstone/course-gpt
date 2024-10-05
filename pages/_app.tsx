import type { AppProps } from "next/app";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Roboto } from "next/font/google";
import { SessionProvider } from "next-auth/react";

import "@/styles/globals.css";

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto",
});

const theme = createTheme({
  typography: {
    fontFamily: "var(--font-roboto)",
  },
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      {/* Hack for MUI fonts since we're using Pages router */}
      <style global jsx>
        {`
          html {
            font-family: ${roboto.style.fontFamily};
          }
        `}
      </style>
      <ThemeProvider theme={theme}>
        <SessionProvider>
          <main>
            <Component {...pageProps} />
          </main>
        </SessionProvider>
      </ThemeProvider>
    </>
  );
}
