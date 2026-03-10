import React from "react";
import Logo from "../../../components/logo/Logo";
import { Link, NavLink } from "react-router";
import useAuth from "../../../hooks/useAuth";
import { toast } from "react-toastify";

const Navbar = () => {
  const { user, logOut } = useAuth();
  console.log(user);

  const handleLogOut = () => {
    logOut()
      .then(() => {
        toast.success("Log Out Successful");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const activeStyle = ({ isActive }) =>
    isActive
      ? "bg-indigo-600 text-white px-5 py-2.5 rounded-xl shadow-md shadow-indigo-200 transition-all duration-300 font-medium"
      : "text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 px-5 py-2.5 rounded-xl transition-all duration-300 font-medium";

  const links = (
    <>
      <li>
        <NavLink className={activeStyle} to="/about-us">
          About Us
        </NavLink>
      </li>
      <li>
        <NavLink className={activeStyle} to="/send-parcel">
          Send Parcel
        </NavLink>
      </li>
      <li>
        <NavLink className={activeStyle} to="/rider">
          Be a Rider
        </NavLink>
      </li>
      <li>
        <NavLink className={activeStyle} to="/coverage">
          Coverage
        </NavLink>
      </li>
      {user && (
        <li>
          <NavLink className={activeStyle} to="/dashboard/my-parcels">
            My Parcels
          </NavLink>
        </li>
      )}

      {user && (
        <li>
          <NavLink className={activeStyle} to="/dashboard">
            Dashboard
          </NavLink>
        </li>
      )}
    </>
  );

  return (
    <div className="navbar bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-slate-100 px-4 md:px-8">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex="-1"
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-4 shadow-xl border border-slate-100 gap-2"
          >
            {links}
          </ul>
        </div>
        <div className="hover:scale-105 transition-transform duration-300">
          <Logo />
        </div>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-2">{links}</ul>
      </div>

      <div className="navbar-end gap-3">
        {user ? (
          /* User Profile Dropdown */
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar border-2 border-indigo-100 hover:border-indigo-400 transition-all"
            >
              <div className="w-10 rounded-full">
                <img alt="User Profile" src={user.photoURL} />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-3 shadow-2xl bg-base-100 rounded-2xl w-64 border border-slate-100"
            >
              {/* User Info Section */}
              <li className="px-4 py-3 mb-2  rounded-xl">
                <p className="font-bold text-indigo-700 text-base truncate">
                  {user?.displayName || "User Name"}
                </p>
                <p className="text-xs text-slate-500 truncate">{user?.email}</p>
              </li>

              <div className="divider my-1"></div>

              <li>
                <Link to="/dashboard" className="py-2 hover:bg-indigo-50 rounded-lg">
                  Dashboard
                </Link>
              </li>

              <div className="divider my-1"></div>

              <li>
                <button
                  onClick={handleLogOut}
                  className="btn btn-sm bg-red-50 text-red-600 hover:bg-red-600 hover:text-white border-none rounded-lg mt-2 transition-all"
                >
                  Log Out
                </button>
              </li>
            </ul>
          </div>
        ) : (
          <Link
            className="btn btn-ghost text-slate-600 hover:text-indigo-600 rounded-xl font-semibold"
            to="/login"
          >
            Log in
          </Link>
        )}

        <Link
          className="hidden sm:flex btn bg-indigo-600 hover:bg-indigo-700 text-white border-none px-6 rounded-xl shadow-lg shadow-indigo-100"
          to="/rider"
        >
          Join as Rider
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
