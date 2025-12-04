import { use, useState } from "react";
import { Link, useNavigate } from "react-router";
import { toast, ToastContainer } from "react-toastify";
import { AuthContext } from "../../Context/AuthContext";
import Swal from "sweetalert2";
import {
  User,
  Mail,
  Lock,
  Image as ImageIcon,
  Eye,
  EyeOff,
} from "lucide-react";
import axios from "axios";

const SignUp = () => {
  const { createUser, updateUserProfile, signinWithGoggle } = use(AuthContext);
  const navigate = useNavigate();
  const [passwordEy, setPasswordEy] = useState(false);

  // sign Up with email & password
  const handleSubmit = (e) => {
    e.preventDefault();

    const form = e.target;
    const name = form.name.value;
    const photo = form.photo.value;
    const email = form.email.value;
    const password1 = form.password1.value;
    const password2 = form.password2.value;
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z]).{8,}$/;

    if (!emailRegex.test(email)) {
      toast.error("Please valide email");
      return;
    }

    if (!passwordRegex.test(password1)) {
      toast.error("Please 8 charecter & 1 uppercase, 1 lowercase");
      return;
    }

    if (password1 !== password2) {
      toast.error("Password doesn't match!");
      return;
    }

    createUser(email, password1)
      .then((res) => {
        if (res?.user) {
          form.reset();

          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Account created successfully!",
            showConfirmButton: false,
            timer: 1500,
          });

          // updateUserProfile
          updateUserProfile(name, photo)
            .then(() => {
              // Profile updated!
              // ...
            })
            .catch(() => {
              // An error occurred
              // ...
            });

          const newUser = {
            name,
            email,
            photo,
            password1,
          };

          // save user mdb
          axios
            .post("https://smart-bills-orcin.vercel.app/users", newUser)
            .then((res) => console.log(res?.data))
            .catch((re) => console.log(re));

          navigate("/");
        }
        // console.log(res.user);
      })
      .catch((error) => toast.error(error.message));
  };

  // goggleLoginHandle
  const goggleLoginHandle = () => {
    signinWithGoggle()
      .then((res) => {
        if (res.user) {
          navigate("/");
        }
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center 
    bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] p-6"
    >
      {/* form card */}
      <div
        className="w-full max-w-md rounded-2xl p-8 shadow-2xl
          backdrop-blur-xl bg-white/10 border border-white/20
          shadow-[0_0_40px_rgba(255,255,255,0.1)] animation-fade mt-10"
      >
        <h2
          className="text-3xl font-bold text-center mb-6 
        bg-gradient-to-r from-yellow-400 to-orange-500 
        bg-clip-text text-transparent"
        >
          Create Your Account ✨
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* FULL NAME */}
          <div className="relative">
            <User className="absolute left-3 top-3 text-yellow-300" size={20} />
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5
              border border-white/20 text-white 
              focus:ring-2 focus:ring-yellow-300 
              transition-all outline-none"
              required
            />
          </div>

          {/* PHOTO URL */}
          <div className="relative">
            <ImageIcon
              className="absolute left-3 top-3 text-orange-300"
              size={20}
            />
            <input
              type="text"
              name="photo"
              placeholder="Photo URL"
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5
              border border-white/20 text-white 
              focus:ring-2 focus:ring-yellow-300 
              transition-all outline-none"
              required
            />
          </div>

          {/* EMAIL */}
          <div className="relative">
            <Mail className="absolute left-3 top-3 text-yellow-300" size={20} />
            <input
              type="email"
              name="email"
              placeholder="you@example.com"
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 
              border border-white/20 text-white
              focus:ring-2 focus:ring-yellow-400 transition-all"
              required
            />
          </div>

          {/* PASSWORD */}
          <div className="relative">
            <Lock className="absolute left-3 top-3 text-orange-300" size={20} />
            <input
              type={passwordEy ? "text" : "password"}
              name="password1"
              placeholder="Create a password"
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5
              border border-white/20 text-white 
              focus:ring-2 focus:ring-yellow-400 transition-all"
              required
            />
            {passwordEy ? (
              <EyeOff
                className="absolute top-3.5 right-3 cursor-pointer text-orange-300"
                onClick={() => setPasswordEy(false)}
              />
            ) : (
              <Eye
                onClick={() => setPasswordEy(true)}
                className="absolute top-3.5 right-3 cursor-pointer text-orange-300"
              />
            )}
          </div>

          {/* CONFIRM PASSWORD */}
          <div className="relative">
            <Lock className="absolute left-3 top-3 text-orange-300" size={20} />
            <input
              type={passwordEy ? "text" : "password"}
              name="password2"
              placeholder="Repeat password"
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5
              border border-white/20 text-white 
              focus:ring-2 focus:ring-yellow-400 transition-all"
              required
            />
          </div>

          {/* SIGNUP BUTTON */}
          <button
            type="submit"
            className="w-full py-3 rounded-xl text-black font-semibold 
            bg-gradient-to-r from-yellow-400 to-orange-500
            shadow-[0_0_20px_#fbbf2480]
            hover:scale-105 transition-all cursor-pointer"
          >
            Sign Up
          </button>

          {/* Divider */}
          <div className="flex items-center gap-4">
            <div className="flex-1 h-px bg-white/20"></div>
            <span className="text-white/80">or</span>
            <div className="flex-1 h-px bg-white/20"></div>
          </div>

          {/* Google Login */}
          <button
            onClick={goggleLoginHandle}
            type="button"
            className="w-full py-3 rounded-xl bg-white/20 border border-white/30
            text-white flex items-center justify-center gap-3
            hover:bg-white/30 transition cursor-pointer"
          >
            <svg width="18" height="18" viewBox="0 0 512 512">
              <path fill="#4285F4" d="M..."></path>
            </svg>
            Sign Up with Google
          </button>
        </form>

        {/* Already have an account */}
        <p className="text-center text-white/80 text-sm mt-5">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-yellow-300 font-semibold hover:underline"
          >
            Log In
          </Link>
        </p>
      </div>

      <ToastContainer />

      {/* Animation */}
      <style>
        {`
          .animation-fade {
            animation: fadeIn 0.7s ease-out;
          }
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}
      </style>
    </div>
  );
};

export default SignUp;
