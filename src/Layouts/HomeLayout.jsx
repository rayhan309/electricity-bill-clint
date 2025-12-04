import { Outlet } from "react-router";
import Navber from "../Components/Navber/Navber";
import { useEffect, useState } from "react";
import Loading from "../Components/Laoding/Laoding";

const HomeLayout = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1400);
  }, []);

  return loading ? (
    <Loading />
  ) : (
    <div>
      <Navber />
      <Outlet />
    </div>
  );
};

export default HomeLayout;
