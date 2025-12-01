import { use } from "react";
import { Link, NavLink } from "react-router";
import { AuthContext } from "../../Context/AuthContext";
import Swal from "sweetalert2";
import logo from '../../assets/logo.png'

const Navber = () => {
  const { user, signOutUser } = use(AuthContext);

  const links = (
    <>
      <li>
        <NavLink to={"/"}>Home</NavLink>
      </li>
      <li>
        <NavLink to={"/bills"}>Bills</NavLink>
      </li>
      {user && (
        <>
        <li>
          <NavLink to={"/myPyBills"}>My Pay Bills</NavLink>
        </li>
        <li>
          <NavLink to={'/userProfile'}>Profile Avatar</NavLink>
        </li>
        </>
      )}
    </>
  );

  // lognout
  const handleLogOut = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, logOut it!",
    }).then((result) => {
      if (result.isConfirmed) {
        signOutUser().then(() => {
          Swal.fire({
            title: "LogOut!",
            text: "Your account has been logOuted.",
            icon: "success",
          });
        });
      }
    });
  };

  return (
    <div className="navbar px-10 bg-gray-200 shadow-sm">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex="-1"
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            {links}
          </ul>
        </div>
       <div className="flex items-center gap-4">
         <img className="w-12 rounded-full cursor-pointer" title="MyBill Manager" src={logo} alt="logo" />
        <h3 className="text-xl font-semibold">MyBill Manager</h3>
       </div>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{links}</ul>
      </div>
      <div className="navbar-end">
        {user ? (
          <button onClick={handleLogOut} className="btn">
            LogOut
          </button>
        ) : (
          <Link to={"/login"} className="btn">
            LogIn
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navber;
