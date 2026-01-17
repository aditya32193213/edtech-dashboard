import { useState, useEffect } from "react";
import { getUser, logoutUser, updateProfile } from "../utils/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import ChatbotWidget from "../components/chatbot/ChatbotWidget";

export default function Profile() {
  const navigate = useNavigate();
  const user = getUser();

  const [name, setName] = useState(user?.name || "");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!user) navigate("/login");
  }, [user, navigate]);

  if (!user) return null;

  const avatarUrl = `https://api.dicebear.com/7.x/lorelei/svg?seed=${user.email}&backgroundColor=e5e7eb,b6e3f4,c0aede,d1d4f9`;
  const coverImageUrl = "https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3";

  const handleSave = async () => {
    if (!name.trim()) {
      toast.error("Name cannot be empty");
      return;
    }
    try {
      setSaving(true);
      const updatedUser = await updateProfile(name.trim());
      toast.success("Profile updated successfully");
      setName(updatedUser.name);
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = () => {
    logoutUser();
    toast.success("Logged out successfully");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950 transition-colors duration-300 pt-24 pb-12">
      <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-blue-600/20 to-transparent dark:from-slate-800/50 pointer-events-none" />

      <div className="max-w-3xl mx-auto px-6 relative z-10">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Account Settings</h1>

        <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-xl overflow-hidden border border-gray-100 dark:border-slate-800">
          <div className="h-40 md:h-48 relative overflow-hidden group">
             <img src={coverImageUrl} alt="Cover Background" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"/>
             <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
          </div>

          <div className="px-8 pb-10">
            <div className="relative -mt-16 mb-6 flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4">
              <img src={avatarUrl} alt="Profile Avatar" className="w-32 h-32 rounded-2xl border-4 border-white dark:border-slate-900 shadow-2xl object-cover bg-white dark:bg-slate-800" />
            </div>

            <div className="mb-10">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{name}</h2>
              <p className="text-gray-500 dark:text-gray-400 flex items-center gap-2">Manage your personal information and security.</p>
            </div>

            <div className="space-y-8 max-w-xl">
              <div>
                
                <label htmlFor="name" className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-3 uppercase tracking-wide">Display Name</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-blue-500 transition-colors"><svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg></div>
                  
                  <input
                    type="text"
                    id="name"
                    name="name"
                    autoComplete="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white transition-all outline-none text-lg font-medium shadow-sm"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-3 uppercase tracking-wide">Email Address</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400"><svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg></div>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    autoComplete="email"
                    value={user.email}
                    disabled
                    className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-gray-100 dark:bg-slate-800/50 border border-gray-200 dark:border-slate-700 text-gray-500 dark:text-gray-400 cursor-not-allowed font-medium shadow-sm"
                  />
                </div>
              </div>

              <div className="pt-8 flex flex-col sm:flex-row gap-4 border-t border-gray-100 dark:border-slate-800 mt-10">
                <button onClick={handleSave} disabled={saving} className="flex-1 flex justify-center items-center gap-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold px-6 py-4 rounded-xl transition-all shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:translate-y-0 text-lg">
                  {saving ? "Saving Changes..." : "Save Changes"}
                </button>
                <button onClick={handleLogout} className="px-8 py-4 rounded-xl border-2 border-red-100 dark:border-red-900/30 text-red-600 dark:text-red-400 font-bold hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors flex items-center justify-center gap-2 text-lg hover:border-red-200 dark:hover:border-red-900/50">
                  Log Out
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ChatbotWidget user={user} />
    </div>
  );
}