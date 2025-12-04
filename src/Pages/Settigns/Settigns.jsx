import { Sun, Key, Bell, Link as LinkIcon, Menu, X } from "lucide-react";
import { useState } from "react";
import Loading from "../../Components/Laoding/Laoding";
import { motion } from "framer-motion";

const SettingsDesign = () => {
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [ligth, setLigth] = useState(false);

  setTimeout(() => {
    setLoading(false);
  }, 800);

  return loading ? (
    <Loading />
  ) : (
    <>
      <div className={`min-h-screen flex text-white relative ${ligth ? "bg-white" : "bg-white/20"}`}>
    
          {/* lakjer divec */}
        <div
          className={`fixed top-0 left-0 h-full p-4 pt-24 transition-all bg-white/30 duration-300 z-40 
          overflow-hidden ${sidebarOpen ? "w-64" : "w-20"}`}
        >
          <button
            title="Settigns"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="mb-5 bg-white/30 backdrop-blur-xl p-3 cursor-pointer rounded-xl shadow-xl"
          >
            {sidebarOpen ? <X size={22} /> : <Menu size={22} />}
          </button>

          {sidebarOpen ? (
            <div className={`space-y-3`}>
              <div
              onClick={() => setLigth(!ligth)}
               className="flex items-center gap-3 p-2 rounded bg-white/30 hover:bg-white/40 cursor-pointer">
                <Sun className="text-yellow-400" />
                <span>Theme</span>
              </div>

              <div className="flex items-center gap-3 p-2 rounded bg-white/30 hover:bg-white/40 cursor-pointer">
                <Key />
                <span>Password</span>
              </div>

              <div className="flex items-center gap-3 p-2 rounded bg-white/30 hover:bg-white/40 cursor-pointer">
                <Bell />
                <span>Notifications</span>
              </div>

              <div className="flex items-center gap-3 p-2 rounded bg-white/30 hover:bg-white/40 cursor-pointer">
                <LinkIcon />
                <span>Linked Accounts</span>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="w-12 p-2 rounded bg-white/30 hover:bg-white/40 cursor-pointer">
                <Sun className="text-yellow-400" />
              </div>

              <div className="w-12 p-2 rounded bg-white/30 hover:bg-white/40 cursor-pointer">
                <Key />
              </div>

              <div className="w-12 p-2 rounded bg-white/30 hover:bg-white/40 cursor-pointer">
                <Bell />
              </div>

              <div className="w-12 p-2 rounded bg-white/30 hover:bg-white/40 cursor-pointer">
                <LinkIcon />
              </div>
            </div>
          )}

        </div>

        <main className="flex-1 p-8 lg:p-12 ml-16 space-y-8">

          {/* Theme Section */}
          <motion.section
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="p-6 rounded-xl bg-white/20 mt-20 shadow-lg flex items-center justify-between"
          >
            <h3 className="text-xl font-semibold">Theme Mode</h3>
            <button className="premium-btn"  onClick={() => setLigth(!ligth)}>Dark Theme</button>
          </motion.section>

          {/* Change Password */}
          <motion.section
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-white/20 p-6 rounded-xl shadow-lg"
          >
            <h3 className="text-xl font-semibold mb-4">Change Password</h3>

            <div className="flex flex-col gap-4">
              <input
                type="password"
                placeholder="Current Password"
                className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-yellow-400 dark:bg-gray-700"
              />

              <input
                type="password"
                placeholder="New Password"
                className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-yellow-400 dark:bg-gray-700"
              />

              <input
                type="password"
                placeholder="Confirm New Password"
                className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-yellow-400 dark:bg-gray-700"
              />

              <button className="bg-gradient-to-r from-orange-400 via-amber-500 to-yellow-600 text-white font-semibold px-4 py-2 rounded-lg mt-2">
                Change Password
              </button>
            </div>
          </motion.section>

          {/* Notifications */}
          <motion.section
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-white/20 p-6 rounded-xl shadow-lg"
          >
            <h3 className="text-xl font-semibold mb-4">Notifications</h3>

            <div className="flex flex-col gap-4">
              <label className="flex items-center gap-3">
                <input type="checkbox" className="w-4 h-4" />
                Email Notifications
              </label>

              <label className="flex items-center gap-3">
                <input type="checkbox" className="w-4 h-4" />
                SMS Notifications
              </label>

              <label className="flex items-center gap-3">
                <input type="checkbox" className="w-4 h-4" />
                Push Notifications
              </label>

              <button className="bg-gradient-to-r from-orange-400 via-amber-500 to-yellow-600 text-white font-semibold px-4 py-2 rounded-lg mt-2">
                Save Notifications
              </button>
            </div>
          </motion.section>

          {/* Linked Accounts */}
          <motion.section
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="p-6 rounded-xl shadow-lg bg-white/20"
          >
            <h3 className="text-xl font-semibold mb-4">Linked Accounts</h3>

            <div className="flex flex-col gap-4">
              <label className="flex items-center gap-3">
                <input type="checkbox" className="w-4 h-4" /> Google
              </label>

              <label className="flex items-center gap-3">
                <input type="checkbox" className="w-4 h-4" /> GitHub
              </label>

              <label className="flex items-center gap-3">
                <input type="checkbox" className="w-4 h-4" /> Facebook
              </label>

              <button className="bg-gradient-to-r from-orange-400 via-amber-500 to-yellow-600 text-white font-semibold px-4 py-2 rounded-lg mt-2">
                Save Linked Accounts
              </button>
            </div>
          </motion.section>
        </main>
      </div>
    </>
  );
};

export default SettingsDesign;
