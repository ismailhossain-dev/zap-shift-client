import React from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";
import { toast } from "react-toastify";
import { Link, useLocation, useNavigate } from "react-router";
import SocialLogin from "../SocialLogin/SocialLogin";
import { FiMail, FiLock, FiArrowRight } from "react-icons/fi"; // Icons for professional look

const Login = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { signInUser } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleLogin = (data) => {
    signInUser(data.email, data.password)
      .then((res) => {
        toast.success("Welcome back to Zap Shift!");
        navigate(location?.state || "/");
      })
      .catch((err) => {
        toast.error("Invalid credentials. Please try again.");
      });
  };

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center bg-slate-50 px-4 py-12">
      <div className="w-full max-w-md bg-white rounded-[2.5rem] shadow-2xl shadow-indigo-100 overflow-hidden border border-slate-100">
        {/* Header Section */}
        <div className="bg-indigo-600 p-10 text-center text-white relative overflow-hidden">
          <div className="relative z-10">
            <h1 className="text-3xl font-black tracking-tight mb-2">Welcome Back</h1>
            <p className="text-indigo-100 font-medium">Log in to track & manage your parcels</p>
          </div>
          {/* Decorative Circle */}
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
        </div>

        {/* Form Section */}
        <div className="p-8 md:p-10">
          <form onSubmit={handleSubmit(handleLogin)} className="space-y-6">
            {/* Email Field */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 ml-1">Email Address</label>
              <div className="relative group">
                <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-slate-400 group-focus-within:text-indigo-600 transition-colors">
                  <FiMail />
                </span>
                <input
                  type="email"
                  {...register("email", { required: "Email is required" })}
                  className={`w-full pl-11 pr-4 py-3.5 bg-slate-50 border ${errors.email ? "border-red-400" : "border-slate-200"} rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all font-medium text-slate-700`}
                  placeholder="name@example.com"
                />
              </div>
              {errors.email && (
                <p className="text-xs text-red-500 font-semibold ml-1">{errors.email.message}</p>
              )}
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <div className="flex justify-between items-center ml-1">
                <label className="text-sm font-bold text-slate-700">Password</label>
                <a
                  href="#"
                  className="text-xs font-bold text-indigo-600 hover:text-indigo-700 transition-colors"
                >
                  Forgot Password?
                </a>
              </div>
              <div className="relative group">
                <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-slate-400 group-focus-within:text-indigo-600 transition-colors">
                  <FiLock />
                </span>
                <input
                  type="password"
                  {...register("password", {
                    required: "Password is required",
                    minLength: { value: 6, message: "Password must be at least 6 characters" },
                  })}
                  className={`w-full pl-11 pr-4 py-3.5 bg-slate-50 border ${errors.password ? "border-red-400" : "border-slate-200"} rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all font-medium text-slate-700`}
                  placeholder="••••••••"
                />
              </div>
              {errors.password && (
                <p className="text-xs text-red-500 font-semibold ml-1">{errors.password.message}</p>
              )}
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-2xl shadow-lg shadow-indigo-200 flex items-center justify-center gap-2 group transition-all active:scale-95"
            >
              Log in to Account
              <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-8 text-center">
            <span className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-px bg-slate-100"></span>
            <span className="relative bg-white px-4 text-xs font-bold text-slate-400 uppercase tracking-widest">
              Or continue with
            </span>
          </div>

          {/* Social Login Section */}
          <div className="mb-8">
            <SocialLogin />
          </div>

          {/* Register Link */}
          <p className="text-center text-slate-500 font-medium">
            New to Zap Shift?{" "}
            <Link
              to="/register"
              state={location.state}
              className="text-indigo-600 font-bold hover:underline decoration-2 underline-offset-4"
            >
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
