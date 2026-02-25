import React from "react";
import { Link, NavLink, Outlet } from "react-router";
import { CiDeliveryTruck } from "react-icons/ci";
import { FaUsers, FaHome, FaCog } from "react-icons/fa";
import { ImCreditCard } from "react-icons/im";
import useAuth from "../hooks/useAuth";
import Logo from "../components/logo/Logo";
import useRole from "../hooks/useRole";

const DashboardLayout = () => {
  const { user } = useAuth();
  const { role } = useRole();

  return (
    <div className="drawer lg:drawer-open bg-base-100 font-sans ">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />

      <div className="drawer-content flex flex-col bg-slate-50/50">
        {/* Modern Navbar */}
        <nav className="navbar w-full bg-white border-b border-gray-100 px-4 sticky top-0 z-10 backdrop-blur-md bg-white/80">
          <div className="flex-none lg:hidden">
            <label htmlFor="my-drawer-4" className="btn btn-square btn-ghost">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block w-6 h-6 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </label>
          </div>
          <div className="flex-1 px-2 mx-2 font-bold text-xl tracking-tight text-primary">
            Zap <span className="text-gray-800 font-extrabold uppercase">Shift</span>
          </div>
          <div className="flex-none hidden lg:block">
            {/* Profile/Notification placeholder can go here */}
            <div className="avatar placeholder btn btn-ghost btn-circle">
              <div className="bg-neutral text-neutral-content rounded-full w-8">
                <img src={user.photoURL} alt="" />
              </div>
            </div>
          </div>
        </nav>

        {/* Dynamic Page Content */}
        <main className="p-4 md:p-8">
          <div className="max-w-6xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>

      {/* Sidebar Design */}
      <div className="drawer-side z-20 shadow-xl">
        <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
        <div className="min-h-full bg-white w-64 md:w-72 flex flex-col border-r border-gray-100">
          {/* Sidebar Logo Area */}
          {/* main logo */}
          <div className="w-full flex justify-center  border-b border-gray-100">
            {/* justify-center use kora hoyeche jate pura div-er majhkane thake */}

            <Link to="/" className="flex items-center  no-underline group">
              <Logo />
            </Link>
          </div>

          {/* Navigation Links */}
          <ul className="menu px-4 gap-2 text-base-content grow">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `flex items-center gap-4 py-3 px-4 rounded-xl transition-all duration-200 font-medium ${isActive ? "bg-primary text-white shadow-md shadow-primary/20" : "hover:bg-gray-100 text-gray-600"}`
                }
              >
                <FaHome className="text-lg" /> Homepage
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/dashboard/my-parcels"
                className={({ isActive }) =>
                  `flex items-center gap-4 py-3 px-4 rounded-xl transition-all duration-200 font-medium ${isActive ? "bg-primary text-white shadow-md shadow-primary/20" : "hover:bg-gray-100 text-gray-600"}`
                }
              >
                <CiDeliveryTruck className="text-xl font-bold" /> My Parcels
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/dashboard/payment-history"
                className={({ isActive }) =>
                  `flex items-center gap-4 py-3 px-4 rounded-xl transition-all duration-200 font-medium ${isActive ? "bg-primary text-white shadow-md shadow-primary/20" : "hover:bg-gray-100 text-gray-600"}`
                }
              >
                <ImCreditCard className="text-lg" /> Payment History
              </NavLink>
            </li>
            {/* Admin hole dekabe list gola */}
            {role === "admin" ? (
              <>
                <li>
                  <NavLink
                    to="/dashboard/users-management"
                    className={({ isActive }) =>
                      `flex items-center gap-4 py-3 px-4 rounded-xl transition-all duration-200 font-medium ${isActive ? "bg-primary text-white shadow-md shadow-primary/20" : "hover:bg-gray-100 text-gray-600"}`
                    }
                  >
                    <FaUsers className="text-lg" /> Users Management
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to="/dashboard/approve-rider"
                    className={({ isActive }) =>
                      `flex items-center gap-4 py-3 px-4 rounded-xl transition-all duration-200 font-medium ${isActive ? "bg-primary text-white shadow-md shadow-primary/20" : "hover:bg-gray-100 text-gray-600"}`
                    }
                  >
                    <ImCreditCard className="text-lg" /> Approve Rider
                  </NavLink>
                </li>
              </>
            ) : (
              ""
            )}
          </ul>

          {/* Footer Sidebar */}
          <div className="p-4 border-t border-gray-50">
            <button className="flex items-center gap-4 w-full py-3 px-4 rounded-xl hover:bg-red-50 text-red-500 transition-all font-medium">
              <FaCog /> Settings
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
