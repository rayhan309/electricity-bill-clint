import { Link } from "react-router";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

const ErrorPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center text-white">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center max-w-md"
      >
        {/* 404 Image */}
        <motion.img
          src="https://i.ibb.co.com/7tZ3tFXs/pexels-c-125803429-11829002.jpg"
          alt="404"
          className="mx-auto w-64 mb-6 drop-shadow-2xl"
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.7 }}
        />

        {/* Title */}
        <motion.h1
          className="text-5xl font-extrabold mb-3 tracking-wide drop-shadow-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Oops! Page Not Found
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="text-gray-300 mb-8 text-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          The page you're looking for doesn't exist or has been moved.
        </motion.p>

        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <Link
            to="/"
            className="inline-flex items-center gap-2 bg-white/30 text-black px-6 py-3 rounded-2xl font-semibold shadow-xl hover:bg-gray-200 transition-all hover:scale-105"
          >
            <ArrowLeft className="w-5 h-5" /> Go Back Home
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default ErrorPage;
