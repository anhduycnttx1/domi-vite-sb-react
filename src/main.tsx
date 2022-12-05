import React from "react";
import ReactDOM from "react-dom/client";
import { routerRoot } from "./RouterRoot";
import { RouterProvider } from "react-router-dom";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={routerRoot} />
  </React.StrictMode>
);
