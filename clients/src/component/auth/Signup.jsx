import React, { useState } from "react";
import { SignupUser } from "../../service/auth";

const Signup = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "customer",
    userName: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handelChange = (e) => {
    setError("");
    setSuccess("");
    setFormData({ [e.target.name]: e.target.value });
  };

  const handelSubmit = async (e) => {
    e.preventDefault();
    const result = await SignupUser(formData);
    if (result.success) {
      setSuccess(result.data.message);
      setFormData({ email: "", password: "", role: "customer", userName: "" });
    } else {
      setError(result.message);
    }
  };
  return (
    <div className="flex justifu-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handelSubmit}
        className="bg-white shadow-md rounded px-8 pb-8 w-full  max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        {success && <p className="text-green-500 text-sm mb-4">{success}</p>}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Username
          </label>
          <input
            type="text"
            onChange={handelChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
            value={formData.userName}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            {" "}
            Email
          </label>
          <input
            type="text"
            onChange={handelChange}
            className="shadow  appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
            value={formData.email}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Password
          </label>
          <input
            type="text"
            onChange={handelChange}
            className="shadow appearance-none border rounded w-full  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
            value={formData.password}
          />
        </div>
        <div className=" mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Role
          </label>
          <select
            name="role"
            onChange={handelChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
          >
            <option value="customer">Customer</option>
            <option value="admin">admin</option>
          </select>
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full "
        >
          Signup
        </button>
      </form>
    </div>
  );
};

export default Signup;
