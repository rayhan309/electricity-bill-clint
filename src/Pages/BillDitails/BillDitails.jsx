import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router";
import { motion } from "framer-motion";
import Footer from "../../Components/Footer/Footer";
import { CircleChevronLeft } from "lucide-react";
import Loading from "../../Components/Laoding/Laoding";

const BillDitails = () => {
  const { id } = useParams();
  const [bill, setBill] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    axios(`http://localhost:3000/category/${id}`).then((res) => {
      setBill(res.data);
      setLoading(false);
    });
  }, [id]);

  if (loading) {
    return <Loading />;
  }

  if (!bill) return null;

  const {
    _id,
    title,
    category,
    amount,
    month,
    status,
    date,
    location,
    image,
    description,
  } = bill;
  // const newDate = new Date();
  // console.log({date, newDate})

  const handlePyBillBTN = () => {
    navigate(`/pyBill?ammount=${amount}&id=${_id}&title=${category}`);
  };

  return (
    <>
      <div className="py-20 px-6 relative overflow-hidden">
        {/* Back btn */}

        <button
          onClick={() => navigate(-1)}
          className="mb-10 px-6 py-2 rounded-full mt-6
          shadow-xl premium-btn flex items-center gap-3 w-30"
        >
          <CircleChevronLeft />
          <span>Back</span>
        </button>

        {/* Main Card */}
        <motion.div
          id="bill-area"
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="
            w-11/12 mx-auto grid md:grid-cols-2 gap-8
            backdrop-blur-xl
            border border-purple-500/20
            rounded-2xl shadow-[0_0_30px_rgba(191,191,191,1)]
            p-6 relative z-10
          "
        >
          {/* emg */}
          <motion.img
            initial={{ scale: 0.93 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            src={image}
            alt={title}
            className="rounded-xl shadow-lg h-full w-full object-cover max-h-[420px]"
          />

          {/* ditils card   */}
          <div className="flex justify-center items-center">
            <div className="space-y-3 md:space-y-5 lg:space-y-7">
              <h1 className="text-4xl font-extrabold text-white">{title}</h1>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:space-y-5 text-gray-300">
                <p>
                  <strong>Category:</strong> {category}
                </p>
                <p>
                  <strong>Amount:</strong> ${amount}
                </p>
                <p>
                  <strong>Month:</strong> {month}
                </p>
                <p>
                  <strong>Status:</strong>{" "}
                  <span
                    className={`font-bold ${
                      status === "Paid" ? "text-green-400" : "text-red-400"
                    }`}
                  >
                    {status}
                  </span>
                </p>
                <p>
                  <strong>Date:</strong> {new Date(date).toLocaleDateString()}
                </p>
                <p>
                  <strong>Location:</strong> {location}
                </p>
                <p>
                  <strong>ID:</strong> {_id}
                </p>
              </div>

              <p className="text-gray-400 pb-4 leading-relaxed">
                {description}
              </p>
              <Link onClick={handlePyBillBTN} className={`premium-btn  w-full`}>
                Pay Bill
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
      <Footer />
    </>
  );
};

export default BillDitails;
