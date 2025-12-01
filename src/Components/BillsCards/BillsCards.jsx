import { useState, useEffect } from "react";
import axios from "axios";

const BillsCards = () => {
  const [bills, setBills] = useState([]);

  useEffect(() => {
    axios("/data.json").then((res) => {
      setBills(res.data);
    });
  }, []);

  return (
    <div className="p-6 w-11/12 mx-auto min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
        Monthly Bills
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {bills.map((bill) => (
          <div
            key={bill.id}
            className="bg-white shadow-lg rounded-2xl overflow-hidden border border-gray-200 hover:scale-105 transform transition duration-300"
          >
            <img
              src={bill.image}
              alt={bill.title}
              className="w-full max-h-[270px] object-cover"
            />
            <div className="p-5">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {bill.title}
              </h3>
              <p className="text-gray-700 text-sm mb-4">{bill.description}</p>
              <div className="flex justify-between items-center mb-3">
                <span className="font-bold text-gray-900">Amount: ${bill.amount}</span>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    bill.status === "Paid"
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {bill.status}
                </span>
              </div>
              <div className="flex justify-between text-gray-500 text-sm">
                <span>{bill.location}</span>
                <span>{bill.date}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BillsCards;
