import React from "react";
import { Link, NavLink, Outlet } from "react-router";
import { CiDeliveryTruck } from "react-icons/ci";
import { FaUsers, FaHome, FaCog, FaUserCircle, FaSignOutAlt } from "react-icons/fa";
import { ImCreditCard } from "react-icons/im";
import { HiMenuAlt2 } from "react-icons/hi"; // মডার্ন হ্যামবার্গার আইকন
import useAuth from "../hooks/useAuth";
import Logo from "../components/logo/Logo";
import useRole from "../hooks/useRole";

const DashboardLayout = () => {
  const { user, logOut } = useAuth(); // logOut ফাংশনটি ডিপ্রোফাইল বা ফুটারের জন্য যুক্ত করা হয়েছে
  const { role } = useRole();

  return (
    <div className="drawer lg:drawer-open bg-slate-50/50 font-sans min-h-screen antialiased">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />

      {/* --- Main Content Container --- */}
      <div className="drawer-content flex flex-col min-w-0">
        
        {/* Modern Glassmorphism Navbar */}
        <nav className="navbar w-full bg-white/80 border-b border-slate-100 px-6 sticky top-0 z-30 backdrop-blur-md flex justify-between items-center h-16">
          <div className="flex items-center gap-2">
            <label htmlFor="my-drawer-4" className="btn btn-square btn-ghost lg:hidden text-slate-600 hover:bg-slate-100 rounded-xl">
              <HiMenuAlt2 className="text-2xl" />
            </label>
            <div className="lg:hidden flex items-center gap-2">
              <div className="h-8 w-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white text-sm font-black shadow-md shadow-indigo-200">
                ⚡
              </div>
              <span className="font-black text-slate-800 tracking-tight text-lg">Zap Shift</span>
            </div>
          </div>

          {/* User Status / Top Right Info */}
          <div className="flex items-center gap-4">
            <span className="hidden sm:inline-block text-xs font-bold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full uppercase tracking-wider">
              {role || "Customer"} Account
            </span>
            <div className="avatar ring-2 ring-slate-100 rounded-full cursor-pointer hover:ring-indigo-500/30 transition-all">
              <div className="w-9 h-9 rounded-full bg-slate-100 overflow-hidden">
                {user?.photoURL ? (
                  <img src={user.photoURL} alt="User profile" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-indigo-100 text-indigo-600 font-bold">
                    {user?.displayName?.charAt(0) || "U"}
                  </div>
                )}
              </div>
            </div>
          </div>
        </nav>

        {/* Dynamic Inner Page Content */}
        <main className="w-full">
          <Outlet />
        </main>
      </div>

      {/* --- Premium Sidebar Design --- */}
      <div className="drawer-side z-40 shadow-xl shadow-slate-200/50">
        <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
        
        <div className="min-h-full bg-white w-72 flex flex-col justify-between border-r border-slate-100/80">
          
          <div>
            {/* Logo Wrapper */}
            <div className="h-20 flex items-center px-6 border-b border-slate-100/60 bg-white">
              <Link to="/" className="flex items-center no-underline group transition-transform active:scale-98">
                <Logo />
              </Link>
            </div>

            {/* Navigation Menu List */}
            <ul className="space-y-1.5 px-4 py-6 text-slate-600 font-sans">
              
              {/* Core Links */}
              <p className="text-[10px] font-bold uppercase text-slate-400 tracking-widest px-4 mb-2">Menu</p>
              
              <li>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    `flex items-center gap-4 py-3.5 px-4 rounded-xl font-bold text-sm transition-all duration-200 ${
                      isActive 
                        ? "bg-indigo-600 text-white shadow-lg shadow-indigo-100 border-none" 
                        : "hover:bg-slate-50 hover:text-slate-800 text-slate-500"
                    }`
                  }
                >
                  <FaHome className="text-lg" /> Homepage
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/dashboard/my-parcels"
                  className={({ isActive }) =>
                    `flex items-center gap-4 py-3.5 px-4 rounded-xl font-bold text-sm transition-all duration-200 ${
                      isActive 
                        ? "bg-indigo-600 text-white shadow-lg shadow-indigo-100 border-none" 
                        : "hover:bg-slate-50 hover:text-slate-800 text-slate-500"
                    }`
                  }
                >
                  <CiDeliveryTruck className="text-xl font-black" /> My Parcels
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/dashboard/payment-history"
                  className={({ isActive }) =>
                    `flex items-center gap-4 py-3.5 px-4 rounded-xl font-bold text-sm transition-all duration-200 ${
                      isActive 
                        ? "bg-indigo-600 text-white shadow-lg shadow-indigo-100 border-none" 
                        : "hover:bg-slate-50 hover:text-slate-800 text-slate-500"
                    }`
                  }
                >
                  <ImCreditCard className="text-base" /> Payment History
                </NavLink>
              </li>

              {/* Admin Panel Section */}
              {role === "admin" && (
                <div className="pt-4 mt-4 border-t border-slate-100">
                  <p className="text-[10px] font-bold uppercase text-slate-400 tracking-widest px-4 mb-2">Admin Control</p>
                  <li className="space-y-1.5">
                    <NavLink
                      to="/dashboard/users-management"
                      className={({ isActive }) =>
                        `flex items-center gap-4 py-3.5 px-4 rounded-xl font-bold text-sm transition-all duration-200 ${
                          isActive 
                            ? "bg-indigo-600 text-white shadow-lg shadow-indigo-100 border-none" 
                            : "hover:bg-slate-50 hover:text-slate-800 text-slate-500"
                        }`
                      }
                    >
                      <FaUsers className="text-lg" /> Users Management
                    </NavLink>
                    <NavLink
                      to="/dashboard/approve-rider"
                      className={({ isActive }) =>
                        `flex items-center gap-4 py-3.5 px-4 rounded-xl font-bold text-sm transition-all duration-200 ${
                          isActive 
                            ? "bg-indigo-600 text-white shadow-lg shadow-indigo-100 border-none" 
                            : "hover:bg-slate-50 hover:text-slate-800 text-slate-500"
                        }`
                      }
                    >
                      <ImCreditCard className="text-base" /> Approve Rider
                    </NavLink>
                  </li>
                </div>
              )}
            </ul>
          </div>

          {/* Sidebar Footer Block (User Profile Brief & Options) */}
          <div className="p-4 border-t border-slate-100/80 bg-slate-50/50 space-y-2">
            <div className="flex items-center gap-3 p-2 bg-white rounded-xl border border-slate-100 shadow-sm">
              <div className="w-9 h-9 rounded-full bg-indigo-50 overflow-hidden flex items-center justify-center text-indigo-600 font-bold text-sm">
                {user?.photoURL ? <img src={user.photoURL} alt="" /> : <FaUserCircle className="text-xl" />}
              </div>
              <div className="overflow-hidden">
                <h4 className="font-bold text-xs text-slate-700 truncate">{user?.displayName || "Zap User"}</h4>
                <p className="text-[10px] text-slate-400 truncate">{user?.email}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-1">
              <button className="flex items-center justify-center gap-2 py-2.5 rounded-xl hover:bg-slate-100 text-slate-500 transition-all font-bold text-xs border border-transparent hover:border-slate-200">
                <FaCog /> Settings
              </button>
              <button onClick={logOut} className="flex items-center justify-center gap-2 py-2.5 rounded-xl hover:bg-rose-50 text-rose-500 transition-all font-bold text-xs">
                <FaSignOutAlt /> Logout
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;