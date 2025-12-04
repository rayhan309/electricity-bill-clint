// import { useState, useEffect } from "react";
// import axios from "axios";

// const BillsCards = () => {
//   const [bills, setBills] = useState([]);

//   useEffect(() => {
//     axios("/data.json").then((res) => {
//       setBills(res.data);
//     });
//   }, []);

//   return (
//     <div className="p-6 w-11/12 mx-auto min-h-screen">
//       <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
//         Monthly Bills
//       </h2>
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//         {bills.map((bill) => (
//           <div
//             key={bill.id}
//             className="bg-white shadow-lg rounded-2xl overflow-hidden border border-gray-200 hover:scale-105 transform transition duration-300"
//           >
//             <img
//               src={bill.image}
//               alt={bill.title}
//               className="w-full max-h-[270px] object-cover"
//             />
//             <div className="p-5">
//               <h3 className="text-xl font-semibold text-gray-900 mb-2">
//                 {bill.title}
//               </h3>
//               <p className="text-gray-700 text-sm mb-4">{bill.description}</p>
//               <div className="flex justify-between items-center mb-3">
//                 <span className="font-bold text-gray-900">Amount: ${bill.amount}</span>
//                 <span
//                   className={`px-3 py-1 rounded-full text-sm font-semibold ${
//                     bill.status === "Paid"
//                       ? "bg-green-100 text-green-800"
//                       : "bg-red-100 text-red-800"
//                   }`}
//                 >
//                   {bill.status}
//                 </span>
//               </div>
//               <div className="flex justify-between text-gray-500 text-sm">
//                 <span>{bill.location}</span>
//                 <span>{bill.date}</span>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default BillsCards;

import { useEffect, useState } from "react";
import axios from "axios";
import {
  BoltIcon,
  FireIcon,
  CloudIcon,
  WifiIcon,
} from "@heroicons/react/24/solid";
import { motion } from "framer-motion";
import { Fade } from "react-awesome-reveal";

const iconMap = {
  Electricity: <BoltIcon className="h-12 w-12 text-yellow-500" />,
  Gas: <FireIcon className="h-12 w-12 text-red-500" />,
  Water: <CloudIcon className="h-12 w-12 text-blue-500" />,
  Internet: <WifiIcon className="h-12 w-12 text-purple-500" />,
};

const gradientMap = {
  Electricity: "from-yellow-400 via-orange-400 to-amber-500",
  Gas: "from-red-400 via-orange-500 to-red-600",
  Water: "from-blue-400 via-cyan-400 to-blue-600",
  Internet: "from-purple-400 via-indigo-400 to-purple-600",
};

const BillsCards = () => {
  const [bills, setBills] = useState([]);

  useEffect(() => {
    axios("https://smart-bills-orcin.vercel.app/category").then((res) => {
      setBills(res.data);
    });
  }, []);

  // Filter only 4 categories we need
  const mainCategories = bills.filter((b) =>
    ["Electricity", "Gas", "Water", "Internet"].includes(b.category)
  );

  return (
    <div className="py-10 w-11/12 mx-auto">
      <div className="w-full border-b h-2 mb-5 mt-5 opacity-30 border-amber-500 border-dashed shadow-lg shadow-amber-500/40"></div>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="
    text-4xl font-extrabold text-center mb-10 mt-12 
    bg-gradient-to-r from-orange-300 via-yellow-300 to-amber-400 
    bg-clip-text text-transparent 
    drop-shadow-[0_4px_15px_rgba(255,181,100,0.45)]
  "
      >
        Utility Bills
      </motion.h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {mainCategories.map((item) => (
          <Fade key={item._id} triggerOnce>
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className={`rounded-3xl shadow-xl text-white p-6 transform transition-all duration-300 hover:scale-105 bg-gradient-to-r ${
                gradientMap[item.category]
              }`}
            >
              <div className="flex justify-between items-center mb-4">
                {iconMap[item.category]}
                <span className="text-sm bg-white/30 px-3 py-1 rounded-full backdrop-blur-sm">
                  {item.status}
                </span>
              </div>

              <h3 className="text-xl font-bold mb-2">{item.category}</h3>

              <p className="text-sm opacity-90 mb-4">
                {item.description?.slice(0, 80)}...
              </p>

              <div className="mt-4">
                <p className="text-lg font-semibold">$ {item.amount}</p>
                <p className="text-sm mt-1">{item.month}</p>
              </div>
            </motion.div>
          </Fade>
        ))}
      </div>
    </div>
  );
};

export default BillsCards;
