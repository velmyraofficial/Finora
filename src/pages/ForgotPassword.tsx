import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Mail, CheckCircle } from 'lucide-react';

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSend = () => {
    if (!email) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSent(true);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-[#0a0e1a] flex flex-col">
      <div className="flex items-center px-4 h-14">
        <button onClick={() => navigate('/login')} className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/5">
          <ArrowLeft size={20} className="text-white" />
        </button>
      </div>

      <div className="flex-1 px-6 pt-4">
        {!sent ? (
          <>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <h1 className="text-2xl font-bold text-white mb-2">Forgot Password?</h1>
              <p className="text-slate-400 text-sm">Enter your email and we'll send you a reset link</p>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mt-8">
              <div className="relative">
                <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  type="email"
                  placeholder="Email address"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full h-14 pl-12 pr-4 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-emerald-500/50 focus:bg-white/[0.07] transition-all"
                />
              </div>

              <button
                onClick={handleSend}
                disabled={loading}
                className="w-full h-14 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold shadow-lg shadow-emerald-500/25 active:scale-[0.98] transition-transform disabled:opacity-50 mt-4 flex items-center justify-center"
              >
                {loading ? <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : 'Send Reset Link'}
              </button>
            </motion.div>
          </>
        ) : (
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center pt-16">
            <div className="w-20 h-20 rounded-full bg-emerald-500/10 flex items-center justify-center mb-6">
              <CheckCircle size={40} className="text-emerald-400" />
            </div>
            <h2 className="text-xl font-bold text-white mb-2">Check Your Email</h2>
            <p className="text-slate-400 text-sm text-center mb-8">We've sent a password reset link to<br /><span className="text-white">{email}</span></p>
            <button
              onClick={() => navigate('/otp', { state: { email, purpose: 'forgot' } })}
              className="w-full h-14 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold shadow-lg shadow-emerald-500/25 active:scale-[0.98] transition-transform"
            >
              Continue with OTP
            </button>
            <button onClick={() => navigate('/login')} className="mt-4 text-slate-400 text-sm">
              Back to Login
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
