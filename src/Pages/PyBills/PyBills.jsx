import React, { useContext, useState } from "react";
import { AuthContext } from "../../Context/AuthContext";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";

const PyBills = ({ bill }) => {
  const { user } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    email: user?.email || "",
    billId: bill?._id || "",
    amount: bill?.amount || "",
    username: "",
    address: "",
    phone: "",
    date: new Date().toLocaleDateString(),
    additionalInfo: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Payment Data:", formData);
    toast.success("Payment submitted successfully!");
    setFormData((prev) => ({
      ...prev,
      username: "",
      address: "",
      phone: "",
      additionalInfo: "",
    }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black relative overflow-hidden px-4 pt-28 pb-16">
      <ToastContainer position="top-right" autoClose={3000} />

      {/* Animated neon orbs */}
      <div className="absolute top-10 left-10 w-36 h-36 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 opacity-40 animate-pulse blur-3xl"></div>
      <div className="absolute bottom-10 right-20 w-48 h-48 rounded-full bg-gradient-to-r from-pink-500 to-red-500 opacity-30 animate-pulse blur-3xl"></div>

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-3xl bg-[#0d0f18]/70 backdrop-blur-xl border border-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-3xl shadow-[0_0_50px_rgba(138,43,226,0.5)] p-10 grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10"
      >
        <h2 className="col-span-1 md:col-span-2 text-4xl font-extrabold text-white text-center mb-6 animate-pulse">
          Pay Your Bill
        </h2>

        {/* Email */}
        <div className="flex flex-col">
          <label className="text-gray-300 mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={user?.email}
            readOnly
            className="px-4 py-2 rounded-xl bg-gray-900 text-white border border-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
          />
        </div>

        {/* Bill ID */}
        <div className="flex flex-col">
          <label className="text-gray-300 mb-1">Bill ID</label>
          <input
            type="text"
            name="billId"
            value={formData.billId}
            readOnly
            className="px-4 py-2 rounded-xl bg-gray-900 text-white border border-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
          />
        </div>

        {/* Amount */}
        <div className="flex flex-col">
          <label className="text-gray-300 mb-1">Amount</label>
          <input
            type="text"
            name="amount"
            value={`$${formData.amount}`}
            readOnly
            className="px-4 py-2 rounded-xl bg-gray-900 text-white border border-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
          />
        </div>

        {/* Date */}
        <div className="flex flex-col">
          <label className="text-gray-300 mb-1">Date</label>
          <input
            type="text"
            name="date"
            value={formData.date}
            readOnly
            className="px-4 py-2 rounded-xl bg-gray-900 text-white border border-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
          />
        </div>

        {/* Username */}
        <div className="flex flex-col">
          <label className="text-gray-300 mb-1">Username</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Your Name"
            required
            className="px-4 py-2 rounded-xl bg-gray-900 text-white border border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all hover:scale-105"
          />
        </div>

        {/* Phone */}
        <div className="flex flex-col">
          <label className="text-gray-300 mb-1">Phone</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Your Phone Number"
            required
            className="px-4 py-2 rounded-xl bg-gray-900 text-white border border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all hover:scale-105"
          />
        </div>

        {/* Address */}
        <div className="flex flex-col md:col-span-2">
          <label className="text-gray-300 mb-1">Address</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Your Address"
            required
            className="px-4 py-2 rounded-xl bg-gray-900 text-white border border-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all hover:scale-105"
          />
        </div>

        {/* Additional Info */}
        <div className="flex flex-col md:col-span-2">
          <label className="text-gray-300 mb-1">Additional Info</label>
          <textarea
            name="additionalInfo"
            value={formData.additionalInfo}
            onChange={handleChange}
            placeholder="Any extra information..."
            className="px-4 py-2 rounded-xl bg-gray-900 text-white border border-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all hover:scale-105 resize-none"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="col-span-1 md:col-span-2 py-4 rounded-3xl bg-gradient-to-r from-purple-500 via-indigo-500 to-pink-500 text-white font-extrabold text-lg shadow-xl hover:scale-105 transition-transform animate-pulse"
        >
          Pay Bill
        </button>
      </form>
    </div>
  );
};

export default PyBills;
