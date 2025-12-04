import axios from "axios";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import { useParams, useNavigate } from "react-router";
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

  // console.log(bill, format(new Date(), "MMMM"));

  if (loading) {
    return <Loading />;
  }

  if (!bill) return null;

  const {
    _id,
    title,
    category,
    amount,
    status, 
    date,
    location,
    image,
    description,
  } = bill;

 

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

        {/* card div */}
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
                  <strong>Month:</strong> {bill.month.split("-")[0]}
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
                  <strong>Date:</strong> {date}
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
              {/* <!-- From Uiverse.io by gharsh11032000 -->  */}
              <button
                onClick={handlePyBillBTN}
                disabled={format(new Date(), "MMMM") !== bill.month.split("-")[0] || status === "Paid"}
                className={`animated-button -mt-2 ${format(new Date(), "MMMM") !== bill.month.split("-")[0] && "opacity-50" || status === "Paid" && "opacity-50"}`}
              >
                <svg
                  viewBox="0 0 24 24"
                  className="arr-2"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"></path>
                </svg>
                <span className="text">Py Bill</span>
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
        </motion.div>
      </div>

      <Footer />
    </>
  );
};

export default BillDitails;
