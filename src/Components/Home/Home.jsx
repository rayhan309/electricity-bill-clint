import { useEffect, useState } from "react";
import Banner from "../Banner/Banner";
import BillsCards from "../BillsCards/BillsCards";
import Footer from "../Footer/Footer";
import RecentBill from "../RecentBill/RecentBill";

const Home = () => {
  const [loading, setLoading] = useState(true);

  useEffect(()=> {
    setTimeout(() => {
        setLoading(false)
    }, 1400);
  }, [])

  return loading ? (
    <loading />
  ) : (
    <div>
      <Banner />
      <BillsCards />
      <RecentBill />
      <Footer />
    </div>
  );
};

export default Home;
