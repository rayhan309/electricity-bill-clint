import { use } from "react";
import { Link, NavLink } from "react-router";
import { AuthContext } from "../../Context/AuthContext";
import Swal from "sweetalert2";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const Navber = () => {
  const { user, signOutUser } = use(AuthContext);
  const [open, setOpen] = useState(false);

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
              Profile Avatar
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
        {/* LOGO */}
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

        {/* Desktop Menu */}
        <ul className="hidden lg:flex items-center gap-10 text-orange-300">{links}</ul>

        {/* Desktop Button */}
        <div className="hidden lg:block">
          {user ? (
            <button onClick={handleLogOut} className="premium-btn">
              Logout
            </button>
          ) : (
            <Link to={"/login"} className="premium-btn">
              Login
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button className="lg:hidden text-orange-300 cursor-pointer" onClick={() => setOpen(!open)}>
          {open ? <X size={32} /> : <Menu size={32} />}
        </button>
      </nav>
      {/* Mobile Dropdown */}
      {open && (
        <div className="lg:hidden backdrop-blur-xl bg-white/10 border-t border-white/20 p-5">
          <ul className="flex flex-col gap-4 text-white">{links}</ul>

          {user ? (
            <button onClick={handleLogOut} className="premium-btn mt-4 w-full">
              Logout
            </button>
          ) : (
            <Link to={"/login"} className="premium-btn mt-4 w-full">
              Login
            </Link>
          )}
        </div>
      )}
      
    </header>
  );
};

export default Navber;
