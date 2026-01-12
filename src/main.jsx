import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { router } from "./routes/routers.jsx";
import AuthProvider from "./context/AuthProvider/AuthProvider.jsx";
import { RouterProvider } from "react-router";
import { ToastContainer } from "react-toastify";
import {
  // useQuery,
  // useMutation,
  // useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

// Create a client
const queryClient = new QueryClient();
createRoot(document.getElementById("root")).render(
  <div>
    {/* // Provide the client to your App and tanstack query use */}
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={router} />
        <ToastContainer />
      </AuthProvider>
    </QueryClientProvider>
  </div>
);
