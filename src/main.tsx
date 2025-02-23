import { Suspense, StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { gray } from "@radix-ui/colors";
import { ThemeProvider } from "styled-components";

import "@radix-ui/themes/styles.css";
import { Flex, Spinner, Theme } from "@radix-ui/themes";

const theme = {
  colors: {
    ...gray,
  },
};

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Theme>
      <ThemeProvider theme={theme}>
        <Flex align="center" justify="center" height="100vh">
          <Suspense fallback={<Spinner />}>
            <App />
          </Suspense>
        </Flex>
      </ThemeProvider>
    </Theme>
  </StrictMode>
);
