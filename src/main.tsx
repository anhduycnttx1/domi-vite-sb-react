import React from "react";
import ReactDOM from "react-dom/client";
import { routerRoot } from "./RouterRoot";
import { RouterProvider } from "react-router-dom";
import "./index.css";
import { MantineProvider } from "@mantine/core";
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <RouterProvider router={routerRoot} />
    </MantineProvider>
  </React.StrictMode>
);
