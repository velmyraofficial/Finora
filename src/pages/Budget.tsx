import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Plus, Target, AlertTriangle, Check, ArrowRight, PiggyBank, Info} from 'lucide-react';
import { useApp } from '@/hooks/useAppContext';
import { savingsGoals } from '@/data/sampleData';

export default function Budget() {
  // const navigate = useNavigate();
  const { budgets } = useApp();
  const [activeTab, setActiveTab] = useState<'budgets' | 'goals'>('budgets');
  // const [showAddBudget, setShowAddBudget] = useState(false);

  const totalBudget = budgets.reduce((s, b) => s + b.limit, 0);
  const totalSpent = budgets.reduce((s, b) => s + b.spent, 0);
  const overallPct = (totalSpent / totalBudget) * 100;
  const [showInfoModal, setShowInfoModal] = useState(false);

  return (
    <div className="min-h-screen bg-[#0a0e1a] flex justify-center">

      <div className="w-full max-w-7xl mx-auto px-5 lg:px-8">
        {/* Header */}
        <div className="sticky top-0 z-40 bg-[#0a0e1a]/95 backdrop-blur-xl border-b border-white/5 px-5 pt-4 pb-3">
          <div className="flex items-center justify-between mb-3">
            <h1 className="text-xl font-bold text-white">Budget</h1>
            <button
              // onClick={() => activeTab === 'budgets' ? setShowAddBudget(!showAddBudget) : navigate('/savings-goals')}
              onClick={() => setShowInfoModal(true)}
              className="w-9 h-9 rounded-xl bg-emerald-500/15 flex items-center justify-center"
            >
              <Plus size={18} className="text-emerald-400" />
            </button>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setActiveTab('budgets')}
              className={`flex-1 h-10 rounded-xl text-xs font-semibold transition-colors ${activeTab === 'budgets' ? 'bg-emerald-500 text-white' : 'bg-white/5 text-slate-400 border border-white/10'
                }`}
            >
              Budgets
            </button>
            <button
              onClick={() => setActiveTab('goals')}
              className={`flex-1 h-10 rounded-xl text-xs font-semibold transition-colors ${activeTab === 'goals' ? 'bg-emerald-500 text-white' : 'bg-white/5 text-slate-400 border border-white/10'
                }`}
            >
              Savings Goals
            </button>
          </div>
        </div>

        {/* Main Content */}

        <div className="space-y-6 lg:space-y-8 pb-8">
          {activeTab === 'budgets' && (
            <>
              {/* Overall Budget */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-2xl bg-white/5 border border-white/5 p-5"
              >
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <p className="text-slate-400 text-xs">Total Budget</p>
                    <p className="text-white text-xl font-bold">${totalBudget.toLocaleString()}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-slate-400 text-xs">Spent</p>
                    <p className="text-red-400 text-lg font-bold">${totalSpent.toLocaleString()}</p>
                  </div>
                </div>
                <div className="h-3 rounded-full bg-white/10 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min(overallPct, 100)}%` }}
                    transition={{ duration: 1 }}
                    className={`h-full rounded-full ${overallPct > 90 ? 'bg-red-500' : overallPct > 75 ? 'bg-amber-500' : 'bg-emerald-500'}`}
                  />
                </div>
                <p className="text-slate-500 text-xs mt-2">{overallPct.toFixed(1)}% used · ${(totalBudget - totalSpent).toLocaleString()} remaining</p>
              </motion.div>

              {/* Category Budgets */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="space-y-3"
              >
                {budgets.map((budget, i) => {
                  const pct = (budget.spent / budget.limit) * 100;
                  const isOver = pct > 100;
                  const isComplete = pct === 100;
                  const isWarning = pct > budget.alertThreshold && pct < 100;
                  return (
                    <motion.div
                      key={budget.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.15 + i * 0.05 }}
                      className="rounded-2xl bg-white/5 border border-white/5 p-4"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          {isOver && <AlertTriangle size={14} className="text-red-400" />}

                          {isComplete && (
                            <Check size={14} className="text-teal-400" />
                          )}

                          {!isOver && !isComplete && pct >= 100 && (
                            <Check size={14} className="text-teal-400" />
                          )}
                          <span className="text-white text-sm font-medium">{budget.category}</span>
                        </div>
                        <span className={`text-xs font-semibold ${isOver
                          ? 'text-red-400'
                          : isComplete
                            ? 'text-teal-400'
                            : isWarning
                              ? 'text-amber-400'
                              : 'text-emerald-400'
                          }`}>
                          {pct.toFixed(1)}%
                        </span>
                      </div>
                      <div className="h-2 rounded-full bg-white/10 overflow-hidden mb-2">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${Math.min(pct, 100)}%` }}
                          transition={{ delay: 0.3 + i * 0.05, duration: 0.6 }}
                          // className={`h-full rounded-full ${isOver ? 'bg-red-500' : isWarning ? 'bg-amber-500' : 'bg-emerald-500'
                          //   }`}

                          className={`h-full rounded-full ${isOver
                            ? 'bg-red-500'
                            : isComplete
                              ? 'bg-purple-500'
                              : isWarning
                                ? 'bg-amber-500'
                                : 'bg-emerald-500'
                            }`}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-500 text-xs">${budget.spent.toFixed(0)} spent</span>
                        <span className="text-slate-500 text-xs">${budget.limit.toLocaleString()} limit</span>
                      </div>
                      {isWarning && !isOver && (
                        <p className="text-amber-400 text-[10px] mt-2 flex items-center gap-1">
                          <AlertTriangle size={10} /> Approaching budget limit
                        </p>
                      )}
                      {isOver && (
                        <p className="text-red-400 text-[10px] mt-2 flex items-center gap-1">
                          <AlertTriangle size={10} /> Budget exceeded by ${(budget.spent - budget.limit).toFixed(2)}
                        </p>
                      )}
                    </motion.div>
                  );
                })}
              </motion.div>
            </>
          )}

          {activeTab === 'goals' && (
            <>
              {/* Goals Summary */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-2xl bg-white/5 border border-white/5 p-5"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/15 flex items-center justify-center">
                    <PiggyBank size={20} className="text-emerald-400" />
                  </div>
                  <div>
                    <p className="text-slate-400 text-xs">Total Saved</p>
                    <p className="text-white text-xl font-bold">
                      ${savingsGoals.reduce((s, g) => s + g.currentAmount, 0).toLocaleString()}
                    </p>
                  </div>
                </div>
                <p className="text-slate-500 text-xs">
                  Across {savingsGoals.length} active goals
                </p>
              </motion.div>

              {/* Goals List */}
              <div className="space-y-4">
                {savingsGoals.map((goal, i) => {
                  const pct = (goal.currentAmount / goal.targetAmount) * 100;
                  const daysLeft = Math.ceil((new Date(goal.deadline).getTime() - Date.now()) / (1000 * 60 * 60 * 24));
                  return (
                    <motion.div
                      key={goal.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 + i * 0.08 }}
                      className="rounded-2xl bg-white/5 border border-white/5 p-5"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${goal.color}20` }}>
                            <Target size={20} style={{ color: goal.color }} />
                          </div>
                          <div>
                            <p className="text-white text-sm font-semibold">{goal.name}</p>
                            <p className="text-slate-500 text-xs">{daysLeft > 0 ? `${daysLeft} days left` : 'Deadline passed'}</p>
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
                      <div className="flex items-center justify-between">
                        <span className="text-slate-400 text-xs">${goal.currentAmount.toLocaleString()}</span>
                        <span className="text-slate-500 text-xs">${goal.targetAmount.toLocaleString()}</span>
                      </div>
                      <button className="w-full mt-3 h-9 rounded-xl bg-white/5 border border-white/10 text-emerald-400 text-xs font-medium flex items-center justify-center gap-1">
                        Add Funds <ArrowRight size={12} />
                      </button>
                    </motion.div>
                  );
                })}
              </div>
            </>
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
