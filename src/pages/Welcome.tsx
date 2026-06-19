import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { TrendingUp, Shield, Bell, Zap } from 'lucide-react';

const features = [
  { icon: TrendingUp, title: 'Track Everything', desc: 'Monitor income, expenses & investments in one place' },
  { icon: Shield, title: 'Bank-Level Security', desc: '256-bit encryption keeps your data safe and secure' },
  { icon: Bell, title: 'Smart Alerts', desc: 'Get notified about bills, budgets & spending insights' },
  { icon: Zap, title: 'AI Insights', desc: 'Personalized recommendations to improve your finances' },
];

export default function Welcome() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0e1a] via-[#0f1a2e] to-[#0a0e1a] flex flex-col relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-72 h-72 bg-emerald-500/10 rounded-full blur-[100px]" />
      <div className="absolute bottom-40 right-0 w-48 h-48 bg-blue-500/10 rounded-full blur-[80px]" />

      <div className="flex-1 flex flex-col items-center justify-center px-6 pt-12 relative z-10">
        {/* Logo */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.2 }}
          className="w-24 h-24 rounded-3xl bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center mb-8 shadow-2xl shadow-emerald-500/20"
        >
          <TrendingUp size={44} className="text-white" strokeWidth={2.5} />
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-4xl font-bold text-white mb-3 tracking-tight"
        >
          Finora
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-slate-400 text-center text-base mb-12 max-w-xs"
        >
          Your intelligent financial companion for a brighter financial future
        </motion.p>

        {/* Features */}
        <div className="w-full max-w-sm space-y-4 mb-12">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 + i * 0.1 }}
              className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/5"
            >
              <div className="w-11 h-11 rounded-xl bg-emerald-500/10 flex items-center justify-center flex-shrink-0">
                <f.icon size={20} className="text-emerald-400" />
              </div>
              <div>
                <h3 className="text-white text-sm font-semibold">{f.title}</h3>
                <p className="text-slate-400 text-xs mt-0.5">{f.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Bottom CTA */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.1 }}
        className="w-full max-w-sm mx-auto pb-10 pt-4"
      >
        <button
          onClick={() => navigate('/signup')}
          className="w-full h-14 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold text-base shadow-lg shadow-emerald-500/25 active:scale-[0.98] transition-transform"
        >
          Get Started
        </button>
        <button
          onClick={() => navigate('/login')}
          className="w-full h-12 mt-3 text-slate-400 text-sm font-medium active:text-white transition-colors"
        >
          Already have an account? <span className="text-emerald-400">Sign In</span>
        </button>
      </motion.div>
    </div>
  );
}
