import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Shield,
  Fingerprint,
  Lock,
  Clock,
  EyeOff,
  History,
  Smartphone,
  KeyRound,
  ShieldCheck,
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
  const [biometricAuth, setBiometricAuth] = useState(false);
  const [pinLock, setPinLock] = useState(true);
  const [hideBalances, setHideBalances] = useState(false);
  const [hideSensitiveData, setHideSensitiveData] = useState(false);

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
                Security functionality is not fully implemented in this prototype.
              </p>
            </div>

            {/* Account Protection */}
            <Section title="Account Protection">
              <ToggleItem
                icon={<Fingerprint size={20} />}
                title="Biometric Authentication"
                description="FaceID or Fingerprint"
                enabled={biometricAuth}
                onToggle={() => setBiometricAuth(!biometricAuth)}
              />
              <ToggleItem
                icon={<Lock size={20} />}
                title="PIN Lock"
                enabled={pinLock}
                onToggle={() => setPinLock(!pinLock)}
              />
              <MenuItem
                icon={<Clock size={20} />}
                title="Auto Lock"
                value="30 sec"
                valueColor="text-emerald-400"
              />
            </Section>

            {/* Privacy */}
            <Section title="Privacy">
              <ToggleItem
                icon={<EyeOff size={20} />}
                title="Hide Account Balances"
                enabled={hideBalances}
                onToggle={() => setHideBalances(!hideBalances)}
              />
              <ToggleItem
                icon={<Shield size={20} />}
                title="Hide Sensitive Data"
                enabled={hideSensitiveData}
                onToggle={() => setHideSensitiveData(!hideSensitiveData)}
              />
            </Section>

            {/* Security Activity */}
            <Section title="Security Activity">
              <MenuItem
                icon={<History size={20} />}
                title="Last Login"
                value="Today"
              />
              <MenuItem
                icon={<Smartphone size={20} />}
                title="Active Device"
                value="1 Device"
              />
            </Section>

            {/* Advanced */}
            <Section title="Advanced">
              <MenuItem
                icon={<KeyRound size={20} />}
                title="Change Password"
              />
              <MenuItem
                icon={<ShieldCheck size={20} />}
                title="Two-Factor Authentication"
                description="Active"
                valueColor="text-emerald-400"
              />
              <MenuItem
                icon={<Lock size={20} />}
                title="Privacy Controls"
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
