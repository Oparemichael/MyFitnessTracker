// pages/SignUp.jsx
import React from "react";
import { useNavigate, Link } from "react-router-dom";
import useForm from "../../hooks/useForm";

export default function SignUp() {
  const navigate = useNavigate();

  const { values, handleChange, resetForm } = useForm({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    height: "",
    weight: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const heightMeters = values.height / 100;
    const bmi = values.weight / (heightMeters * heightMeters);

    const userData = {
      ...values,
      bmi: bmi.toFixed(1),
    };

    localStorage.setItem("user", JSON.stringify(userData));
    resetForm();
    navigate("/profile");
  };

  return (
    <div className="min-h-screen w-screen flex items-center justify-center bg-[url(https://static.dw.com/image/60073158_605.jpg)] bg-cover bg-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl p-10">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">
          Create Account
        </h2>
        <p className="text-center text-gray-500 mb-6">
          Join us and start your fitness journey 💪
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={values.firstName}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={values.lastName}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />
          </div>

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={values.email}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={values.password}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            required
          />

          <div className="grid grid-cols-2 gap-4">
            <input
              type="number"
              name="height"
              placeholder="Height (cm)"
              value={values.height}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />
            <input
              type="number"
              name="weight"
              placeholder="Weight (kg)"
              value={values.weight}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition duration-200"
          >
            Sign Up
          </button>
        </form>

        {/* Login link */}
        <p className="text-center text-gray-600 mt-6">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-blue-600 font-semibold hover:underline"
          >
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
