import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router";
import Loading from "../Laoding/Laoding";

const RecentBill = () => {
  const [bills, setBills] = useState([]);
  const [loading, setLoading] = useState(true);

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
    <h2 className="text-3xl font-bold text-center mb-6 mt-10 text-gray-800">
        Recent Bills
      </h2>
    <div className="grid grid-cols-1 w-11/12 mx-auto md:grid-cols-2 lg:grid-cols-3 mb-16 gap-10">
      {bills.map((bill, index) => (
        <div
          key={index}
          className="relative max-h-66 rounded-xl overflow-hidden p-6 bg-white/10 backdrop-blur-md border border-white/20 shadow-neumorphic hover:shadow-lg hover:scale-105 transform transition-all duration-500"
          style={{
            backgroundImage:
              "linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))",
          }}
        >
          {/* Background Image with glass effect */}
          <div
            className="absolute inset-0 bg-cover bg-center opacity-50"
            style={{ backgroundImage: `url(${bill.image})` }}
          ></div>

          <div className="relative z-10 text-white space-y-4">
            <h2 className="text-xl font-bold">{bill.title}</h2>
            <p className="text-sm text-white/80">
              <strong>Category:</strong> {bill.category}
            </p>
            <p className="text-sm text-white/80">
              <strong>Location:</strong> {bill.location}
            </p>
            <p className="text-sm text-white/80">
              <strong>Date:</strong> {new Date(bill.date).toLocaleDateString()}
            </p>
            <Link
              to={`/billDitails/${bill?._id}`}
              className="mt-4 px-4 py-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 shadow-lg hover:scale-105 transition-transform duration-300 cursor-pointer"
            >
              See Details
            </Link>
          </div>
        </div>
      ))}
    </div>
    </>
  );
};

export default RecentBill;
