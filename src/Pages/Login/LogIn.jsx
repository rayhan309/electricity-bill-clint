import { use } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { AuthContext } from "../../Context/AuthContext";
import Swal from "sweetalert2";
import { toast, ToastContainer } from "react-toastify";
import { Lock, Mail } from "lucide-react";

const LogIn = () => {
  const { signinUser, signinWithGoggle } = use(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  // console.log(location)

  const handleSubmit = (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;

    // sign in
    signinUser(email, password)
      .then((res) => {
        if (res?.user) {
          e.target.reset();
          navigate("/");

          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Login successful!",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  // handleSigninWithGoggle
  const handleSigninWithGoggle = () => {
    signinWithGoggle()
      .then((res) => {
        if(res.user){
          navigate(location?.state)
        };
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center 
    bg-gradient-to-br from-[#1f1c2c] to-[#928dab] p-6"
    >
      {/* GLASS CARD */}
      <div
        className="w-full max-w-md rounded-2xl p-8 shadow-2xl
          backdrop-blur-xl bg-white/10 border border-white/20
          shadow-[0_0_40px_rgba(255,255,255,0.1)] animation-fade"
      >
        <h2
          className="text-3xl font-bold text-center mb-6 
        bg-gradient-to-r from-yellow-400 to-orange-500 
        bg-clip-text text-transparent"
        >
          Welcome Back ⚡
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email */}
          <div className="relative">
            <Mail className="absolute left-3 top-3 text-yellow-300" size={20} />
            <input
              type="email"
              name="email"
              placeholder="you@example.com"
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 
              border border-white/20 text-white 
              focus:ring-2 focus:ring-yellow-400 
              transition-all outline-none"
              required
            />
          </div>

          {/* Password */}
          <div className="relative">
            <Lock className="absolute left-3 top-3 text-orange-300" size={20} />
            <input
              type="password"
              name="password"
              placeholder="Your password"
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 
              border border-white/20 text-white 
              focus:ring-2 focus:ring-yellow-400 
              transition-all outline-none"
              required
            />

            <div className="text-right mt-1">
              <a href="#" className="text-yellow-300 text-sm hover:underline">
                Forgot Password?
              </a>
            </div>
          </div>

          {/* Remember */}
          <label className="flex items-center gap-3 text-white text-sm">
            <input type="checkbox" className="checkbox checkbox-warning" />
            Remember me
          </label>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-3 rounded-xl text-black font-semibold 
            bg-gradient-to-r from-yellow-400 to-orange-500
            shadow-[0_0_20px_#fbbf2480] hover:scale-105 transition-all cursor-pointer"
          >
            Sign In
          </button>

          {/* OR Divider */}
          <div className="flex items-center gap-4">
            <div className="flex-1 h-px bg-white/20"></div>
            <span className="text-white/80">or</span>
            <div className="flex-1 h-px bg-white/20"></div>
          </div>

          {/* Google Login */}
          <button
            type="button"
            onClick={handleSigninWithGoggle}
            className="w-full py-3 cursor-pointer rounded-xl bg-white/20 border border-white/30
            text-white flex items-center justify-center gap-3
            hover:bg-white/30 transition"
          >
            <svg width="18" height="18" viewBox="0 0 512 512">
              <path fill="#4285F4" d="M..."></path>
            </svg>
            Login with Google
          </button>
        </form>

        {/* Register */}
        <p className="text-center text-white/80 text-sm mt-5">
          Don’t have an account?{" "}
          <Link
            to="/signUp"
            className="text-yellow-300 font-semibold hover:underline"
          >
            Sign Up
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

export default LogIn;
