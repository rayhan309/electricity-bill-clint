import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Loading from "../Laoding/Laoding";
import { motion } from "framer-motion";

const RecentBill = () => {
  const [bills, setBills] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    axios("http://localhost:3000/categories/limit").then((res) => {
      setBills(res.data);
    });

    setTimeout(() => {
      setLoading(false);
    }, 1400);
  }, []);

  return loading ? (
    <Loading />
  ) : (
    <>
      <div className="w-11/12 mx-auto border-b h-2 mb-5 mt-5 opacity-30 border-amber-500 border-dashed shadow-lg shadow-amber-500/40"></div>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="
    text-4xl font-extrabold text-center mb-10 mt-12 
    bg-gradient-to-r from-orange-300 via-yellow-300 to-gray-400 
    bg-clip-text text-transparent 
    drop-shadow-[0_4px_15px_rgba(255,181,100,0.45)]
  "
      >
        Recent Bills
      </motion.h2>

      <div className="grid grid-cols-1 w-11/12 mx-auto md:grid-cols-2 lg:grid-cols-3 mb-16 gap-10">
        {bills.map((bill, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="
      rounded-2xl overflow-hidden 
      bg-white/10 backdrop-blur-xl 
      border border-white/20 
      shadow-[0_8px_30px_rgba(255,255,255,0.15)]
      transition-all duration-500 
      group
    "
          >
            {/* --- TOP IMAGE WITH HOVER LIFT --- */}
            <div className="relative w-full h-60 overflow-hidden p-2">
              <motion.img
                src={bill.image}
                alt="cover"
                className="w-full h-full object-cover rounded-t-2xl rounded-b-none"
                whileHover={{ y: -12 }} // smooth image lift
                transition={{ duration: 0.5, ease: "easeOut" }}
              />
              {/* Glass top overlay */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-transparent"></div>
            </div>

            {/* --- BOTTOM TEXT --- */}
            <div className="p-6 space-y-3 text-white relative z-10">
              <h2 className="text-xl font-bold drop-shadow-md">{bill.title}</h2>

              <p className="text-sm text-white/80">
                <strong>Category:</strong> {bill.category}
              </p>

              <p className="text-sm text-white/80">
                <strong>Location:</strong> {bill.location}
              </p>

              <p className="text-sm text-white/80">
                <strong>Date:</strong>{" "}
                {new Date(bill.date).toLocaleDateString()}
              </p>

              {/* <!-- From Uiverse.io by gharsh11032000 -->  */}
              <button
                onClick={() => navigate(`/billDitails/${bill?._id}`)}
                className="animated-button mt-5"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="arr-2"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"></path>
                </svg>
                <span className="text">See Details</span>
                <span className="circle"></span>
                <svg
                  viewBox="0 0 24 24"
                  className="arr-1"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"></path>
                </svg>
              </button>
            </div>
          </motion.div>
        ))}
      </div>
      {/* <!-- From Uiverse.io by gharsh11032000 -->  */}
      <div className="flex justify-center">
        <button onClick={() => navigate(`/bills`)} className="animated-button">
          <svg
            viewBox="0 0 24 24"
            className="arr-2"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"></path>
          </svg>
          <span className="text">All Bills</span>
          <span className="circle"></span>
          <svg
            viewBox="0 0 24 24"
            className="arr-1"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"></path>
          </svg>
        </button>
      </div>
    </>
  );
};

export default RecentBill;
