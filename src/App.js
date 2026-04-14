import { BrowserRouter } from "react-router-dom";
import { ThemeProvider, CssBaseline, Box, GlobalStyles } from "@mui/material";
import theme from "./theme/theme";
import globalStyles from "./theme/globalStyles";
import AppRoutes from "./routes/AppRoutes";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalStyles styles={globalStyles} />
      <Box sx={{ minHeight: "100vh" }}>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </Box>
    </ThemeProvider>
  );
}

export default App;
