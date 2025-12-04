import { use } from "react";
import { Link, NavLink, useNavigate } from "react-router";
import { AuthContext } from "../../Context/AuthContext";
import Swal from "sweetalert2";
import { House, Menu, X, ChevronDown } from "lucide-react";
import { useState } from "react";

const Navber = () => {
  const { user, signOutUser } = use(AuthContext);
  const [open, setOpen] = useState(false); 
  const [dropdown, setDropdown] = useState(false);
  const navigate = useNavigate();

  const links = (
    <>
      <li>
        <NavLink to={"/"} className="premium-link">
          Home
        </NavLink>
      </li>
      <li>
        <NavLink to={"/bills"} className="premium-link">
          Bills
        </NavLink>
      </li>

      {user && (
        <>
          <li>
            <NavLink to={"/myPyBills"} className="premium-link">
              My Pay Bills
            </NavLink>
          </li>
          <li>
            <NavLink to={"/userProfile"} className="premium-link">
              My Profile
            </NavLink>
          </li>
        </>
      )}
    </>
  );

  // LogOut
  const handleLogOut = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#f59e0b",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Logout!",
    }).then((result) => {
      if (result.isConfirmed) {
        signOutUser().then(() => {
          Swal.fire("Logged Out!", "You have been logged out.", "success");
        });
      }
    });
  };

  return (
    <header className="fixed top-0 left-0 w-full backdrop-blur-xl bg-white/10 border-b border-white/20 shadow-lg z-50">
      <nav className="w-11/12 mx-auto px-6 py-3 flex justify-between items-center">
        {/* titlt */}
        <div className="flex items-center gap-3">
          <div
            className="h-12 w-12 rounded-xl bg-gradient-to-br from-orange-400 to-yellow-500 
            flex items-center justify-center shadow-lg shadow-orange-500/40"
          >
            <span className="text-2xl font-bold">⚡</span>
          </div>
          <h2
            className="text-2xl font-bold tracking-wide bg-gradient-to-r from-yellow-400 to-orange-500 
            bg-clip-text text-transparent"
          >
            SmartBills
          </h2>
        </div>

        {/* boro dice */}
        <ul className="hidden lg:flex items-center gap-5 text-orange-300">
          {links}
        </ul>

        {/* user img & manu */}
        {user ? (
          <div className="hidden lg:flex items-center relative">
            <div
              className="flex items-center gap-1 cursor-pointer"
              onClick={() => setDropdown(!dropdown)}
            >
              <img
              title={user?.displayName}
                src={
                  user.photoURL || "https://i.pravatar.cc/300"
                }
                alt="profile"
                className="w-12 h-12 rounded-full border border-gray-300"
              />
              <span className="font-medium">{user.name}</span>
              <ChevronDown size={20} className={`text-orange-300 opacity-80 ${dropdown && "rotate-180"}`} />
            </div>

            {dropdown && (
              <div className="absolute right-3 mt-52 w-48 text-white bg-white/70  rounded-lg shadow-lg z-50">
                <div
                  className="block px-4 py-2 hover:bg-white/30 cursor-pointer"
                  onClick={() => {
                    navigate("/settigns");
                    setDropdown(false);
                  }}
                >
                  Settings
                </div>
                <div
                  className="block px-4 py-2 hover:bg-white/30 cursor-pointer"
                  onClick={() => {
                    navigate("/userProfile");
                    setDropdown(false);
                  }}
                >
                  My Profile
                </div>
                <div
                  className="block px-4 py-2 hover:bg-white/30 cursor-pointer"
                  onClick={() => {
                    handleLogOut();
                    setDropdown(false);
                  }}
                >
                  Logout
                </div>
                <div
                  className="block px-4 py-2 hover:bg-white/30 cursor-pointer"
                  onClick={() => {
                    // navigate("/help");
                    setDropdown(false);
                  }}
                >
                  Help / FAQ
                </div>
              </div>
            )}
          </div>
        ) : (
          <Link to={"/login"} className="premium-btn hidden lg:block">
            Login
          </Link>
        )}

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden text-orange-300 cursor-pointer"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={32} /> : <Menu size={32} />}
        </button>
      </nav>

      {/* Mobile Dropdown */}
      {open && (
        <div className="lg:hidden backdrop-blur-xl bg-white/10 p-5">
          <ul className="flex flex-col gap-4 text-orange-300">{links}</ul>

          {user ? (
            <button onClick={handleLogOut} className="premium-btn mt-4 w-full">
              Logout
            </button>
          ) : (
            <button className="premium-btn mt-3 w-full">
              <Link to={"/login"}>Login</Link>
            </button>
          )}
        </div>
      )}


    </header> 
  );
};

export default Navber;
