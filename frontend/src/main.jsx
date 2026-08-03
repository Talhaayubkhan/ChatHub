import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { CssBaseline } from "@mui/material";
import { HelmetProvider } from "react-helmet-async";
import { Provider } from "react-redux";
import store from "./redux-toolkit/store";

/**
 * Main entry point for the React application.
 * Wraps the app with necessary providers:
 * - Redux Provider for state management
 * - HelmetProvider for dynamic meta tags
 * - CssBaseline for MUI CSS normalization
 */
ReactDOM.createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <HelmetProvider>
        <CssBaseline />
        <App />
      </HelmetProvider>
    </Provider>
  </StrictMode>
);
