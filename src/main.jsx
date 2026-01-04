import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { router } from "./routes/routers.jsx";
import AuthProvider from "./context/AuthProvider/AuthProvider.jsx";
import { RouterProvider } from "react-router";
import { ToastContainer } from "react-toastify";
createRoot(document.getElementById("root")).render(
  <div>
    <AuthProvider>
      <RouterProvider router={router} />
      <ToastContainer />
    </AuthProvider>
  </div>
);
