import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";
import Footer from "../../Components/Footer/Footer";
import Loading from "../../Components/Laoding/Laoding";
import { motion, AnimatePresence } from "framer-motion";

import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
// import { saveAs } from "file-saver";

const MyPyBills = () => {
  const { user } = useContext(AuthContext);
  const [myPyBills, setMyPyBills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalAmount, setTotalAmount] = useState(0);
  const [updateModal, setUpdateModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  setTimeout(() => setLoading(false), 1000);

  useEffect(() => {
    if (!user?.email) return;
    axios(`https://smart-bills-orcin.vercel.app/pyBills?email=${user.email}`).then((res) => {
      if (res.data) {
        setMyPyBills(res.data);
        const total = res.data.reduce(
          (sum, bill) => sum + Number(bill.amount),
          0
        );
        setTotalAmount(total);
      }
    });
  }, [user?.email]);

  const handleDownloadPDF = () => {
    const doc = new jsPDF("landscape");

    doc.setFontSize(18);
    doc.text("My Paid Bills Report", 14, 15);

    const columns = [
      "Name",
      "Email",
      "Phone",
      "Bill ID",
      "Amount ($)",
      "Pay Date",
      "Address",
      "Status",
    ];

    const rows = myPyBills.map((bill) => [
      bill.name,
      bill.email,
      bill.phone,
      bill.billId,
      bill.amount,
      bill.date,
      bill.address,
      "Paid",
    ]);

    autoTable(doc, {
      head: [columns],
      body: rows,
      startY: 25,
      styles: { fontSize: 9 },
      headStyles: { fillColor: [255, 150, 0] },
    });

    doc.save("my_paid_bills.pdf");
  };
  
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="min-h-[calc(100vh-285px)] pt-28 px-6">
          <h1 className="text-center text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-400 to-yellow-400 drop-shadow-xl">
            My Paid Bills
          </h1>

          {/* Total + Download */}
          <div className="flex flex-col md:flex-row items-center justify-between mt-6 mb-4">
            <div className="text-gray-200 text-sm md:text-base font-medium space-y-1">
              <p>Total Bill Paid: {myPyBills.length}</p>
              <p>Total Amount: ${totalAmount.toLocaleString()}</p>
            </div>

            {/* <!-- From Uiverse.io by sahilxkhadka -->  */}
            <button
            onClick={handleDownloadPDF}
             className="cursor-pointer group relative flex gap-1.5 px-6 py-3  bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-400 bg-opacity-40 text-[#f1f1f1] rounded-3xl hover:bg-opacity-20 transition font-semibold shadow-md">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                height="24px"
                width="24px"
              >
                <g stroke-width="0" id="SVGRepo_bgCarrier"></g>
                <g
                  stroke-linejoin="round"
                  stroke-linecap="round"
                  id="SVGRepo_tracerCarrier"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  {" "}
                  <g id="Interface / Download">
                    {" "}
                    <path
                      stroke-linejoin="round"
                      stroke-linecap="round"
                      stroke-width="2"
                      stroke="#f1f1f1"
                      d="M6 21H18M12 3V17M12 17L17 12M12 17L7 12"
                      id="Vector"
                    ></path>{" "}
                  </g>{" "}
                </g>
              </svg>
              Download PDF
              <div className="absolute opacity-0 -bottom-full rounded-md py-2 px-2 bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-400 bg-opacity-70 text-white left-1/2 -translate-x-1/2 group-hover:opacity-100 transition-opacity shadow-lg z-50">
                Download
              </div>
            </button>
          </div>

          {/* Table */}
          <div className="overflow-x-auto rounded-2xl backdrop-blur-xl bg-white/5 border border-white/10 shadow-xl">
            <table className="min-w-full text-sm text-gray-200">
              <thead>
                <tr className="text-left bg-white/10 border-b border-white/10">
                  <th className="px-6 py-4">Name</th>
                  <th className="px-6 py-4">Email</th>
                  <th className="px-6 py-4">Phone</th>
                  <th className="px-6 py-4">Bill ID</th>
                  <th className="px-6 py-4">Amount</th>
                  <th className="px-6 py-4">Pay Date</th>
                  <th className="px-6 py-4">Address</th>
                  <th className="px-6 py-4 text-center">Status</th>
                  <th className="px-6 py-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {myPyBills.map((bill) => (
                  <motion.tr
                    key={bill._id}
                    whileHover={{
                      scale: 1.01,
                      backgroundColor: "rgba(255,255,255,0.05)",
                    }}
                    className="border-b border-white/10 transition"
                  >
                    <td className="px-6 py-4">{bill.name}</td>
                    <td className="px-6 py-4">{bill.email}</td>
                    <td className="px-6 py-4">{bill.phone}</td>
                    <td className="px-6 py-4">{bill.billId}</td>
                    <td className="px-6 py-4">${bill.amount}</td>
                    <td className="px-6 py-4">{bill.date}</td>
                    <td className="px-6 py-4">{bill.address}</td>
                    <td className="px-6 py-4 text-center">
                      <span className="px-3 py-1 rounded-xl bg-gradient-to-r from-green-400 to-teal-500 text-white text-xs font-semibold shadow-lg">
                        Paid
                      </span>
                    </td>

                    <td className="px-6 py-4 text-center space-x-2 flex flex-wrap gap-4">
                      <motion.button
                        onClick={() => setUpdateModal(true)}
                        whileHover={{ scale: 1.1 }}
                        className="px-3 py-1 bg-blue-500 text-white rounded hover:opacity-90 shadow-md transition-all"
                      >
                        Update
                      </motion.button>

                      <motion.button
                        onClick={() => setDeleteModal(true)}
                        whileHover={{
                          scale: 1.1,
                          boxShadow: "0px 0px 15px rgba(255,0,0,0.7)",
                        }}
                        className="px-3 py-1 bg-red-500 text-white rounded hover:opacity-90 shadow-md transition-all"
                      >
                        Delete
                      </motion.button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Update Modal */}
          <AnimatePresence>
            {updateModal && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
              >
                <motion.div
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0.8 }}
                  className="bg-gray-900 p-6 rounded-2xl w-96 shadow-xl"
                >
                  <h2 className="text-xl font-bold text-white mb-4">
                    Update Bill
                  </h2>

                  <input
                    type="number"
                    placeholder="Amount"
                    className="w-full mb-2 p-2 rounded bg-gray-800 text-white"
                  />
                  <input
                    type="text"
                    placeholder="Address"
                    className="w-full mb-2 p-2 rounded bg-gray-800 text-white"
                  />
                  <input
                    type="text"
                    placeholder="Phone"
                    className="w-full mb-2 p-2 rounded bg-gray-800 text-white"
                  />
                  <input
                    type="date"
                    className="w-full mb-4 p-2 rounded bg-gray-800 text-white"
                  />

                  <div className="flex justify-end space-x-2">
                    <button
                      onClick={() => setUpdateModal(false)}
                      className="px-3 py-1 bg-gray-600 text-white rounded"
                    >
                      Cancel
                    </button>
                    <button className="px-3 py-1 bg-blue-500 text-white rounded">
                      Update
                    </button>
                  </div>
                </motion.div>
              </motion.div>
            )}

            {/* Delete Modal */}
            {deleteModal && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
              >
                <motion.div
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0.8 }}
                  className="bg-gray-900 p-6 rounded-2xl w-96 shadow-xl"
                >
                  <h2 className="text-xl font-bold text-white mb-4">
                    Confirm Delete
                  </h2>
                  <p className="text-gray-300 mb-4">
                    Are you sure you want to delete this bill permanently?
                  </p>

                  <div className="flex justify-end space-x-2">
                    <button
                      onClick={() => setDeleteModal(false)}
                      className="px-3 py-1 bg-gray-600 text-white rounded"
                    >
                      Cancel
                    </button>

                    <motion.button
                      whileHover={{
                        scale: 1.1,
                        boxShadow: "0px 0px 15px rgba(255,0,0,0.7)",
                      }}
                      className="px-3 py-1 bg-red-500 text-white rounded"
                    >
                      Delete
                    </motion.button>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}

      <Footer />
    </>
  );
};

export default MyPyBills;
