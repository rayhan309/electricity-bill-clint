import { useContext, useRef, useState } from "react";
import { AuthContext } from "../../Context/AuthContext";
import Loading from "../../Components/Laoding/Laoding";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
import { Image, Phone, User } from "lucide-react";
import { motion } from "framer-motion";

// import axios from "axios";

const UserProfile = () => {
  const { user, updateUserProfile, signOutUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const updateRef = useRef();
  const [number, setNumber] = useState("");

  setTimeout(() => {
    setLoading(false);
  }, 1000);

  // useEffect(() => {
  //   // axios(`http://localhost:3000/users/${user?.email}`).then(res => console.log(res.data));

  // }, [user?.email])

  // updateHandle
  const updateHandle = (e) => {
    e.preventDefault();

    const form = e.target;
    const name = form.name.value;
    const photo = form.photo.value;
    const phone = form.phone.value;

    setNumber(phone);
    // console.log("ok done!", {name, phone, photo});
    updateUserProfile(name, photo)
      .then(() => {
        e.target.reset();
        updateRef.current.close();
      })
      .catch((err) => {
        console.log(err);
      });
  };

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
          navigate("/");
        });
      }
    });
    // console.log("mummmu");
  };

  return loading ? (
    <Loading />
  ) : (
    <>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="min-h-screen relative flex items-center justify-center px-4 py-20 overflow-hidden"
      >
        <div className="relative z-10 w-full max-w-4xl rounded-3xl shadow-[0_0_50px_rgba(191,191,191,1)] p-10 grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Avatar */}
          <div className="flex flex-col items-center justify-center">
            <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-gradient-to-r from-purple-500 via-indigo-500 to-pink-500 shadow-[0_0_25px_rgba(191,191,191,1)] animate-pulse">
              <img
                src={user?.photoURL}
                alt={"User Avatar"}
                className="w-full h-full object-cover"
              />
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-white mt-4">
              {user?.displayName || "User Name"}
            </h2>
            <p className="text-gray-300 mt-1">
              {user?.email || "user@email.com"}
            </p>
          </div>

          {/* User Info Grid */}
          <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-gray-400">User name</h4>
              <p className="text-white font-semibold">
                {user?.displayName || "N/A"}
              </p>
            </div>

            <div>
              <h4 className="text-gray-400">Phone</h4>
              <p className="text-white font-semibold">{number || "N/A"}</p>
            </div>

            <div>
              <h4 className="text-gray-400">Address</h4>
              <p className="text-white font-semibold">
                {user?.address || "Bangladesh"}
              </p>
            </div>

            <div>
              <h4 className="text-gray-400">Member Since</h4>
              <p className="text-white font-semibold">
                {new Date().toLocaleDateString() || "N/A"}
              </p>
            </div>
          </div>

          {/* Optional Action Buttons */}
          <div className="md:col-span-3 flex justify-center mt-6 gap-6">
            <button
              onClick={() => updateRef.current.showModal()}
              className="premium-btn"
            >
              Edit Profile
            </button>
            <button onClick={handleLogOut} className="premium-btn">
              Logout
            </button>
          </div>
        </div>
      </motion.div>

      {/* Update Modal */}
      <dialog ref={updateRef} className="modal modal-bottom sm:modal-middle">
        <div className="modal-box bg-white/20 w-11/12 mx-auto">
          <form onSubmit={updateHandle} className="w-full backdrop-blur-md p-8">
            <h2
              className="text-2xl font-semibold mb-6 bg-gradient-to-r from-yellow-400 to-orange-500 
            bg-clip-text text-transparent"
            >
              Update Your Profile!
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
                  defaultValue={user?.displayName}
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5
              border border-white/20 text-white 
              focus:ring-2 focus:ring-yellow-300 
              transition-all outline-none"
                  required
                />
              </div>

              {/* photo */}
              <div className="relative">
                <Image
                  className="absolute left-3 top-3.5 text-yellow-300"
                  size={20}
                />
                <input
                  type="text"
                  name="photo"
                  placeholder="Your Photo URL"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 
              border border-white/20 text-white
              focus:ring-2 focus:ring-yellow-400 transition-all"
                  required
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
                  placeholder="Your Phone Number"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5
              border border-white/20 text-white 
              focus:ring-2 focus:ring-yellow-400 transition-all"
                  required
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
    </>
  );
};

export default UserProfile;
