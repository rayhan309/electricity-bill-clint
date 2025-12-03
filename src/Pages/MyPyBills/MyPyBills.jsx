import axios from "axios";
import { use, useEffect, useState } from "react";
import { AuthContext } from "../../Context/AuthContext";
import Footer from "../../Components/Footer/Footer";
import Loading from "../../Components/Laoding/Laoding";

const MyPyBills = () => {
  const { user } = use(AuthContext);
  const [myPyBills, setMyPyBills] = useState([]);
  const [loading, setLoading] = useState(true);

  setTimeout(() => {
    setLoading(false);
  }, 1000);

  useEffect(() => {
    axios(`http://localhost:3000/pyBills?email=${user?.email}`).then((res) => {
      if (res.data) {
        setMyPyBills(res.data);
      }
    });
  }, [user?.email]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="min-h-[calc(100vh-285px)] pt-28 px-6">
          <h1 className="text-center text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#fbbf24] to-[#fb923c] tracking-wide drop-shadow-lg">
            My Paid Bills
          </h1>

          <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {myPyBills.map((bill) => (
              <div
                key={bill._id}
                className="p-6 rounded-2xl backdrop-blur-xl bg-white/5 border border-white/10 shadow-[0_0_20px_rgba(100,100,255,0.2)] hover:shadow-[0_0_35px_rgba(191,191,191,1)] hover:-translate-y-2 transition-all duration-300"
              >
                <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#fbbf24] to-[#fb923c] drop-shadow-md">
                  {bill.name}
                </h2>

                <p className="text-gray-300 mt-2 text-sm">{bill.email}</p>

                <div className="mt-3 space-y-2 text-gray-200 text-sm">
                  <p>
                    <span className="text-purple-300 font-semibold">
                      Phone:
                    </span>{" "}
                    {bill.phone}
                  </p>
                  <p>
                    <span className="text-purple-300 font-semibold">
                      Bill ID:
                    </span>{" "}
                    {bill.billId}
                  </p>
                  <p>
                    <span className="text-purple-300 font-semibold">
                      Amount: $
                    </span>{" "}
                    {bill.amount}
                  </p>
                  <p>
                    <span className="text-purple-300 font-semibold">Date:</span>{" "}
                    {bill.date}
                  </p>
                  <p>
                    <span className="text-purple-300 font-semibold">
                      Address:
                    </span>{" "}
                    {bill.address}
                  </p>
                </div>

                <p className="mt-4 text-gray-300 text-sm">{bill.description}</p>

                <div className="mt-5 flex justify-end">
                  <span className="px-4 py-1 rounded-xl bg-gradient-to-r from-[#fbbf24] to-[#fb923c] text-white text-xs font-semibold shadow-lg">
                    Paid
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      <Footer />
    </>
  );
};

export default MyPyBills;
