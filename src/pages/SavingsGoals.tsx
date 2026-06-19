import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Plus, Target, PiggyBank, TrendingUp, Calendar, Info } from 'lucide-react';
import { useApp } from '@/hooks/useAppContext';
import { useState } from 'react'

export default function SavingsGoals() {
  const navigate = useNavigate();
  const { savingsGoals } = useApp();

  const totalSaved = savingsGoals.reduce((s, g) => s + g.currentAmount, 0);
  const totalTarget = savingsGoals.reduce((s, g) => s + g.targetAmount, 0);
  const [showInfoModal, setShowInfoModal] = useState(false);

  return (
    <div className="min-h-screen bg-[#0a0e1a] flex justify-center">
      <div className="w-full max-w-7xl mx-auto px-5 lg:px-8">
        {/* Header */}
        <div className="sticky top-0 z-40 bg-[#0a0e1a]/95 backdrop-blur-xl border-b border-white/5 px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={() => navigate(-1)} className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/5">
              <ArrowLeft size={20} className="text-white" />
            </button>
            <h1 className="text-white font-semibold">Savings Goals</h1>
          </div>
          <button onClick={() => setShowInfoModal(true)} className="w-9 h-9 rounded-xl bg-emerald-500/15 flex items-center justify-center">
            <Plus size={18} className="text-emerald-400" />
          </button>
        </div>

        <div className="py-4 space-y-5">
          {/* Summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-2xl bg-gradient-to-br from-emerald-500/20 to-teal-500/10 border border-emerald-500/20 p-6"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 flex items-center justify-center">
                <PiggyBank size={26} className="text-emerald-400" />
              </div>
              <div>
                <p className="text-slate-400 text-xs">Total Saved</p>
                <h2 className="text-2xl font-bold text-white">${totalSaved.toLocaleString()}</h2>
              </div>
            </div>
            <div className="h-2 rounded-full bg-white/10 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(totalSaved / totalTarget) * 100}%` }}
                transition={{ duration: 1 }}
                className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-400"
              />
            </div>
            <p className="text-slate-400 text-xs mt-2">${(totalTarget - totalSaved).toLocaleString()} to reach all goals</p>
          </motion.div>

          {/* Goals */}
          <div className="space-y-4">
            {savingsGoals.map((goal, i) => {
              const pct = (goal.currentAmount / goal.targetAmount) * 100;
              const daysLeft = Math.ceil((new Date(goal.deadline).getTime() - Date.now()) / (1000 * 60 * 60 * 24));
              const monthlyNeeded = daysLeft > 0 ? ((goal.targetAmount - goal.currentAmount) / (daysLeft / 30)).toFixed(0) : '0';

              return (
                <motion.div
                  key={goal.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.08 }}
                  className="rounded-2xl bg-white/5 border border-white/5 p-5"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${goal.color}20` }}>
                        <Target size={20} style={{ color: goal.color }} />
                      </div>
                      <div>
                        <p className="text-white text-sm font-semibold">{goal.name}</p>
                        <div className="flex items-center gap-1 mt-0.5">
                          <Calendar size={10} className="text-slate-500" />
                          <span className="text-slate-500 text-[10px]">{daysLeft > 0 ? `${daysLeft} days left` : 'Overdue'}</span>
                        </div>
                      </div>
                    </div>
                    <span className="text-white font-bold">{pct.toFixed(0)}%</span>
                  </div>

                  <div className="h-3 rounded-full bg-white/10 overflow-hidden mb-3">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.min(pct, 100)}%` }}
                      transition={{ delay: 0.3 + i * 0.1, duration: 0.8 }}
                      className="h-full rounded-full"
                      style={{ backgroundColor: goal.color }}
                    />
                  </div>

                  <div className="flex items-center justify-between text-xs mb-3">
                    <span className="text-slate-400">${goal.currentAmount.toLocaleString()}</span>
                    <span className="text-slate-500">${goal.targetAmount.toLocaleString()}</span>
                  </div>

                  <div className="flex items-center gap-2 p-3 rounded-xl bg-white/[0.03]">
                    <TrendingUp size={14} className="text-emerald-400" />
                    <span className="text-slate-400 text-xs">Save <span className="text-emerald-400 font-medium">${monthlyNeeded}/month</span> to reach goal</span>
                  </div>

                  <button className="w-full mt-3 h-10 rounded-xl bg-emerald-500/15 text-emerald-400 text-xs font-semibold">
                    Add Funds
                  </button>
                </motion.div>
              );
            })}
          </div>

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
