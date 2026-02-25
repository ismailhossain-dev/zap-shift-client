import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home/Home/Home";
import Coverage from "../pages/Covarage/Coverage";
import AuthLayout from "../layouts/AuthLayout/AuthLayout";
import Login from "../pages/Auth/Login/Login";
import Register from "../pages/Auth/Register/Register";

import PrivateRoute from "./PrivateRoute";
import Rider from "../pages/Rider/Rider";
import SendParcel from "../pages/sendParcel/SendParcel";
import DashboardLayout from "../layouts/DashboardLayout";
import MyParcels from "../pages/DashBoard/MyParcels/MyParcels";
import PaymentSuccess from "../pages/DashBoard/Payment/PaymentSuccess";
import PaymentCancel from "../pages/DashBoard/Payment/PaymentCancel";
import UsersManagement from "../pages/DashBoard/UsersManagement/UsersManagement";
import PaymentHistory from "../pages/DashBoard/PaymentHistory/PaymentHistory";
import ApproveRider from "../pages/DashBoard/ApproveRider/ApproveRider";
import AdminRoute from "./AdminRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/rider",
        element: (
          <PrivateRoute>
            <Rider />
          </PrivateRoute>
        ),
        loader: () => fetch("/serviceCenters.json").then((res) => res.json()),
      },
      {
        path: "/send-parcel",
        element: (
          <PrivateRoute>
            <SendParcel />
          </PrivateRoute>
        ),
        loader: () => fetch("/serviceCenters.json").then((res) => res.json()),
      },
      {
        path: "/coverage",
        element: <Coverage />,
        // location data
        loader: () => fetch("/serviceCenters.json").then((res) => res.json()),
      },
    ],
  },
  //final project part-2 work
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
    ],
  },
  // dashboardLayout Structure
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout></DashboardLayout>
      </PrivateRoute>
    ),
    children: [
      {
        path: "my-parcels",
        element: <MyParcels />,
      },
      // manush ekta nirdisto product er upor pay korbe tai amra payment:/parcelId add korse

      {
        path: "payment-success",
        element: <PaymentSuccess />,
      },
      {
        path: "payment-canceled",
        element: <PaymentCancel />,
      },
      {
        path: "users-management",
        element: (
          <AdminRoute>
            <UsersManagement />
          </AdminRoute>
        ),
      },
      {
        path: "approve-rider",
        element: (
          <AdminRoute>
            <ApproveRider />
          </AdminRoute>
        ),
      },
      {
        path: "payment-history",
        element: <PaymentHistory />,
      },
    ],
  },
]);
