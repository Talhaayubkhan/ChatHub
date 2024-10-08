import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { CssBaseline } from "@mui/material";
import { HelmetProvider } from "react-helmet-async";
import { Provider } from "react-redux";
import store from "./redux-toolkit/store";

// ReactDOM.createRoot(document.getElementById("root")).render(
//   <React.StrictMode>
//     {/* Enables changing page title, meta tags, etc., dynamically */}
//     <Provider store={store}>
//       <HelmetProvider>
//         <CssBaseline />
//         <div onClick={(e) => e.preventDefault()}>
//           <App />
//         </div>
//       </HelmetProvider>
//     </Provider>
//   </React.StrictMode>
// );

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
