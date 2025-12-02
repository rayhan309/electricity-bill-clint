import { useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Footer from "../../Components/Footer/Footer";
import { Link, useLocation } from "react-router";
import { CircleChevronLeft } from "lucide-react";

const PyBills = () => {
  const { user } = useContext(AuthContext);
  const location = useLocation();
  console.log(location)

  const handleSubmit = (e) => {
    e.preventDefault();

    const name = e.target.name.value;
    const billId = e.target.billId.value;
    const amount = e.target.amount.value;
    const date = e.target.date.value;
    const phone = e.target.phone.value;
    const address = e.target.address.value;
    const additionalInfo = e.target.additionalInfo.value;
    console.log({name, billId, amount, date, phone, address, additionalInfo})
  };

  return (
    <>
    {/* back mama */}
    <div className="pt-24 pl-7">

        <Link
          to="/"
          className=" shadow-xl premium-btn flex items-center gap-3 w-30"
        >
          <CircleChevronLeft />
          <span>Back</span>
        </Link>
    </div>

      <div className="min-h-screen flex items-center justify-center relative overflow-hidden px-4 pt-14 pb-20">
        <ToastContainer position="top-right" autoClose={3000} />

        {/* Animated neon orbs */}
        <div className="absolute top-10 left-10 w-36 h-36 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 opacity-40 animate-pulse blur-3xl"></div>
        <div className="absolute bottom-10 right-20 w-48 h-48 rounded-full bg-gradient-to-r from-amber-500 to-red-300 opacity-30 animate-pulse blur-3xl"></div>

        <form
          onSubmit={handleSubmit}
          className="w-full max-w-3xl backdrop-blur-xl border-10 border-white/10 shadow-[0_0_50px_rgba(191,191,191,1)] rounded-3xl p-6 md:p-10 mx-3 grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10"
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
              className="w-full pl-3  py-3 rounded-xl bg-white/5 
              border border-white/20 text-white 
              focus:ring-2 focus:ring-yellow-400 
              transition-all outline-none"
            />
          </div>

          {/* name */}
          <div className="flex flex-col">
            <label className="text-gray-300 mb-1">Your Name</label>
            <input
              type="text"
              name="name"
              defaultValue={user?.displayName}
              className="w-full pl-3 pr-4 py-3 rounded-xl bg-white/5 
              border border-white/20 text-white 
              focus:ring-2 focus:ring-yellow-400 
              transition-all outline-none"
              required
            />
          </div>

          {/* Amount */}
          <div className="flex flex-col">
            <label className="text-gray-300 mb-1">Amount</label>
            <input
              type="text"
              name="amount"
              placeholder="Ammounts"
              className="w-full pl-3 pr-4 py-3 rounded-xl bg-white/5 
              border border-white/20 text-white 
              focus:ring-2 focus:ring-yellow-400 
              transition-all outline-none"
            />
          </div>

          {/* Date */}
          <div className="flex flex-col">
            <label className="text-gray-300 mb-1">Date</label>
            <input
              type="text"
              name="date"
              value={new Date().toDateString()}
              readOnly
              className="w-full pl-3 pr-4 py-3 rounded-xl bg-white/5 
              border border-white/20 text-white 
              focus:ring-2 focus:ring-yellow-400 
              transition-all outline-none"
            />
          </div>

          {/* billls ids */}
          <div className="flex flex-col">
            <label className="text-gray-300 mb-1">Bill ID</label>
            <input
              type="text"
              name="billId"
              placeholder="1346273534262534...."
              className="w-full pl-3 pr-4 py-3 rounded-xl bg-white/5 
              border border-white/20 text-white 
              focus:ring-2 focus:ring-yellow-400 
              transition-all outline-none"
              required
            />
          </div>

          {/* Phone */}
          <div className="flex flex-col">
            <label className="text-gray-300 mb-1">Phone</label>
            <input
              type="text"
              name="phone"
              placeholder="Your Phone Number"
              className="w-full pl-3 pr-4 py-3 rounded-xl bg-white/5 
              border border-white/20 text-white 
              focus:ring-2 focus:ring-yellow-400 
              transition-all outline-none"
              required
            />
          </div>

          {/* Address */}
          <div className="flex flex-col md:col-span-2">
            <label className="text-gray-300 mb-1">Address</label>
            <input
              type="text"
              name="address"
              placeholder="Your Address"
              className="w-full pl-3 pr-4 py-3 rounded-xl bg-white/5 
              border border-white/20 text-white 
              focus:ring-2 focus:ring-yellow-400 
              transition-all outline-none"
              required
            />
          </div>

          {/* Additional Info */}
          <div className="flex flex-col md:col-span-2">
            <label className="text-gray-300 mb-1">Additional Info</label>
            <textarea
              name="additionalInfo"
              placeholder="Any extra information..."
              className="w-full pl-3 pr-4 py-3 rounded-xl bg-white/5 
              border border-white/20 text-white 
              focus:ring-2 focus:ring-yellow-400 
              transition-all outline-none"
              required
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="col-span-1 md:col-span-2 py-4 premium-btn hover:scale-100"
          >
            Pay Bill
          </button>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default PyBills;
