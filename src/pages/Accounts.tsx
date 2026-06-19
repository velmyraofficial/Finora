import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Landmark, Plus, Wallet, PiggyBank, CreditCard, TrendingUp, Banknote, CheckCircle, AlertCircle, Info } from 'lucide-react';
import { useApp } from '@/hooks/useAppContext';
import { useState } from 'react';

const typeIcons: Record<string, { icon: typeof Wallet; color: string }> = {
  checking: { icon: Wallet, color: '#10B981' },
  savings: { icon: PiggyBank, color: '#3B82F6' },
  credit: { icon: CreditCard, color: '#EF4444' },
  investment: { icon: TrendingUp, color: '#8B5CF6' },
  cash: { icon: Banknote, color: '#F59E0B' },
};

export default function Accounts() {
  const navigate = useNavigate();
  const { accounts } = useApp();
  const totalBalance = accounts.reduce((s, a) => s + a.balance, 0);

  const [showNotice, setShowNotice] = useState(false);
  const [showInfoModal, setShowInfoModal] = useState(false);

  return (
    <div className="min-h-screen bg-[#0a0e1a] flex justify-center">
      <div className="w-full max-w-7xl mx-auto px-5 lg:px-8">
        {/* Header */}
        <div className=" sticky top-0 z-40 bg-[#0a0e1a]/95 backdrop-blur-xl border-b border-white/5 px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={() => navigate(-1)} className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/5">
              <ArrowLeft size={20} className="text-white" />
            </button>
            <h1 className="text-white font-semibold">Accounts</h1>
          </div>
          <button onClick={() => setShowInfoModal(true)} className="w-9 h-9 rounded-xl bg-emerald-500/15 flex items-center justify-center">
            <Plus size={18} className="text-emerald-400" />
          </button>
        </div>

        <div className="py-4 space-y-5">
          {/* Total */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-2xl bg-gradient-to-br from-emerald-500/20 to-teal-500/10 border border-emerald-500/20 p-6 text-center"
          >
            <p className="text-slate-400 text-xs mb-1">Total Net Worth</p>
            <h2 className="text-3xl font-bold text-white">
              ${totalBalance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </h2>
            <div className="flex items-center justify-center gap-1 mt-2">
              <CheckCircle size={12} className="text-emerald-400" />
              <span className="text-emerald-400 text-xs">{accounts.filter(a => a.isConnected).length} of {accounts.length} accounts connected</span>
            </div>
          </motion.div>

          {/* Account List */}
          <div className="space-y-3">
            {accounts.map((account, i) => {
              const config = typeIcons[account.type] || typeIcons.checking;
              const Icon = config.icon;
              return (
                <motion.div
                  key={account.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.05 }}
                  className="rounded-2xl bg-white/5 border border-white/5 p-5"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ backgroundColor: `${account.color}20` }}>
                      <Icon size={22} style={{ color: account.color }} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <p className="text-white text-sm font-semibold">{account.name}</p>
                        {account.isConnected ? (
                          <CheckCircle size={12} className="text-emerald-400" />
                        ) : (
                          <AlertCircle size={12} className="text-amber-400" />
                        )}
                      </div>
                      <p className="text-slate-500 text-xs">{account.institution} · {account.accountNumber}</p>
                    </div>
                    <div className="text-right">
                      <p className={`text-sm font-bold ${account.type === 'cash' ? 'text-red-400' : 'text-white'
                        }`}>
                        ${Math.abs(account.balance).toLocaleString()}
                      </p>
                      <span className="text-slate-600 text-[10px] capitalize">{account.type}</span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 1 }}
            transition={{ delay: 0.4 }}
            onClick={() => setShowNotice(true)}
            className="w-full h-14 rounded-2xl bg-white/5 border border-dashed border-white/20 flex items-center justify-center gap-2 text-emerald-400 text-sm font-medium"
          >
            <Landmark size={18} />
            Connect New Bank Account
          </motion.button>

          {showNotice && (
            <div className="fixed inset-0 z-50 flex items-center justify-center">

              {/* Background blur */}
              <div
                className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                onClick={() => setShowNotice(false)}
              />

              {/* Modal box */}
              <div className="relative w-[85%] max-w-sm rounded-2xl bg-[#0f1626] border border-white/10 p-5 shadow-2xl">

                {/* Close button */}
                <button
                  onClick={() => setShowNotice(false)}
                  className="absolute top-3 right-3 text-white/60 hover:text-white"
                >
                  ✕
                </button>

                {/* Content */}
                <h3 className="text-white font-semibold mb-2">
                  Info
                </h3>

                <p className="text-slate-300 text-sm leading-relaxed">
                  This feature is part of a portfolio prototype and is not connected to real banking services.
                </p>

                {/* Button */}
                <button
                  onClick={() => setShowNotice(false)}
                  className="mt-4 w-full h-10 rounded-xl bg-emerald-500 text-white text-sm font-medium"
                >
                  Got it
                </button>
              </div>
            </div>
          )}

          <div className="h-4" />
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
