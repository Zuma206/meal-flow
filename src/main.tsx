import React from "react";
import ReactDOM from "react-dom/client";
import IndexLayout from "./layouts/IndexLayout";
import StockPage from "./pages/StockPage";
import RecipesPage from "./pages/RecipesPage";
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import "./index.css";
import NewRecipePage from "./pages/NewRecipePage";
import RecipesLayout from "./layouts/RecipesLayout";
import ViewRecipePage from "./pages/ViewRecipePage";
import FlowPage from "./pages/FlowPage";
import ListPage from "./pages/ListPage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

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
        element: <FlowPage />,
      },
      {
        path: "list",
        element: <ListPage />,
      },
      {
        path: "recipes",
        element: <RecipesLayout />,
        children: [
          { path: "", element: <RecipesPage /> },
          { path: "new", element: <NewRecipePage /> },
          { path: ":key", element: <ViewRecipePage /> },
        ],
      },
      {
        path: "stock",
        element: <StockPage />,
      },
    ],
  },
]);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      useErrorBoundary: true,
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>,
);
