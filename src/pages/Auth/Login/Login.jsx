import React from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";
import { toast } from "react-toastify";
import { Link, useLocation, useNavigate } from "react-router";
import SocialLogin from "../SocialLogin/SocialLogin";

const Login = () => {
  //p-2 v:9
  const location = useLocation();
  const navigate = useNavigate();
  console.log("in the login page", location);
  const { signInUser } = useAuth(); //auth ta ekane ase
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const handleLogin = (data) => {
    console.log(data);
    signInUser(data.email, data.password)
      .then((res) => {
        console.log("Signin complete", res.user);
        toast.success("Signin Successful");
        //jodi location.state e jaythe na pare tahole chole jabe root file kaj korbe login korle
        navigate(location?.state || "/");
      })
      .catch((err) => {
        console.log("Signin error", err);
        toast.error(err.message);
      });
  };

  return (
    //daysiUi from use
    // width full hobe just medium screen er jorno
    <div
      onSubmit={handleSubmit(handleLogin)}
      class="card bg-base-100 w-full mx-auto max-w-sm shrink-0 shadow-2xl"
    >
      <h1 className="text-3xl text-center">Welcome Back</h1>
      <p className="text-center">Please Login </p>
      <form class="card-body">
        <fieldset class="fieldset">
          {/* email filed */}
          <label class="label">Email</label>
          <input
            type="email"
            {...register("email", { required: true })}
            class="input"
            placeholder="Email"
          />
          {/* email error message set */}
          {errors.email?.type === "required" && <p className="text-red-500">Email is required</p>}
          {/* password filed */}
          <label class="label">Password</label>
          <input
            type="password"
            {...register("password", { required: true, minLength: 6 })}
            class="input"
            placeholder="Password"
          />
          {errors.password?.type === "required" && (
            <p className="text-red-500">Password is required.</p>
          )}
          {/* minLength */}
          {errors.password?.type === "minLength" && (
            <p className="text-red-500">Password must be 8 character or longer</p>
          )}
          <div>
            <a class="link link-hover">Forgot password?</a>
          </div>
          <button class="btn btn-neutral mt-4">Login</button>
        </fieldset>
        <p>
          New to zap shift
          <Link
            to="/register"
            state={location.state}
            className="text-blue-500 hover:underline hover:border-blue-500 cursor-pointer "
          >
            Register
          </Link>
        </p>
      </form>
      <SocialLogin />
    </div>
  );
};

export default Login;
