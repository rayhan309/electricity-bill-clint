import { createBrowserRouter } from "react-router";
import HomeLayout from "../Layouts/HomeLayout";
import Home from "../Components/Home/Home";
import LogIn from "../Pages/Login/LogIn";
import Bills from "../Pages/Bills/Bills";
import SignUp from "../Pages/SignUp/SignUp";
import PrivitePages from "../Context/PrivitePages";
import MyPyBills from "../Pages/MyPyBills/MyPyBills";
import Profile from "../Pages/Profile/Profile";
import BillDitails from "../Pages/BillDitails/BillDitails";
import PayBill from "../Pages/PyBills/PyBills";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: HomeLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "/login",
        Component: LogIn,
      },
      {
        path: "signUp",
        Component: SignUp,
      },
      {
        path: "/bills",
        Component: Bills,
      },
      {
        path: "/myPyBills",
        element: (
          <PrivitePages>
            <MyPyBills />
          </PrivitePages>
        ),
      },
      {
        path: "/userProfile",
        element: (
          <PrivitePages>
            <Profile />
          </PrivitePages>
        ),
      },
      {
        path: "/billDitails/:id",
        element: <BillDitails />,
      },
      {
        path: "pyBill",
        element: (
          <PrivitePages>
            <PayBill />
          </PrivitePages>
        ),
      },
    ],
  },
]);
