import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import IndexLayout from "./layouts/IndexLayout";
import StockPage from "./pages/StockPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <IndexLayout />,
    children: [
      {
        path: "/",
        element: <Navigate to="flow" />,
      },
      {
        path: "flow",
        element: <></>,
      },
      {
        path: "list",
        element: <></>,
      },
      {
        path: "recipes",
        element: <></>,
      },
      {
        path: "stock",
        element: <StockPage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
