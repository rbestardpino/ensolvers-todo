import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App/App";
import TodoProvider from "./providers/TodoProvider";
import theme from "./theme";

ReactDOM.render(
  <ThemeProvider theme={theme}>
    {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
    <CssBaseline />
    <TodoProvider>
      <App />
    </TodoProvider>
  </ThemeProvider>,
  document.querySelector("#app")
);

