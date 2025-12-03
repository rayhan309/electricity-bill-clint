import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Loading from "../Laoding/Laoding"; 


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
      <div className="w-full border-b h-2 mb-5 mt-5 opacity-30 border-amber-500 border-dashed shadow-lg shadow-amber-500/40"></div>
      <h2 className="text-3xl text-center mb-6 mt-10 font-bold text-orange-300/80">
        Recent Bills
      </h2>
      <div className="grid grid-cols-1 w-11/12 mx-auto md:grid-cols-2 lg:grid-cols-3 mb-16 gap-10">
        {bills.map((bill, index) => (
          <div
            key={index}
            className="relative max-h-66 rounded-xl overflow-hidden p-6 bg-white/10 backdrop-blur-md border border-white/20 shadow-neumorphic hover:shadow-[0_0_30px_rgba(191,191,191,1)] hover:scale-105 transform transition-all duration-500"
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
                <strong>Date:</strong>{" "}
                {new Date(bill.date).toLocaleDateString()}
              </p>

              {/* <!-- From Uiverse.io by gharsh11032000 -->  */}
              <button
                onClick={() => navigate(`/billDitails/${bill?._id}`)}
                className="animated-button"
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
          </div>
        ))}
      </div>
    </>
  );
};

export default RecentBill;
