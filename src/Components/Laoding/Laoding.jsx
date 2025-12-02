import React from "react";

const Loading = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      {/* Glassmorphic spinner container */}
      <div className="relative w-32 h-32 rounded-full bg-white/20 backdrop-blur-md border-2 border-white/30 shadow-lg flex items-center justify-center animate-pulse">
        {/* Inner rotating circles */}
        <div className="absolute w-24 h-24 border-4 border-t-blue-500 border-r-purple-500 border-b-pink-500 border-l-transparent rounded-full animate-spin"></div>
        <div className="absolute w-16 h-16 border-4 border-t-green-400 border-r-yellow-400 border-b-red-400 border-l-transparent rounded-full animate-spin animation-delay-2000"></div>
        <div className="absolute w-10 h-10 border-4 border-t-indigo-500 border-r-pink-500 border-b-teal-400 border-l-transparent rounded-full animate-spin animation-delay-4000"></div>
      </div>
      <p className="absolute mt-48 text-lg font-semibold text-white/80 animate-pulse">
        Loading...
      </p>
    </div>
  );
};

export default Loading;
