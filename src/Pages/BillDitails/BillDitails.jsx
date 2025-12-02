import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router";
import { motion } from "framer-motion";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import Footer from "../../Components/Footer/Footer";

const BillDitails = () => {
  const { id } = useParams();
  const [bill, setBill] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios(`http://localhost:3000/category/${id}`).then((res) => {
      setBill(res.data);
      setLoading(false);
    });
  }, [id]);

  const handleDownloadPDF = async () => {
    const element = document.getElementById("bill-area");
    const canvas = await html2canvas(element);
    const img = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");

    const width = pdf.internal.pageSize.getWidth();
    const height = (canvas.height * width) / canvas.width;

    pdf.addImage(img, "PNG", 0, 0, width, height);
    pdf.save(`${bill.title}-Bill.pdf`);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="w-96 h-64 bg-gray-800/50 rounded-2xl shadow-lg animate-pulse"></div>
      </div>
    );
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

  return (
    <>
      <div className="py-20 px-6 relative overflow-hidden bg-black text-gray-200">
        {/* 🔮 Animated Gradient Orbs */}
        <div className="orb orb1"></div>
        <div className="orb orb2"></div>
        <div className="orb orb3"></div>

        {/* Back Button */}
        <Link
          to='/'
          className="inline-block mb-6 px-6 py-2 rounded-full  mt-6
        bg-gradient-to-r from-indigo-500 to-purple-600 
        text-white shadow-xl hover:scale-105 transition-all relative z-10"
        >
          ← Back
        </Link>

        {/* Main Card */}
        <motion.div
          id="bill-area"
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="
        w-11/12 mx-auto grid md:grid-cols-2 gap-8 
        bg-[#0d0f18]/80 backdrop-blur-xl 
        border border-purple-500/20 
        rounded-2xl shadow-[0_0_30px_rgba(138,43,226,0.3)] 
        p-6 relative z-10
        "
        >
          {/* Image */}
          <motion.img
            initial={{ scale: 0.93 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            src={image}
            alt={title}
            className="rounded-xl shadow-lg w-full object-cover max-h-[420px]"
          />

          {/* Details */}
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

              <p className="text-gray-400 leading-relaxed">{description}</p>
            </div>
          </div>
        </motion.div>

        {/* Buttons */}
        <div className="flex gap-4 mt-10 justify-center relative z-10">
          <button
            onClick={() => window.print()}
            className="px-6 py-2 rounded-full bg-gradient-to-r 
          from-fuchsia-500 to-pink-600 text-white shadow-lg hover:scale-105 transition-all"
          >
            Print
          </button>

          <button
            onClick={handleDownloadPDF}
            className="px-6 py-2 rounded-full bg-gradient-to-r 
          from-emerald-500 to-teal-500 text-white shadow-lg hover:scale-105 transition-all"
          >
            Download PDF
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default BillDitails;
