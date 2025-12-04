import { Sun, Key, Bell, Link as LinkIcon } from "lucide-react";

const SettingsDesign = () => {

  return (
    <div className={`min-h-screen flex text-white`}>
      {/* Sidebar */}
      <aside className="w-64 bg-white/20 dark:bg-gray-800 shadow-lg p-6 hidden lg:flex flex-col pt-24 gap-5">
        <h2 className="text-2xl font-bold mb-6">Settings</h2>

        <div className="flex items-center justify-between cursor-pointer p-2 rounded bg-white/30 hover:bg-white/40">
          <span>Theme</span>

          <Sun className="text-yellow-400" />
        </div>

        <div className="flex items-center cursor-pointer p-2 rounded bg-white/30 hover:bg-white/40">
          <Key className="mr-2" />
          <span>Password</span>
        </div>

        <div className="flex items-center cursor-pointer p-2 rounded bg-white/30 hover:bg-white/40">
          <Bell className="mr-2" />
          <span>Notifications</span>
        </div>

        <div className="flex items-center cursor-pointer p-2 rounded bg-white/30 hover:bg-white/40">
          <LinkIcon className="mr-2" />
          <span>Linked Accounts</span>
        </div>
      </aside>

      {/* Main section */}
      <main className="flex-1 p-8 lg:p-12 space-y-8">
        {/* Theme Section */}
        <section className="p-6 rounded-xl bg-white/20 mt-20 shadow-lg flex items-center justify-between">
          <h3 className="text-xl font-semibold">Theme Mode</h3>
          <button
            className={`premium-btn`}
          >Dark Thim</button>
        </section>

        {/* Change Password */}
        <section className="bg-white/20 p-6 rounded-xl shadow-lg">
          <h3 className="text-xl font-semibold mb-4">Change Password</h3>
          <div className="flex flex-col gap-4">
            <input
              type="password"
              placeholder="Current Password"
              className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 focus:ring-2 focus:ring-yellow-400 dark:focus:ring-yellow-400 focus:outline-none dark:bg-gray-700"
            />
            <input
              type="password"
              placeholder="New Password"
              className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 focus:ring-2 focus:ring-yellow-400 dark:focus:ring-yellow-400 focus:outline-none dark:bg-gray-700"
            />
            <input
              type="password"
              placeholder="Confirm New Password"
              className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 focus:ring-2 focus:ring-yellow-400 dark:focus:ring-yellow-400 focus:outline-none dark:bg-gray-700"
            />
            <button className="bg-gradient-to-r from-orange-400 via-amber-500 to-yellow-600 font-semibold px-4 py-2 rounded-lg mt-2 transition-colors btn text-white border-none">
              Change Password
            </button>
          </div>
        </section>

        {/* Notifications */}
        <section className="bg-white/20 p-6 rounded-xl shadow-lg">
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
            <button className="bg-gradient-to-r from-orange-400 via-amber-500 to-yellow-600 font-semibold px-4 py-2 rounded-lg mt-2 transition-colors btn text-white border-none">
              Save Notifications
            </button>
          </div>
        </section>

        {/* Linked Accounts */}
        <section className="p-6 rounded-xl shadow-lg bg-white/20">
          <h3 className="text-xl font-semibold mb-4">Linked Accounts</h3>
          <div className="flex flex-col gap-4">
            <label className="flex items-center gap-3">
              <input type="checkbox" className="w-4 h-4" />
              Google
            </label>
            <label className="flex items-center gap-3">
              <input type="checkbox" className="w-4 h-4" />
              GitHub
            </label>
            <label className="flex items-center gap-3">
              <input type="checkbox" className="w-4 h-4" />
              Facebook
            </label>
            <button className="bg-gradient-to-r from-orange-400 via-amber-500 to-yellow-600 font-semibold px-4 py-2 rounded-lg mt-2 transition-colors btn text-white border-none">
              Save Linked Accounts
            </button>
          </div>
        </section>
      </main>
    </div>
  );
};

export default SettingsDesign;
