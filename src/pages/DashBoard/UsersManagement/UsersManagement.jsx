import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaUserShield } from "react-icons/fa";
import { FiShieldOff } from "react-icons/fi";
import Swal from "sweetalert2";
const UsersManagement = () => {
  const axiosSecure = useAxiosSecure();
  const { data: users = [], refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  //user second  button work
  //ei button click user e admin hoye jabe
  //full user take data database send kortechi
  const handleMakeAdmin = (user) => {
    const roleInfo = { role: "admin" };

    axiosSecure.patch(`/users/${user._id}/role`, roleInfo).then((res) => {
      console.log(res.data);
      if (res.data.modifiedCount) {
        refetch();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `${user.displayName} marked as an Admin`,
          showConfirmButton: false,
          timer: 2000,
        });
      }
    });
  };

  //admin change user admin ke click korle abr use hoye jabe
  const handleRemoveAdmin = (user) => {
    const roleInfo = { role: "user" };
    axiosSecure.patch(`/users/${user._id}/role`, roleInfo).then((res) => {
      if (res.data.modifiedCount) {
        refetch();
        Swal.fire({
          title: `${user.name} remove from admin`,
          icon: "success",
          showCancelButton: false,
          timer: 2000,
        });
      }
    });
  };

  return (
    <div>
      <h1 className="text-4xl">Manage Users : {users.length}</h1>
      <div>
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>Serial No</th>
                <th>User</th>
                <th>Email</th>
                <th>Role</th>
                <th>Admin Action</th>
                <th>Other Actions</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {/* map data tbody */}
              {users.map((user, index) => (
                <tr key={user._id}>
                  <th>{index + 1}</th>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle h-12 w-12">
                          <img src={user.photoURL} alt="" />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">{user.name}</div>
                      </div>
                    </div>
                  </td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  {/* button gola conditional hobe user, rider, admin */}
                  <th className="flex gap-3">
                    {user.role === "admin" ? (
                      <button onClick={() => handleRemoveAdmin(user)} className="btn bg-green-500">
                        <FiShieldOff />
                      </button>
                    ) : (
                      //ei button click korle user teke role change hoye admin hoye jabe
                      <button onClick={() => handleMakeAdmin(user)} className="btn bg-red-300">
                        <FaUserShield />
                      </button>
                    )}
                    {/* 2nd button */}
                  </th>
                  {/* last actions */}
                  <td>Actions</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UsersManagement;
