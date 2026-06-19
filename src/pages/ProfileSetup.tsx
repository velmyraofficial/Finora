import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Camera, Check, X, ArrowLeft } from 'lucide-react';
import { useApp } from '@/hooks/useAppContext';
import { currentUser } from '@/data/sampleData';
import { useLocation } from 'react-router-dom';

const regions = [
  {
    country: 'Pakistan',
    currency: 'PKR',
    flag: '🇵🇰'
  },
  {
    country: 'United States',
    currency: 'USD',
    flag: '🇺🇸'
  },
  {
    country: 'United Kingdom',
    currency: 'GBP',
    flag: '🇬🇧'
  },
  {
    country: 'Canada',
    currency: 'CAD',
    flag: '🇨🇦'
  },
  {
    country: 'Australia',
    currency: 'AUD',
    flag: '🇦🇺'
  }
];
const goals = [
  'Save Money',
  'Track Spending',
  'Build Emergency Fund',
  'Invest',
  'Pay Debt'
];

export default function ProfileSetup() {
  const [showPhotoModal, setShowPhotoModal] = useState(false);
  const location = useLocation();
  const signupName = location.state?.name || 'Alex Morgan';
  const navigate = useNavigate();
  const { login } = useApp();
  // const [name, setName] = useState('');
  const [selectedRegion, setSelectedRegion] = useState({
    country: 'Pakistan',
    currency: 'PKR'
  });
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [income, setIncome] = useState('');
  const [goal, setGoal] = useState('');


  const handleComplete = () => {
    setLoading(true);
    setTimeout(() => {
      const user = {
        ...currentUser,
        name: signupName,
        currency: selectedRegion.currency
      };
      login(user);
      setLoading(false);
      navigate('/home', {
        state: {
          showDemoNotice: true
        }
      });
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-[#0a0e1a] flex flex-col">
      <div className="flex-1 px-6 pt-8 flex flex-col items-center">
        <div className="w-full max-w-sm sm:max-w-md">
          <div className="flex items-center mb-6">
            <button
              onClick={() => {
                if (step > 1) {
                  setStep(step - 1);
                } else {
                  navigate('/welcome');
                }
              }}
              className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/5 border border-white/10"
            >
              <ArrowLeft size={18} className="text-white" />
            </button>
          </div>
          {/* Progress */}
          <div className="flex gap-2 mb-10">
            {[1, 2, 3].map(s => (
              <div key={s} className={`flex-1 h-1 rounded-full ${s <= step ? 'bg-emerald-500' : 'bg-white/10'}`} />
            ))}
          </div>

          {step === 1 && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
              <h1 className="text-2xl font-bold text-white mb-2">Set Up Profile</h1>
              <p className="text-slate-400 text-sm mb-8">Tell us a bit about yourself</p>

              {/* Avatar */}
              <div className="flex flex-col items-center mb-8">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center relative">
                  <User size={40} className="text-white" />
                  <button
                    onClick={() => setShowPhotoModal(true)}
                    className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-white/20 backdrop-blur flex items-center justify-center border border-white/20"
                  >
                    <Camera size={14} className="text-white" />
                  </button>
                </div>
              </div>

              <button
                onClick={() => setStep(2)}
                className="w-full h-14 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold shadow-lg shadow-emerald-500/25 active:scale-[0.98] transition-transform mt-8"
              >
                Continue
              </button>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <h1 className="text-2xl font-bold text-white mb-2">
                Select Country / Region
              </h1>

              <p className="text-slate-400 text-sm mb-8">
                Your currency will be selected automatically
              </p>

              <div className="space-y-3">
                {regions.map(region => (
                  <button
                    key={region.country}
                    onClick={() => setSelectedRegion(region)}
                    className={`w-full rounded-2xl border p-4 flex items-center justify-between transition-all ${selectedRegion.country === region.country
                      ? 'border-emerald-500 bg-emerald-500/10'
                      : 'border-white/10 bg-white/5'
                      }`}
                  >
                    <div className="flex items-center gap-4">
                      <span className="text-2xl">
                        {region.flag}
                      </span>

                      <div className="text-left">
                        <p className="text-white font-medium">
                          {region.country}
                        </p>

                        <p className="text-slate-400 text-xs">
                          {region.currency}
                        </p>
                      </div>
                    </div>

                    {selectedRegion.country === region.country && (
                      <Check
                        size={18}
                        className="text-emerald-400"
                      />
                    )}
                  </button>
                ))}
              </div>
              <div className="mt-6 flex justify-center">
                <div className="mx-3 px-4 py-2 rounded-xl bg-white/5 border border-white/15">
                  <p className="text-slate-400 text-xs text-center leading-relaxed">
                    This is a UI demonstration screen. The changes may not be implemented.
                  </p>
                </div>
              </div>

              <button
                onClick={() => setStep(3)}
                className="w-full mb-7 h-14 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold shadow-lg shadow-emerald-500/25 mt-8"
              >
                Continue
              </button>
            </motion.div>
          )}
          {step === 3 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <h1 className="text-2xl font-bold text-white mb-2">
                Financial Preferences
              </h1>

              <p className="text-slate-400 text-sm mb-8">
                Help us personalize your experience
              </p>

              <div className="space-y-4">

                <div>
                  <label className="text-slate-400 text-xs mb-2 block ml-1">
                    Monthly Income (Optional)
                  </label>

                  <input
                    type="number"
                    value={income}
                    onChange={(e) => setIncome(e.target.value)}
                    placeholder="Enter monthly income"
                    className="w-full h-14 px-4 rounded-2xl bg-white/5 border border-white/10 text-white"
                  />
                </div>

                <div>
                  <label className="text-slate-400 text-xs mb-2 block ml-1">
                    Financial Goal (Optional)
                  </label>

                  <div className="flex flex-wrap gap-2">
                    {goals.map(g => (
                      <button
                        key={g}
                        type="button"
                        onClick={() => setGoal(g)}
                        className={`px-4 py-3 rounded-xl text-sm font-medium transition-all ${goal === g
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                          : 'bg-white/5 text-slate-400 border border-white/10'
                          }`}
                      >
                        {g}
                      </button>
                    ))}
                  </div>
                </div>

              </div>

              <button
                onClick={handleComplete}
                disabled={loading}
                className="w-full h-14 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold mt-8"
              >
                {loading ? 'Loading...' : 'Get Started'}
              </button>
            </motion.div>
          )}
        </div>
      </div>

      {showPhotoModal && (
        <div
          onClick={() => setShowPhotoModal(false)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-6"
        >

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-sm rounded-3xl bg-[#111827] border border-white/10 p-6 relative"
          >
            <button
              onClick={() => setShowPhotoModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white"
            >
              <X size={18} />
            </button>

            <div className="flex justify-center mb-4">
              <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 flex items-center justify-center">
                <Camera size={24} className="text-emerald-400" />
              </div>
            </div>

            <h2 className="text-white text-lg font-semibold text-center mb-2">
              Profile Photo Upload
            </h2>

            <p className="text-slate-400 text-sm text-center leading-relaxed">
              This portfolio project demonstrates UI/UX design and frontend
              implementation.
              <br /><br />
              Profile photo upload and cloud storage functionality are currently
              unavailable in this prototype.
            </p>

            <button
              onClick={() => setShowPhotoModal(false)}
              className="w-full h-12 mt-6 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-medium"
            >
              Got It
            </button>
          </motion.div>
        </div>
      )}
    </div >
  );
}
