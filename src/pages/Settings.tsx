import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Shield,
  Bell,
  Lock,
  BadgeAlert,
  Moon,
  Globe,
  Landmark,
  Download,
  Trash2,
  HelpCircle,
  FileText,
  MessageCircle,
  ChevronRight
} from 'lucide-react';
import { motion } from 'framer-motion';

/**
 * Security Component
 * 
 * A high-fidelity fintech security settings page for the Finora platform.
 * Built with React, TypeScript, Tailwind CSS, and Framer Motion.
 */

const Security: React.FC = () => {
  const navigate = useNavigate();

  // State for toggles

  // const [pinLock, setPinLock] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(false);
  const [budgetAlerts, setBudgetAlerts] = useState(true);
  const [darkMode, setDarkMode] = useState(true);

  // Animation variants
  // const containerVariants = {
  //   hidden: { opacity: 0 },
  //   visible: {
  //     opacity: 1,
  //     transition: {
  //       staggerChildren: 0.1
  //     }
  //   }
  // };

  // const itemVariants = {
  //   hidden: { y: 20, opacity: 0 },
  //   visible: {
  //     y: 0,
  //     opacity: 1,
  //     transition: {
  //       type: 'spring',
  //       stiffness: 100,
  //       damping: 15
  //     }
  //   }
  // };

  // Reusable Section Component
  const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <div className="mb-8">
      <h3 className="text-xs font-bold text-slate-500 tracking-widest uppercase mb-3 px-1">
        {title}
      </h3>
      <div className="bg-white/5 border border-white/5 rounded-2xl overflow-hidden divide-y divide-white/5">
        {children}
      </div>
    </div>
  );

  // Reusable Toggle Item Component
  const ToggleItem: React.FC<{
    icon: React.ReactNode;
    title: string;
    description?: string;
    enabled: boolean;
    onToggle: () => void;
  }> = ({ icon, title, description, enabled, onToggle }) => (
    <div className="flex items-center justify-between p-4 hover:bg-white/5 transition-colors group">
      <div className="flex items-center gap-4">
        <div className="p-2.5 rounded-xl bg-white/5 text-slate-300 group-hover:text-emerald-400 transition-colors">
          {icon}
        </div>
        <div>
          <p className="text-white font-medium text-sm">{title}</p>
          {description && <p className="text-slate-500 text-xs mt-0.5">{description}</p>}
        </div>
      </div>
      <button
        onClick={onToggle}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${enabled ? 'bg-emerald-500' : 'bg-slate-700'
          }`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${enabled ? 'translate-x-6' : 'translate-x-1'
            }`}
        />
      </button>
    </div>
  );

  // Reusable Menu Item Component
  const MenuItem: React.FC<{
    icon: React.ReactNode;
    title: string;
    description?: string;
    value?: string;
    valueColor?: string;
    onClick?: () => void;
  }> = ({ icon, title, description, value, valueColor = "text-slate-400", onClick }) => (
    <button
      onClick={onClick}
      className="w-full flex items-center justify-between p-4 hover:bg-white/5 transition-colors group text-left"
    >
      <div className="flex items-center gap-4">
        <div className="p-2.5 rounded-xl bg-white/5 text-slate-300 group-hover:text-emerald-400 transition-colors">
          {icon}
        </div>
        <div>
          <p className="text-white font-medium text-sm">{title}</p>
          {description && <p className="text-slate-500 text-xs mt-0.5">{description}</p>}
        </div>
      </div>
      <div className="flex items-center gap-2">
        {value && <span className={`text-sm ${valueColor}`}>{value}</span>}
        <ChevronRight size={18} className="text-slate-600" />
      </div>
    </button>
  );

  return (
    <div className="min-h-screen bg-[#0a0e1a] flex justify-center">
      <div className="w-full max-w-7xl mx-auto px-5 lg:px-8">
        {/* Sticky Header */}
        <header className="sticky top-0 z-50 bg-[#0a0e1a]/80 backdrop-blur-md border-b border-white/5 px-4 h-16 flex items-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="p-2 -ml-2 text-white hover:bg-white/10 rounded-full transition-colors"
          >
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-xl font-bold">Security</h1>
        </header>

        <main className="mx-auto pt-6">

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {/* Demo Banner */}
            <div className="mb-8 p-5 bg-amber-500/10 border border-amber-500/15 rounded-2xl relative overflow-hidden group">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400">
                  <Shield size={20} />
                </div>
                <h2 className="text-lg font-bold text-white">Portfolio Prototype</h2>
                <span className="ml-auto px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-400 uppercase tracking-wider">
                  Demo
                </span>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed">
                This page demonstrates the user interface and user experience design for security settings.
                Settings are not fully implemented and do not result in any actual changes to data or system behavior.
              </p>
            </div>

            {/* Security */}
            <Section title="Security">
              <MenuItem
                icon={<Lock size={20} />}
                title="Change Password"
              />
            </Section>

            {/* Notifications */}
            <Section title="Notifications">
              <ToggleItem
                icon={<Bell size={20} />}
                title="Push Notifications"
                enabled={pushNotifications}
                onToggle={() => setPushNotifications(!pushNotifications)}
              />
              <ToggleItem
                icon={<BadgeAlert size={20} />}
                title="Budget Alerts"
                enabled={budgetAlerts}
                onToggle={() => setBudgetAlerts(!budgetAlerts)}
              />
            </Section>

            {/* Appearance */}
            <Section title="Appearance">
              <ToggleItem
                icon={<Moon size={20} />}
                title="Dark Mode"
                enabled={darkMode}
                onToggle={() => setDarkMode(!darkMode)}
              />
              <MenuItem
                icon={<Globe size={20} />}
                title="Language"
              />
              <MenuItem
                icon={<Landmark size={20} />}
                title="Currency"
              />
            </Section>

            {/* Data */}
            <Section title="Data">
              <MenuItem
                icon={<Download size={20} />}
                title="Export Data"
              />
              <MenuItem
                icon={<Trash2 size={20} />}
                title="Delete Account"
              />
            </Section>

            {/* Support */}
            <Section title="Support">
              <MenuItem
                icon={<HelpCircle size={20} />}
                title="Help Center"
              />
              <MenuItem
                icon={<MessageCircle size={20} />}
                title="Contact Support"
              />
              <MenuItem
                icon={<FileText size={20} />}
                title="Terms & Privacy"
              />
            </Section>

            {/* Footer */}
            <footer className="mt-12 mb-8 text-center">
              <p className="text-slate-600 text-xs font-medium tracking-wide">
                Finora v1.0.0
              </p>
            </footer>
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default Security;
