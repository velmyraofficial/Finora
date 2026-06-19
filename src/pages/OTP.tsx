import { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Shield } from 'lucide-react';

export default function OTP() {
  const navigate = useNavigate();
  const location = useLocation();
  const { email, name, purpose } = location.state || {
    email: '',
    name: '',
    purpose: 'signup'
  };
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(60);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (timer > 0) {
      const t = setTimeout(() => setTimer(timer - 1), 1000);
      return () => clearTimeout(t);
    }
  }, [timer]);

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) value = value[0];
    if (!/\d/.test(value) && value !== '') return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = () => {
    if (otp.some(d => !d)) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (purpose === 'forgot') {
        navigate('/reset-password');
      } else {
        navigate('/profile-setup', {
          state: {
            name
          }
        });
      }
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-[#0a0e1a] flex flex-col">
      <div className="flex items-center px-4 h-14">
        <button onClick={() => navigate(-1)} className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/5">
          <ArrowLeft size={20} className="text-white" />
        </button>
      </div>

      <div className="flex-1 px-6 pt-4 flex flex-col items-center">
        <div className="w-full max-w-sm sm:max-w-md">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col items-center">
            <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 flex items-center justify-center mb-6">
              <Shield size={28} className="text-emerald-400" />
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">Verification Code</h1>
            <p className="text-slate-400 text-sm text-center">
              We sent a 6-digit code to<br /><span className="text-white font-medium">{email || 'your email'}</span>
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mt-10">
            <div className="flex justify-center gap-3">
              {otp.map((digit, i) => (
                <input
                  key={i}
                  ref={el => { inputRefs.current[i] = el; }}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={e => handleChange(i, e.target.value)}
                  onKeyDown={e => handleKeyDown(i, e)}
                  className="w-12 h-14 rounded-2xl bg-white/5 border border-white/10 text-white text-center text-xl font-bold focus:outline-none focus:border-emerald-500 focus:bg-white/[0.07] transition-all"
                />
              ))}
            </div>

            <button
              onClick={handleVerify}
              disabled={loading || otp.some(d => !d)}
              className="w-full h-14 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold shadow-lg shadow-emerald-500/25 active:scale-[0.98] transition-transform disabled:opacity-40 mt-8 flex items-center justify-center"
            >
              {loading ? <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : 'Verify'}
            </button>

            <div className="text-center mt-6">
              {timer > 0 ? (
                <p className="text-slate-500 text-sm">Resend code in <span className="text-emerald-400">{timer}s</span></p>
              ) : (
                <button onClick={() => setTimer(60)} className="text-emerald-400 text-sm font-medium">Resend Code</button>
              )}
            </div>
          </motion.div>
          <div className="mt-6 flex justify-center">
            <div className="mx-3 px-4 py-2 rounded-xl bg-white/5 border border-white/10">
              <p className="text-slate-500 text-xs text-center leading-relaxed">
                This is a UI demonstration screen. OTP verification is simulated and not connected to any backend service. So, you can enter any 6-digit code to continue.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
