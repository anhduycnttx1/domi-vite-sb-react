import { createBrowserRouter, Outlet } from "react-router-dom";
import NotFounPage from "./pages/404";
import HomePage from "./pages/home";

export const routerRoot = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "*",
    element: <NotFounPage />,
  },
]);
