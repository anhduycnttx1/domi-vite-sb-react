import { createBrowserRouter, Outlet } from "react-router-dom";
import NotFounPage from "./pages/404";

export const routerRoot = createBrowserRouter([
  {
    path: "/",
    element: <div>s</div>,
  },
  {
    path: "*",
    element: <NotFounPage />,
  },
]);
