import React, { useState } from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";
import { toast } from "react-toastify";
import { Link, useLocation, useNavigate } from "react-router";
import SocialLogin from "../SocialLogin/SocialLogin";
import axios from "axios";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FiUser, FiMail, FiLock, FiCamera, FiArrowRight, FiEye, FiEyeOff } from "react-icons/fi";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { registerUser, updateUserProfile } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  const handleRegistration = (data) => {
    const profileImg = data.photo[0];

    registerUser(data.email, data.password)
      .then((result) => {
        toast.success("Creating your account...");
        const formData = new FormData();
        formData.append("image", profileImg);

        const image_API_URL = `https://api.imgbb.com/1/upload?key=${
          import.meta.env.VITE_image_host_key
        }`;

        axios.post(image_API_URL, formData).then((res) => {
          const photoURL = res.data.data.url;

          const userInfo = {
            email: data.email,
            name: data.name,
            photoURL: photoURL,
            role: "user", // Default role
          };

          axiosSecure.post("/users", userInfo).then((res) => {
            const userProfile = {
              displayName: data.name,
              photoURL: photoURL,
            };

            updateUserProfile(userProfile)
              .then(() => {
                toast.success("Welcome to Zap Shift!");
                navigate(location.state || "/");
              })
              .catch((error) => toast.error(error.message));
          });
        });
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4 py-12">
      <div className="w-full max-w-lg bg-white rounded-[2.5rem] shadow-2xl shadow-indigo-100 overflow-hidden border border-slate-100">
        {/* Header */}
        <div className="bg-indigo-600 p-8 text-center text-white">
          <h1 className="text-3xl font-black tracking-tight mb-2">Join Zap Shift</h1>
          <p className="text-indigo-100">Create an account to start shipping today</p>
        </div>

        <div className="p-8 md:p-10">
          <form className="space-y-5" onSubmit={handleSubmit(handleRegistration)}>
            {/* Name Field */}
            <div className="space-y-1">
              <label className="text-sm font-bold text-slate-700 ml-1">Full Name</label>
              <div className="relative group">
                <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-slate-400 group-focus-within:text-indigo-600 transition-colors">
                  <FiUser />
                </span>
                <input
                  type="text"
                  {...register("name", { required: "Name is required" })}
                  className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                  placeholder="John Doe"
                />
              </div>
              {errors.name && (
                <p className="text-xs text-red-500 mt-1 ml-1">{errors.name.message}</p>
              )}
            </div>

            {/* Photo Field (Fixed Bug Here) */}
            <div className="space-y-1">
              <label className="text-sm font-bold text-slate-700 ml-1">Profile Photo</label>
              <div className="relative group">
                <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-slate-400 group-focus-within:text-indigo-600 transition-colors">
                  <FiCamera />
                </span>
                <input
                  type="file"
                  {...register("photo", { required: "Photo is required" })}
                  className="w-full pl-11 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-2xl file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-100 file:text-indigo-700 hover:file:bg-indigo-200 cursor-pointer"
                />
              </div>
              {errors.photo && (
                <p className="text-xs text-red-500 mt-1 ml-1">{errors.photo.message}</p>
              )}
            </div>

            {/* Email Field */}
            <div className="space-y-1">
              <label className="text-sm font-bold text-slate-700 ml-1">Email Address</label>
              <div className="relative group">
                <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-slate-400 group-focus-within:text-indigo-600 transition-colors">
                  <FiMail />
                </span>
                <input
                  type="email"
                  {...register("email", { required: "Email is required" })}
                  className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                  placeholder="name@company.com"
                />
              </div>
              {errors.email && (
                <p className="text-xs text-red-500 mt-1 ml-1">{errors.email.message}</p>
              )}
            </div>

            {/* Password Field with Toggle */}
            <div className="space-y-1">
              <label className="text-sm font-bold text-slate-700 ml-1">Password</label>
              <div className="relative group">
                <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-slate-400 group-focus-within:text-indigo-600 transition-colors">
                  <FiLock />
                </span>
                <input
                  type={showPassword ? "text" : "password"}
                  {...register("password", {
                    required: "Password is required",
                    minLength: { value: 6, message: "At least 6 characters" },
                    pattern: {
                      value: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9]).+$/,
                      message: "Must include Uppercase, Lowercase, Number & Special Character",
                    },
                  })}
                  className="w-full pl-11 pr-12 py-3 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-indigo-600 transition-colors"
                >
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
              {errors.password && (
                <p className="text-[10px] md:text-xs text-red-500 mt-1 leading-tight ml-1 font-medium">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-2xl shadow-lg shadow-indigo-100 flex items-center justify-center gap-2 group transition-all active:scale-[0.98] mt-4">
              Create Account
              <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          <div className="relative my-8 text-center">
            <span className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-px bg-slate-100"></span>
            <span className="relative bg-white px-4 text-xs font-bold text-slate-400 uppercase tracking-widest">
              Or join with
            </span>
          </div>

          <SocialLogin />

          <p className="text-center text-slate-500 font-medium mt-8">
            Already have an account?{" "}
            <Link
              state={location.state}
              className="text-indigo-600 font-bold hover:underline underline-offset-4"
              to="/login"
            >
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;