import { use } from "react";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../../Context/AuthContext";
import Swal from "sweetalert2";
import { toast, ToastContainer } from "react-toastify";

const LogIn = () => {
  const { signinUser } = use(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;

    // sinin
    signinUser(email, password)
      .then((res) => {
        if (res?.user) {
          e.target.reset();
          navigate('/')
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Your account is logn in successflly!",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 p-4">
      <div className="card w-full max-w-md shadow-xl">
        <div className="card-body">
          <h2 className="card-title text-2xl">Sign in to your account</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div>
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                name="email"
                placeholder="you@example.com"
                className="input input-bordered w-full"
                required
              />
            </div>

            {/* Password */}
            <div>
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                name="password"
                placeholder="Your password"
                className="input input-bordered w-full"
                required
              />
              <label className="label">
                <a href="#" className="label-text-alt link link-hover">
                  Forgot password?
                </a>
              </label>
            </div>

            {/* Remember me */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2">
                <input type="checkbox" className="checkbox" />
                <span className="text-sm">Remember me</span>
              </label>
            </div>

            {/* Submit */}
            <div>
              <button type="submit" className="btn btn-primary w-full">
                Sign In
              </button>
            </div>

            <div className="flex items-center gap-5">
              <div className="border-b w-full border-dashed "></div>
              <span>or</span>
              <div className="border-b w-full border-dashed"></div>
            </div>

            {/* Google */}
            <button className="btn bg-white text-black border-[#e5e5e5] w-full">
              <svg
                aria-label="Google logo"
                width="16"
                height="16"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <g>
                  <path d="m0 0H512V512H0" fill="#fff"></path>
                  <path
                    fill="#34a853"
                    d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
                  ></path>
                  <path
                    fill="#4285f4"
                    d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
                  ></path>
                  <path
                    fill="#fbbc02"
                    d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
                  ></path>
                  <path
                    fill="#ea4335"
                    d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
                  ></path>
                </g>
              </svg>
              Login with Google
            </button>
          </form>

          <p className="text-center text-sm mt-4">
            Don’t have an account?{" "}
            <Link to="/signUp" className="link link-primary">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
         <ToastContainer />
    </div>
  );
};

export default LogIn;
