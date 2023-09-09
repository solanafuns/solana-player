import React from "react";
import ReactDOM from "react-dom/client";
// import App from "./App.tsx";
import "./main.css";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import { AppContext } from "./components/AppContext.tsx";
import AppRouter from "./AppRouter.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AppContext>
      <AppRouter />
    </AppContext>
  </React.StrictMode>
);
