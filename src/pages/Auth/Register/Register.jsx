import React from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";
import { toast } from "react-toastify";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  // custom hook  useAuth use
  const { registerUser } = useAuth();
  //react hooks from  using
  const handleRegistration = (data) => {
    console.log(data);
    registerUser(data.email, data.password)
      .then((res) => {
        console.log("hello", res.user);
        toast.success("Signup Successful");
      })
      .catch((err) => {
        console.log("Resister Not Working", err);
        toast.error(err.message);
      });
  };

  return (
    <div>
      <form onSubmit={handleSubmit(handleRegistration)}>
        <fieldset className="fieldset">
          {/* email field */}
          <label className="label">Email</label>
          <input
            type="email"
            {...register("email", { required: true })}
            className="input"
            placeholder="Email"
          />
          {errors.email?.type === "required" && <p className="text-red-500">Email is required.</p>}
          <label className="label">Password</label>
          <input
            type="text"
            {...register("password", {
              required: true,
              minLength: 6,
              pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/,
            })}
            className="input"
            placeholder="Password"
          />
          {errors.password?.type === "required" && (
            <p className="text-red-500">Password is required.</p>
          )}

          {errors.password?.type === "minLength" && (
            <p className="text-red-500">Password must be 6 characters or longer</p>
          )}
          {/* message for password */}
          {errors.password?.type === "pattern" && (
            <p className="text-red-500">
              ✅ at least one uppercase letter <br />✅ at least one lowercase letter <br />✅ at
              least one number <br />✅ at least one special character <br />✅ minimum length
              (example: 8 characters)
            </p>
          )}

          <div>
            <a className="link link-hover">Forgot password?</a>
          </div>
          <button className="btn btn-neutral mt-4">Register</button>
        </fieldset>
      </form>
    </div>
  );
};

export default Register;
