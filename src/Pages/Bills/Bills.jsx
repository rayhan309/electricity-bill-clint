import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router";
import Footer from "../../Components/Footer/Footer";
import Loading from "../../Components/Laoding/Laoding";
import { ChevronRight } from "lucide-react";
// import { motion, useScroll } from "framer-motion";

const Bills = () => {
  const [bills, setBills] = useState([]); // filtered bills
  const [allBills, setAllBills] = useState([]); // original bills
  const [loading, setLoading] = useState(true);
  const [inputLoad, setInputLoad] = useState(false);
  const searchRef = useRef();
  const navigate = useNavigate();
  // const { scrollYProgress } = useScroll();

  // Fetch data only once
  useEffect(() => {
    axios("http://localhost:3000/category").then((res) => {
      setBills(res.data);
      setAllBills(res.data);
      setLoading(false);
    });
  }, []);

  // Search handler
  const searchHandle = () => {
    setInputLoad(true);

    const text = searchRef.current.value;

    if (text.length > 0) {
      const filtered = allBills.filter((bill) =>
        bill?.category?.toLowerCase().includes(text.toLowerCase())
      );
      setBills(filtered);
    } else {
      setBills(allBills);
    }

    setTimeout(() => {
      setInputLoad(false);
    }, 700);
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div>
          <div className="flex justify-center pt-26 items-center gap-5">
            <h2 className="text-3xl font-bold text-orange-300/80">All Bills</h2>

            <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-orange-400/80 to-yellow-500/80 flex items-center justify-center shadow-lg shadow-orange-500/40">
              <span className="text-2xl font-bold">⚡</span>
            </div>
          </div>

          <div className="w-full border-b h-2 mt-5 opacity-30 border-amber-500 border-dashed shadow-lg shadow-amber-500/40"></div>

          <div className="w-11/12 mx-auto flex justify-between items-center mt-10">
            <h3 className="text-xl font-bold text-white/30">
              Totale Bills{" "}
              <span className="text-amber-300/60">({bills.length})</span> Founts
            </h3>

            <label className="input rounded-xl bg-white/5 border border-white/20 text-white outline-none">
              <svg
                className="h-[1em] opacity-50"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <g
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2.5"
                  fill="none"
                  stroke="currentColor"
                >
                  <circle cx="11" cy="11" r="8"></circle>
                  <path d="m21 21-4.3-4.3"></path>
                </g>
              </svg>

              <input
                type="search"
                ref={searchRef}
                className="grow"
                placeholder="Search"
                onChange={searchHandle}
              />

              <kbd className="kbd kbd-sm bg-white/40 cursor-pointer">⌘</kbd>
              <kbd className="kbd kbd-sm bg-white/40 cursor-pointer">K</kbd>
            </label>
          </div>

          <div className="w-full border-b h-2 mb-5 mt-5 opacity-30 border-amber-500 border-dashed shadow-lg shadow-amber-500/40"></div>

          {inputLoad ? (
            <Loading />
          ) : (
            <div className="grid grid-cols-1 w-11/12 mx-auto md:grid-cols-2 lg:grid-cols-3 mb-16 gap-10">
              {bills.map((bill, index) => (
                <div
                  key={index}
                  data-aos="fade-left"
                  className="relative max-h-66 rounded-xl overflow-hidden p-6 bg-white/10 backdrop-blur-md border border-white/20 shadow-neumorphic hover:shadow-[0_0_30px_rgba(191,191,191,1)] hover:scale-105 transform transition-all duration-500"
                  style={{
                    backgroundImage:
                      "linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))",
                  }}
                >
                  <div
                    className="absolute inset-0 bg-cover bg-center opacity-70"
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
                    <button onClick={() => navigate(`/billDitails/${bill?._id}`)} class="animated-button">
                      <svg
                        viewBox="0 0 24 24"
                        class="arr-2"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"></path>
                      </svg>
                      <span class="text">See Details</span>
                      <span class="circle"></span>
                      <svg
                        viewBox="0 0 24 24"
                        class="arr-1"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"></path>
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      <Footer />
    </>
  );
};

export default Bills;
