import axios from "axios";
import { useEffect, useState, useContext, useRef } from "react";
import { AuthContext } from "../../Context/AuthContext";
import Footer from "../../Components/Footer/Footer";
import Loading from "../../Components/Laoding/Laoding";
import { motion } from "framer-motion";

import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import Swal from "sweetalert2";
import {
  Calendar,
  CircleDollarSign,
  CircleFadingArrowUp,
  HousePlus,
  IdCardLanyard,
  Mail,
  Phone,
  Trash,
  User,
} from "lucide-react";
// import { saveAs } from "file-saver";

const MyPyBills = () => {
  const { user } = useContext(AuthContext);
  const [myPyBills, setMyPyBills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalAmount, setTotalAmount] = useState(0);
  const [updateId, setUpdateId] = useState({});
  const deleteRef = useRef();

  setTimeout(() => setLoading(false), 1000);

  useEffect(() => {
    if (!user?.email) return;
    axios(
      `https://smart-bills-orcin.vercel.app/pyBills?email=${user.email}`
    ).then((res) => {
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

  // dilete
  const hadleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`http://localhost:3000/pyBills/${id}`).then((res) => {
          // console.log(res.data)
          if (res?.data?.deletedCount) {
            const newPyBills = myPyBills.filter((bill) => bill?._id !== id);
            setMyPyBills(newPyBills);
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
          }
        });
      }
    });
  };

  // update modale
  const handleUpdate = (obj) => {
    deleteRef.current.showModal();
    setUpdateId(obj);
  };

  // handleUpdaye
  const handleUpdaye = (e) => {
    e.preventDefault();

    const name = e.target.name.value;
    // const email = e.target.email.value;
    const phone = e.target.phone.value;
    // const id = e.target.id.value;
    // const amount = e.target.amount.value;
    const date = e.target.date.value;
    const address = e.target.address.value;

    const updatePyBill = {
      name,
      phone,
      date,
      address,
    };

    // console.log(updateId);
    axios
      .patch(`http://localhost:3000/pyBills/${updateId?._id}`, updatePyBill)
      .then((res) => {
        if (res.data) {
          const fined = myPyBills.find(b => b._id === updateId._id);
          const filtered = myPyBills.filter(b => b._id !== updateId._id)
          const uiNew = {...fined, name, phone, date, address}
          const newArr = [uiNew, ...filtered]
          // console.log({newArr});
          setMyPyBills(newArr);
          deleteRef.current.close();
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Your work has been saved",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      })
      .catch(() => alert("mumma khaiso!"));
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
              disabled={myPyBills.length === 0}
              className={`${myPyBills.length === 0 && "opacity-70 cursor-not-allowed"} cursor-pointer group relative flex gap-1.5 px-6 py-3  bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-400 bg-opacity-40 text-[#f1f1f1] rounded-3xl hover:bg-opacity-20 transition font-semibold shadow-md`}
            >
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
              <div className={`${myPyBills.length === 0 && "hidden"} absolute opacity-0 -bottom-full rounded-md py-2 px-2 bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-400 bg-opacity-70 text-white left-1/2 -translate-x-1/2 group-hover:opacity-100 transition-opacity shadow-lg z-50`}>
                Download
              </div>
            </button>

            {/* <div className="container">
              <label className="label">
                <input type="checkbox" className="input" />
                <span className="circle">
                  <svg
                    className="icon"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="1.5"
                      d="M12 19V5m0 14-4-4m4 4 4-4"
                    ></path>
                  </svg>
                  <div className="square"></div>
                </span>
                <p className="title">Download</p>
                <p className="title">Open</p>
              </label>
            </div> */}
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
                        onClick={() => handleUpdate(bill)}
                        whileHover={{ scale: 1.1 }}
                        className="px-3 py-1 btn border-none bg-blue-500 text-white rounded hover:opacity-90 shadow-md transition-all"
                      >
                        <CircleFadingArrowUp width={18} />
                        Update
                      </motion.button>

                      <motion.button
                        whileHover={{
                          scale: 1.1,
                          boxShadow: "0px 0px 15px rgba(255,0,0,0.7)",
                        }}
                        onClick={() => hadleDelete(bill._id)}
                        className="px-3 py-1 btn border-none bg-red-500 text-white rounded hover:opacity-90 shadow-md transition-all"
                      >
                        <Trash width={15} />
                        Delete
                      </motion.button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Update Modal */}
          <dialog
            ref={deleteRef}
            className="modal modal-bottom sm:modal-middle"
          >
            <div className="modal-box bg-white/50">
              <form
                onSubmit={handleUpdaye}
                className="w-full max-w-2xl mx-auto backdrop-blur-md p-8"
              >
                <h2
                  className="text-2xl font-semibold mb-6 bg-gradient-to-r from-yellow-400 to-orange-500 
            bg-clip-text text-transparent"
                >
                  Update Your Info
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* FULL NAME */}
                  <div className="relative">
                    <User
                      className="absolute left-3 top-3 text-yellow-300"
                      size={20}
                    />
                    <input
                      type="text"
                      name="name"
                      defaultValue={updateId?.name}
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5
              border border-white/20 text-white 
              focus:ring-2 focus:ring-yellow-300 
              transition-all outline-none"
                      required
                    />
                  </div>

                  {/* email */}
                  <div className="relative">
                    <Mail
                      className="absolute left-3 top-3 text-yellow-300"
                      size={20}
                    />
                    <input
                      type="email"
                      name="email"
                      value={updateId?.email}
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 
              border border-white/20 text-white
              focus:ring-2 focus:ring-yellow-400 transition-all"
                      readOnly
                    />
                  </div>

                  {/* phone */}
                  <div className="relative">
                    <Phone
                      className="absolute left-3 top-3 text-orange-300"
                      size={20}
                    />
                    <input
                      type="text"
                      name="phone"
                      defaultValue={updateId?.phone}
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5
              border border-white/20 text-white 
              focus:ring-2 focus:ring-yellow-400 transition-all"
                      required
                    />
                  </div>

                  {/* bill id */}
                  <div className="relative">
                    <IdCardLanyard
                      className="absolute left-3 top-3 text-orange-300"
                      size={20}
                    />
                    <input
                      type="text"
                      name="id"
                      value={updateId?.billId}
                      readOnly
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5
              border border-white/20 text-white 
              focus:ring-2 focus:ring-yellow-400 transition-all"
                      required
                    />
                  </div>

                  {/* Amount */}
                  <div className="flex flex-col relative">
                    <CircleDollarSign
                      className="absolute left-3 top-3.5 text-orange-300"
                      size={20}
                    />
                    <input
                      type="text"
                      name="amount"
                      value={updateId?.amount}
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 
              border border-white/20 text-white 
              focus:ring-2 focus:ring-yellow-400 
              transition-all outline-none "
                      readOnly
                    />
                  </div>

                  {/* data */}
                  <div className="flex flex-col relative">
                    <Calendar
                      className="absolute left-3 top-3.5 text-orange-300"
                      size={20}
                    />
                    <input
                      type="text"
                      name="date"
                      value={new Date().toDateString()}
                      readOnly
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 
              border border-white/20 text-white 
              focus:ring-2 focus:ring-yellow-400 
              transition-all outline-none "
                    />
                  </div>

                  {/* adress */}
                  <div className="flex flex-col relative">
                    <HousePlus
                      className="absolute left-3 top-3.5 text-orange-300"
                      size={20}
                    />
                    <input
                      type="text"
                      name="address"
                      defaultValue={updateId?.address}
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 
              border border-white/20 text-white 
              focus:ring-2 focus:ring-yellow-400 
              transition-all outline-none "
                    />
                  </div>
                </div>

                <button className="mt-6 w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-400 text-white font-semibold shadow-md hover:opacity-90 transition cursor-pointer">
                  Submit
                </button>
              </form>

              <div className="modal-action">
                <form method="dialog">
                  {/* if there is a button in form, it will close the modal */}
                  <button className="premium-btn">Close</button>
                </form>
              </div>
            </div>
          </dialog>
        </div>
      )}

      <Footer />
    </>
  );
};

export default MyPyBills;
