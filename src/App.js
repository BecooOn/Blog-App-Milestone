import { createTheme, ThemeProvider } from "@mui/material/styles";
import AppRouter from "./router/AppRouter";
import { amber, teal } from "@mui/material/colors";
import { Provider } from "react-redux";
import store, { persistor } from "./app/store";
import { ToastContainer } from "react-toastify";
import { Anta } from "@fontsource/anta";
import { PersistGate } from "redux-persist/integration/react";
import { Helmet } from 'react-helmet-async';

function App() {
  const theme = createTheme({
    palette: {
      primary: {
        light: teal["200"],
        main: teal["500"],
        dark: teal["800"],
      },
      secondary: {
        light: amber["200"],
        main: amber["500"],
        dark: amber["800"],
      },
    },
    typography: {
      fontFamily: "Anta, sans-serif",
      fontSize: 16,
    },
  });
  return (
    <>
     <Helmet>
        <title>Blogla-Bakalim</title>
        <meta name="description" content="En iyi blog platformu ile yazılarınızı paylaşın." />
      </Helmet>
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <AppRouter />
          </PersistGate>
        </Provider>
        <ToastContainer />
      </ThemeProvider>
    </>
  );
}

export default App;
