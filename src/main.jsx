import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import CountdownTimer from "./components/CountdownTimer.jsx";

import "./index.css";


const router = createBrowserRouter([
  {
    path: '/',
    element: <CountdownTimer />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
