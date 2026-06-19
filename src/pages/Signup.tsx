import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Mail, Lock, Eye, EyeOff, User, Info } from 'lucide-react';

export default function Signup() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showInfoModal, setShowInfoModal] = useState(false);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);


  // const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // if (!emailRegex.test(email)) {
  //   setError('Please enter a valid email address');
  //   return;
  // }

  // const handleSignup = () => {
  //   setError('');
  //   if (!name || !email || !password) {
  //     setError('Please fill in all fields');
  //     return;
  //   }
  //   if (password.length < 6) {
  //     setError('Password must be at least 6 characters');
  //     return;
  //   }
  //   setLoading(true);
  //   setTimeout(() => {
  //     setLoading(false);
  //     navigate('/otp', {
  //       state: {
  //         email,
  //         name,
  //         purpose: 'signup'
  //       }
  //     });
  //   }, 1000);
  // };

  const handleSignup = () => {
    setError('');

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!name || !email || !password) {
      setError('Please fill in all fields');
      return;
    }

    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      navigate('/otp', {
        state: { email, name, purpose: 'signup' }
      });
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-[#0a0e1a] flex flex-col">

      <div className="flex-1 px-6 pt-4 flex flex-col items-center">
        <div className="w-full max-w-sm sm:max-w-md">
          <div className="flex items-center pb-2 h-14">
            <button onClick={() => navigate('/welcome')} className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/5">
              <ArrowLeft size={20} className="text-white" />
            </button>
          </div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-3xl font-bold text-white mb-2">Create Account</h1>
            <p className="text-slate-400 text-sm">Start your journey to financial wellness</p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mt-8 space-y-4">
            <div className="relative">
              <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                type="text"
                placeholder="Full name"
                value={name}
                onChange={e => setName(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    emailRef.current?.focus();
                  }
                }}
                className="w-full h-14 pl-12 pr-4 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-emerald-500/50 focus:bg-white/[0.07] transition-all"
              />
            </div>

            <div className="relative">
              <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                ref={emailRef}
                type="email"
                placeholder="Email address"
                value={email}
                onChange={e => setEmail(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    passwordRef.current?.focus();
                  }
                }}
                className="w-full h-14 pl-12 pr-4 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-emerald-500/50 focus:bg-white/[0.07] transition-all"
              />
            </div>

            <div className="relative">
              <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                ref={passwordRef}
                type={showPassword ? 'text' : 'password'}
                placeholder="Create password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleSignup();
                  }
                }}
                className="w-full h-14 pl-12 pr-12 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-emerald-500/50 focus:bg-white/[0.07] transition-all"
              />
              <button onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500">
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            {error && <p className="text-red-400 text-xs ml-1">{error}</p>}

            <button
              onClick={handleSignup}
              disabled={loading}
              className="w-full h-14 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold shadow-lg shadow-emerald-500/25 active:scale-[0.98] transition-transform disabled:opacity-50 flex items-center justify-center mt-2"
            >
              {loading ? <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : 'Continue'}
            </button>
          </motion.div>

          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 h-px bg-white/10" />
            <span className="text-slate-500 text-xs">or sign up with</span>
            <div className="flex-1 h-px bg-white/10" />
          </div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="flex gap-3">
            <button onClick={() => setShowInfoModal(true)} className="flex-1 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center gap-2 active:bg-white/10 transition-colors">
              <svg className="w-5 h-5" viewBox="0 0 48 48">
                <path
                  fill="#EA4335"
                  d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.28 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.2C12.43 13.72 17.74 9.5 24 9.5z"
                />
                <path
                  fill="#4285F4"
                  d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6C43.9 38.43 47 32.7 47 24.55z"
                />
                <path
                  fill="#FBBC05"
                  d="M10.54 28.43a14.5 14.5 0 0 1 0-9.17l-7.98-6.2A24 24 0 0 0 0 24c0 3.93.94 7.63 2.56 10.94l7.98-6.51z"
                />
                <path
                  fill="#34A853"
                  d="M24 48c6.48 0 11.93-2.13 15.9-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.17 2.3-6.26 0-11.57-4.22-13.46-9.9l-7.98 6.51C6.51 42.62 14.62 48 24 48z"
                />
              </svg>
              <span className="text-white text-sm font-medium">Google</span>
            </button>
            <button onClick={() => setShowInfoModal(true)} className="flex-1 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center gap-2 active:bg-white/10 transition-colors">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="white"><path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.78 1.18-.19 2.31-.89 3.51-.84 1.54.06 2.73.74 3.53 1.89-3.06 1.67-2.54 5.98.22 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" /></svg>
              <span className="text-white text-sm font-medium">Apple</span>
            </button>
          </motion.div>

          <p className="text-center text-slate-500 text-sm mt-8">
            Already have an account?{' '}
            <button onClick={() => navigate('/login')} className="text-emerald-400 font-medium">Sign In</button>
          </p>
        </div>
      </div>

      {showInfoModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4"
          onClick={() => setShowInfoModal(false)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-sm rounded-3xl border border-white/10 bg-[#111827] p-6"
          >
            {/* Close button */}
            <button
              onClick={() => setShowInfoModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white"
            >
              ✕
            </button>

            <div className="text-center">
              <Info size={42} className="mx-auto mb-4 text-emerald-400" />

              <h3 className="text-lg font-semibold text-white">
                Feature Not Available
              </h3>

              <p className="mt-2 text-sm text-slate-400">
                This feature is only for UI demonstration purposes.
                It is not connected to any real authentication API.
              </p>

              <button
                onClick={() => setShowInfoModal(false)}
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
