import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  User, Bell, Landmark, Receipt, Target, Shield, Settings,
  HelpCircle, LogOut, ChevronRight, Sparkles
} from 'lucide-react';
import { useApp } from '@/hooks/useAppContext';
import { useState } from 'react';

const menuItems = [
  { label: 'Notifications', icon: Bell, route: '/notifications', badge: 3 },
  { label: 'Connected Banks', icon: Landmark, route: '/accounts' },
  { label: 'Bills & Subscriptions', icon: Receipt, route: '/bills' },
  { label: 'Savings Goals', icon: Target, route: '/savings-goals' },
  { label: 'AI Insights', icon: Sparkles, route: '/insights' },
  { label: 'Security', icon: Shield, route: '/security', state: { tab: 'security' } },
  { label: 'Settings', icon: Settings, route: '/settings' },
  { label: 'Help & Support', icon: HelpCircle, route: '/settings', state: { tab: 'help' } },
];

export default function Profile() {
  const [showHelpModal, setShowHelpModal] = useState(false);
  const navigate = useNavigate();
  const { user, logout } = useApp();

  return (
    <div className="min-h-screen bg-[#0a0e1a] flex justify-center">

      <div className="w-full max-w-7xl mx-auto px-5 lg:px-8">
        {/* Header */}
        <div className="pt-6 pb-4">
          <h1 className="text-xl font-bold text-white mb-4">Profile</h1>

          {/* User Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-2xl bg-gradient-to-br from-emerald-500/20 to-teal-500/10 border border-emerald-500/20 p-5"
          >
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center">
                <User size={28} className="text-white" />
              </div>
              <div className="flex-1">
                <h2 className="text-white text-lg font-bold">{user?.name || 'Alex Morgan'}</h2>
                <p className="text-slate-400 text-xs">{user?.email || 'alex.morgan@email.com'}</p>
                <div className="flex items-center gap-2 mt-2">
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-medium">Premium</span>
                  <span className="text-slate-500 text-[10px]">Since Jan 2024</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="space-y-2">
          {menuItems.map((item, i) => (
            <motion.button
              key={item.label}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 + i * 0.05 }}
              // onClick={() => navigate(item.route, { state: item.state })}
              onClick={() => {
                if (item.label === 'Help & Support') {
                  setShowHelpModal(true);
                  return;
                }

                navigate(item.route, { state: item.state });
              }}
              className="w-full flex items-center gap-3 p-4 rounded-2xl bg-white/5 border border-white/5 text-left active:bg-white/10 transition-colors"
            >
              <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
                <item.icon size={18} className="text-slate-300" />
              </div>
              <span className="flex-1 text-white text-sm font-medium">{item.label}</span>
              {item.badge ? (
                <span className="w-5 h-5 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center">
                  {item.badge}
                </span>
              ) : null}
              <ChevronRight size={16} className="text-slate-600" />
            </motion.button>
          ))}
        </div>

        {/* Logout */}
        <div className="pt-4 pb-8">
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            onClick={() => {
              logout();
              navigate('/welcome');
            }}
            className="w-full flex items-center justify-center gap-2 p-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-medium"
          >
            <LogOut size={16} />
            Sign Out
          </motion.button>
        </div>
      </div>
      {showHelpModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4"
          onClick={() => setShowHelpModal(false)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-sm rounded-3xl border border-white/10 bg-[#111827] p-6"
          >
            {/* Close Button */}
            <button
              onClick={() => setShowHelpModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white"
            >
              ✕
            </button>

            <div className="text-center">
              <HelpCircle
                size={42}
                className="mx-auto mb-4 text-emerald-400"
              />

              <h3 className="text-lg font-semibold text-white">
                Coming Soon
              </h3>

              <p className="mt-2 text-sm text-slate-400">
                Help & Support is currently unavailable.
                This feature will be available in a future update.
              </p>

              <button
                onClick={() => setShowHelpModal(false)}
                className="mt-5 w-full rounded-xl bg-emerald-500 py-3 text-sm font-medium text-white"
              >
                Got It
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
