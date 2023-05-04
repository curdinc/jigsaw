import type { AppType } from "next/app";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import {
  ChakraProvider,
  extendTheme,
  type StyleFunctionProps,
} from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";
import { Montserrat, Poppins } from "@next/font/google";
import type { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";

import { api } from "~/utils/api";
import "../styles/globals.css";

const montserrat = Montserrat({ subsets: ["latin-ext"], display: "swap" });
const poppins = Poppins({
  style: ["italic", "normal"],
  weight: ["400", "600", "700"],
  display: "swap",
  subsets: ["latin-ext"],
});

const fonts = {
  heading: poppins.style.fontFamily,
  body: montserrat.style.fontFamily,
};

// https://palette.saas-ui.dev/
const colors = {
  black: "#282826",
  white: "#C8C7C4",
  brandPrimary: "#BC9D2E",
  brand: {
    50: "#faf7ef",
    100: "#eae0bd",
    200: "#d7c583",
    300: "#c0a43c",
    400: "#ae922b",
    500: "#937b24",
    600: "#7c681e",
    700: "#645318",
    800: "#544615",
    900: "#3d330f",
  },
};

export const theme = extendTheme({
  fonts,
  colors,
  styles: {
    global: (props: StyleFunctionProps) => ({
      body: {
        color: mode("black", "white")(props),
        bg: mode("white", "black")(props),
      },
    }),
  },
});

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <UserProvider>
      <SessionProvider session={session}>
        <ChakraProvider theme={theme}>
          <Component {...pageProps} />
        </ChakraProvider>
      </SessionProvider>
    </UserProvider>
  );
};

export default api.withTRPC(MyApp);
