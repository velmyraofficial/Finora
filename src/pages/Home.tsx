import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Bell, TrendingUp, TrendingDown, Wallet, PiggyBank, CreditCard, ArrowRight, Sparkles, Receipt, Target, Shield } from 'lucide-react';
import { useApp } from '@/hooks/useAppContext';
import { AreaChart, Area, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { financialHealth, monthlyChartData, categoryBreakdown } from '@/data/sampleData';
import { useState, useEffect } from 'react';

const quickActions = [
  { label: 'Add Income', icon: TrendingUp, color: 'bg-emerald-500/15 text-emerald-400', route: '/add-transaction', state: { type: 'income' } },
  { label: 'Add Expense', icon: TrendingDown, color: 'bg-red-500/15 text-red-400', route: '/add-transaction', state: { type: 'expense' } },
  { label: 'Transfer', icon: Wallet, color: 'bg-blue-500/15 text-blue-400', route: '/add-transaction', state: { type: 'transfer' } },
  { label: 'Bills', icon: Receipt, color: 'bg-amber-500/15 text-amber-400', route: '/bills' },
];

export default function Home() {
  const navigate = useNavigate();
  const location = useLocation();

  const { user, accounts, transactions, budgets, savingsGoals, bills, insights, unreadNotifications } = useApp();

  const totalBalance = accounts.reduce((sum, a) => sum + a.balance, 0);
  const monthlyIncome = transactions.filter(t => t.type === 'income' && new Date(t.date).getMonth() === 5).reduce((sum, t) => sum + t.amount, 0);
  const monthlyExpense = transactions.filter(t => t.type === 'expense' && new Date(t.date).getMonth() === 5).reduce((sum, t) => sum + t.amount, 0);
  const recentTransactions = transactions.slice(0, 5);
  const upcomingBills = bills.filter(b => b.status === 'upcoming').slice(0, 3);
  const unreadInsights = insights.filter(i => !i.isRead).slice(0, 2);

  const [showDemoModal, setShowDemoModal] = useState(false);

  useEffect(() => {
    if (location.state?.showDemoNotice) {
      setShowDemoModal(true);

      navigate(location.pathname, {
        replace: true,
        state: {}
      });
    }
  }, [location.state, location.pathname, navigate]);

  return (
    <div className="min-h-screen bg-[#0a0e1a] flex justify-center">
      <div className="w-full max-w-7xl mx-auto px-5 lg:px-8">
        {/* Header */}
        <div className="px-5 pt-6 pb-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-xs">Good morning,</p>
              <h1 className="text-white text-lg font-bold">{user?.name?.split(' ')[0] || 'Alex'}</h1>
            </div>
            <button
              onClick={() => navigate('/notifications')}
              className="w-10 h-10 rounded-2xl bg-white/5 flex items-center justify-center relative"
            >
              <Bell size={20} className="text-white" />
              {unreadNotifications > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center">
                  {unreadNotifications}
                </span>
              )}
            </button>
          </div>
        </div>

        <div className="px-5 space-y-5 pb-6">
          {/* Total Balance Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative rounded-3xl overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 via-teal-500/10 to-blue-500/20" />
            <div className="absolute inset-0 backdrop-blur-xl" />
            <div className="relative p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-slate-300 text-sm font-medium">Total Balance</span>
                <div className="flex items-center gap-1 bg-emerald-500/20 px-2.5 py-1 rounded-full">
                  <TrendingUp size={12} className="text-emerald-400" />
                  <span className="text-emerald-400 text-xs font-semibold">+12.5%</span>
                </div>
              </div>
              <h2 className="text-3xl font-bold text-white mb-1">
                ${totalBalance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </h2>
              <p className="text-slate-400 text-xs mb-4">Across {accounts.length} accounts</p>

              {/* Mini Chart */}
              <div className="h-16 -mx-2">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={monthlyChartData}>
                    <Area type="monotone" dataKey="balance" stroke="#10B981" strokeWidth={2} fill="url(#balanceGrad)" />
                    <defs>
                      <linearGradient id="balanceGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#10B981" stopOpacity={0.3} />
                        <stop offset="100%" stopColor="#10B981" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </motion.div>

          {/* Stats Row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-2 gap-3"
          >
            <div className="rounded-2xl bg-white/5 border border-white/5 p-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/15 flex items-center justify-center">
                  <TrendingUp size={16} className="text-emerald-400" />
                </div>
                <span className="text-slate-400 text-xs">Income</span>
              </div>
              <p className="text-white font-bold text-lg">${monthlyIncome.toLocaleString()}</p>
            </div>
            <div className="rounded-2xl bg-white/5 border border-white/5 p-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-lg bg-red-500/15 flex items-center justify-center">
                  <TrendingDown size={16} className="text-red-400" />
                </div>
                <span className="text-slate-400 text-xs">Expenses</span>
              </div>
              <p className="text-white font-bold text-lg">${monthlyExpense.toLocaleString()}</p>
            </div>
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="grid grid-cols-4 gap-3"
          >
            {quickActions.map((action) => (
              <button
                key={action.label}
                onClick={() => navigate(action.route, { state: action.state })}
                className="flex flex-col items-center gap-2 tap-highlight-transparent"
              >
                <div className={`w-12 h-12 rounded-2xl ${action.color} flex items-center justify-center`}>
                  <action.icon size={20} />
                </div>
                <span className="text-slate-400 text-[10px] font-medium">{action.label}</span>
              </button>
            ))}
          </motion.div>

          {/* Financial Health Score */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="rounded-2xl bg-white/5 border border-white/5 p-5"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Sparkles size={16} className="text-amber-400" />
                <span className="text-white text-sm font-semibold">Financial Health</span>
              </div>
              <span className="text-emerald-400 text-lg font-bold">{financialHealth.score}</span>
            </div>
            <div className="flex gap-2">
              {financialHealth.factors.map(f => (
                <div key={f.name} className="flex-1">
                  <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(f.score / f.maxScore) * 100}%` }}
                      transition={{ delay: 0.5, duration: 0.8 }}
                      className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-400"
                    />
                  </div>
                  <p className="text-slate-500 text-[10px] mt-1 text-center">{f.name}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* AI Insights */}
          {unreadInsights.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-white text-sm font-semibold">Smart Insights</h3>
                <button onClick={() => navigate('/insights')} className="text-emerald-400 text-xs flex items-center gap-1">
                  View All <ArrowRight size={14} />
                </button>
              </div>
              <div className="space-y-3">
                {unreadInsights.map(insight => (
                  <div
                    key={insight.id}
                    className={`rounded-2xl p-4 border ${insight.severity === 'warning' ? 'bg-amber-500/5 border-amber-500/20' :
                      insight.severity === 'danger' ? 'bg-red-500/5 border-red-500/20' :
                        'bg-emerald-500/5 border-emerald-500/20'
                      }`}
                  >
                    <p className="text-white text-sm font-medium mb-1">{insight.title}</p>
                    <p className="text-slate-400 text-xs leading-relaxed">{insight.description}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Accounts Overview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-white text-sm font-semibold">My Accounts</h3>
              <button onClick={() => navigate('/accounts')} className="text-emerald-400 text-xs flex items-center gap-1">
                View All <ArrowRight size={14} />
              </button>
            </div>
            <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-1 -mx-5 px-5">
              {accounts.map(account => (
                <button
                  key={account.id}
                  onClick={() => navigate('/accounts')}
                  className="flex-shrink-0 w-40 rounded-2xl bg-white/5 border border-white/5 p-4 text-left"
                >
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center mb-3" style={{ backgroundColor: `${account.color}20` }}>
                    {account.type === 'checking' && <Wallet size={18} style={{ color: account.color }} />}
                    {account.type === 'savings' && <PiggyBank size={18} style={{ color: account.color }} />}
                    {account.type === 'credit' && <CreditCard size={18} style={{ color: account.color }} />}
                    {account.type === 'investment' && <TrendingUp size={18} style={{ color: account.color }} />}
                    {account.type === 'cash' && <Wallet size={18} style={{ color: account.color }} />}
                  </div>
                  <p className="text-slate-400 text-[10px] mb-1">{account.institution}</p>
                  <p className="text-white text-sm font-semibold">${account.balance.toLocaleString()}</p>
                </button>
              ))}
            </div>
          </motion.div>

          {/* Spending Breakdown */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="rounded-2xl bg-white/5 border border-white/5 p-5"
          >
            <h3 className="text-white text-sm font-semibold mb-4">Spending Breakdown</h3>
            <div className="flex items-center gap-4">
              <div className="w-24 h-24 flex-shrink-0">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={categoryBreakdown.slice(0, 5)}
                      cx="50%"
                      cy="50%"
                      innerRadius={28}
                      outerRadius={40}
                      paddingAngle={3}
                      dataKey="amount"
                    >
                      {categoryBreakdown.slice(0, 5).map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex-1 space-y-2">
                {categoryBreakdown.slice(0, 4).map(cat => (
                  <div key={cat.category} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: cat.color }} />
                      <span className="text-slate-300 text-xs">{cat.category}</span>
                    </div>
                    <span className="text-white text-xs font-medium">{cat.percentage}%</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Recent Transactions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-white text-sm font-semibold">Recent Transactions</h3>
              <button onClick={() => navigate('/transactions')} className="text-emerald-400 text-xs flex items-center gap-1">
                See All <ArrowRight size={14} />
              </button>
            </div>
            <div className="space-y-2">
              {recentTransactions.map((tx, i) => (
                <motion.button
                  key={tx.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + i * 0.05 }}
                  onClick={() => navigate(`/transaction/${tx.id}`)}
                  className="w-full flex items-center gap-3 p-3 rounded-2xl bg-white/5 border border-white/5 text-left"
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${tx.type === 'income' ? 'bg-emerald-500/15' : tx.type === 'expense' ? 'bg-red-500/15' : 'bg-blue-500/15'
                    }`}>
                    {tx.type === 'income' && <TrendingUp size={18} className="text-emerald-400" />}
                    {tx.type === 'expense' && <TrendingDown size={18} className="text-red-400" />}
                    {tx.type === 'transfer' && <Wallet size={18} className="text-blue-400" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white text-sm font-medium truncate">{tx.description}</p>
                    <p className="text-slate-500 text-xs">{tx.category}</p>
                  </div>
                  <span className={`text-sm font-semibold flex-shrink-0 ${tx.type === 'income' ? 'text-emerald-400' : tx.type === 'expense' ? 'text-red-400' : 'text-blue-400'
                    }`}>
                    {tx.type === 'income' ? '+' : tx.type === 'expense' ? '-' : ''}${tx.amount.toFixed(2)}
                  </span>
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Budget Progress */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45 }}
            className="rounded-2xl bg-white/5 border border-white/5 p-5"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white text-sm font-semibold">Budget Status</h3>
              <button onClick={() => navigate('/budget')} className="text-emerald-400 text-xs flex items-center gap-1">
                Details <ArrowRight size={14} />
              </button>
            </div>
            <div className="space-y-3">
              {budgets.slice(0, 3).map(budget => {
                const pct = (budget.spent / budget.limit) * 100;
                return (
                  <div key={budget.id}>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-slate-300 text-xs">{budget.category}</span>
                      <span className={`text-xs font-medium ${pct > 90 ? 'text-red-400' : pct > 75 ? 'text-amber-400' : 'text-emerald-400'}`}>
                        ${budget.spent.toFixed(0)} / ${budget.limit}
                      </span>
                    </div>
                    <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${Math.min(pct, 100)}%` }}
                        transition={{ delay: 0.6, duration: 0.8 }}
                        className={`h-full rounded-full ${pct > 90 ? 'bg-red-500' : pct > 75 ? 'bg-amber-500' : 'bg-emerald-500'
                          }`}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* Savings Goals */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-white text-sm font-semibold">Savings Goals</h3>
              <button onClick={() => navigate('/savings-goals')} className="text-emerald-400 text-xs flex items-center gap-1">
                All Goals <ArrowRight size={14} />
              </button>
            </div>
            <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-1 -mx-5 px-5">
              {savingsGoals.map(goal => {
                const pct = (goal.currentAmount / goal.targetAmount) * 100;
                return (
                  <div key={goal.id} className="flex-shrink-0 w-36 rounded-2xl bg-white/5 border border-white/5 p-4">
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center mb-3" style={{ backgroundColor: `${goal.color}20` }}>
                      <Target size={18} style={{ color: goal.color }} />
                    </div>
                    <p className="text-white text-xs font-semibold mb-1 truncate">{goal.name}</p>
                    <p className="text-slate-400 text-[10px] mb-2">${goal.currentAmount.toLocaleString()} / ${goal.targetAmount.toLocaleString()}</p>
                    <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
                      <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, backgroundColor: goal.color }} />
                    </div>
                    <p className="text-[10px] mt-1" style={{ color: goal.color }}>{pct.toFixed(0)}%</p>
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* Upcoming Bills */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55 }}
            className="rounded-2xl bg-white/5 border border-white/5 p-5"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white text-sm font-semibold">Upcoming Bills</h3>
              <button onClick={() => navigate('/bills')} className="text-emerald-400 text-xs flex items-center gap-1">
                View All <ArrowRight size={14} />
              </button>
            </div>
            <div className="space-y-3">
              {upcomingBills.map(bill => (
                <div key={bill.id} className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/15 flex items-center justify-center flex-shrink-0">
                    <Receipt size={18} className="text-amber-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white text-sm font-medium truncate">{bill.name}</p>
                    <p className="text-slate-500 text-xs">Due {new Date(bill.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</p>
                  </div>
                  <span className="text-white text-sm font-semibold flex-shrink-0">${bill.amount.toFixed(2)}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <div className="h-4" />
        </div>
      </div>

      {showDemoModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4"
          onClick={() => setShowDemoModal(false)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md rounded-3xl bg-[#111827] border border-white/10 p-6 relative shadow-2xl"
          >
            {/* Close Button */}
            <button
              onClick={() => setShowDemoModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white"
            >
              ✕
            </button>

            {/* Icon */}
            <div className="flex justify-center mb-4">
              <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 flex items-center justify-center">
                <Shield size={28} className="text-emerald-400" />
              </div>
            </div>

            {/* Content */}
            <h2 className="text-xl font-semibold text-white text-center mb-3">
              Portfolio Prototype
            </h2>

            <p className="text-sm text-slate-400 text-center leading-relaxed">
              This application is a frontend UI/UX demonstration project.
              <br />
              <br />
              The content displayed throughout the app uses mock data and may not
              reflect real financial information.
              <br />
              <br />
              No live APIs, cloud services, banking systems, or third-party
              integrations are connected.
            </p>

            <button
              onClick={() => setShowDemoModal(false)}
              className="w-full mt-6 h-12 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-medium"
            >
              Continue
            </button>
          </motion.div>
        </div>
      )}

    </div>
  );
}






// // implement the last chat of centered layout fix