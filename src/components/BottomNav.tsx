import { useLocation, useNavigate } from 'react-router-dom';
import { Home, ArrowLeftRight, BarChart3, Wallet, User } from 'lucide-react';
import { motion } from 'framer-motion';

const navItems = [
  { path: '/home', label: 'Home', icon: Home },
  { path: '/transactions', label: 'Transactions', icon: ArrowLeftRight },
  { path: '/analytics', label: 'Analytics', icon: BarChart3 },
  { path: '/budget', label: 'Budget', icon: Wallet },
  { path: '/profile', label: 'Profile', icon: User },
];

export default function BottomNav() {
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname;

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-[#0f1629]/95 backdrop-blur-xl border-t border-white/5 safe-area-pb">
      <div className="max-w-lg mx-auto flex items-center justify-around h-16 px-2">
        {navItems.map((item) => {
          const isActive = currentPath === item.path;
          const Icon = item.icon;
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`relative flex flex-col items-center justify-center w-16 h-14 rounded-xl transition-all duration-200 tap-highlight-transparent ${
                isActive ? 'text-emerald-400' : 'text-slate-500 hover:text-slate-300'
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-emerald-500/10 rounded-xl"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
              <Icon size={22} strokeWidth={isActive ? 2.5 : 1.5} />
              <span className={`text-[10px] mt-0.5 font-medium ${isActive ? 'text-emerald-400' : ''}`}>
                {item.label}
              </span>
              {isActive && (
                <motion.div
                  layoutId="activeIndicator"
                  className="absolute -bottom-0 w-1 h-1 rounded-full bg-emerald-400"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
