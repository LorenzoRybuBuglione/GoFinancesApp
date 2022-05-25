import React from "react";
import { ThemeProvider } from "styled-components";
// import * as SplashScreen from "expo-splash-screen";
import AppLoading from "expo-app-loading";

import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";

import theme from "./src/global/styles/theme";
import { Dashboard } from "./src/pages/Dashboard";
import { Register } from "./src/pages/Register";
import { CategorySelect } from "./src/pages/CategorySelect";

export default function App() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <ThemeProvider theme={theme}>
      <Register/>
    </ThemeProvider>
  );
}
