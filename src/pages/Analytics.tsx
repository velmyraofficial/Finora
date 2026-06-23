import { useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Wallet, BarChart3, PieChart as PieIcon, LineChart as LineIcon, Lightbulb, Shield } from 'lucide-react';
import { useApp } from '@/hooks/useAppContext';
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts';
import { monthlyChartData, weeklyChartData, categoryBreakdown, insights } from '@/data/sampleData';
import type { TimeRange } from '@/types';

const timeRanges: { label: string; value: TimeRange }[] = [
  { label: 'D', value: 'daily' },
  { label: 'W', value: 'weekly' },
  { label: 'M', value: 'monthly' },
  { label: 'Y', value: 'yearly' },
];

type ChartTab = 'overview' | 'category' | 'trend';

const COLORS = ['#6366F1', '#EF4444', '#EC4899', '#3B82F6', '#F59E0B', '#8B5CF6', '#14B8A6', '#10B981', '#6B7280'];

export default function Analytics() {
  const { transactions } = useApp();
  const [timeRange, setTimeRange] = useState<TimeRange>('monthly');
  const [chartTab, setChartTab] = useState<ChartTab>('overview');

  const income = transactions.filter(t => t.type === 'income').reduce((s, t) => s + t.amount, 0);
  const expense = transactions.filter(t => t.type === 'expense').reduce((s, t) => s + t.amount, 0);
  const netFlow = income - expense;
  const savingsRate = income > 0 ? ((income - expense) / income) * 100 : 0;

  const chartData = timeRange === 'weekly' ? weeklyChartData : monthlyChartData;

  return (
    <div className="min-h-screen bg-[#0a0e1a] flex justify-center">

      <div className="w-full max-w-7xl mx-auto px-5 lg:px-8">
        {/* Header */}
        <div className="sticky top-0 z-40 bg-[#0a0e1a]/95 backdrop-blur-xl border-b border-white/5 px-5 pt-4 pb-3">
          <h1 className="text-xl font-bold text-white mb-3">Analytics</h1>
          <div className="flex gap-2">
            {timeRanges.map(tr => (
              <button
                key={tr.value}
                onClick={() => setTimeRange(tr.value)}
                className={`flex-1 h-9 rounded-lg text-xs font-semibold transition-colors ${timeRange === tr.value ? 'bg-emerald-500 text-white' : 'bg-white/5 text-slate-400 border border-white/10'
                  }`}
              >
                {tr.label}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-8 p-5 bg-amber-500/10 border border-amber-500/20 rounded-2xl relative overflow-hidden shadow-lg shadow-amber-500/10">

          <div className="pointer-events-none absolute -top-10 -right-10 w-32 h-32 bg-amber-500/20 blur-3xl rounded-full opacity-40" />

          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400">
              <Shield size={20} />
            </div>

            <h2 className="text-lg font-bold text-white">
              Portfolio Prototype
            </h2>

            <span className="ml-auto px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-400 uppercase tracking-wider">
              Demo
            </span>
          </div>

          <p className="text-slate-400 text-sm leading-relaxed">
            The analytics shown on this page are generated using mock/demo data and may not reflect actual financial activity or real-world performance.
          </p>
        </div>

        <div className="space-y-6 lg:space-y-8 pb-8">

          {/* Summary Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-2 gap-3"
          >
            <div className="rounded-2xl bg-emerald-500/10 border border-emerald-500/20 p-4">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp size={14} className="text-emerald-400" />
                <span className="text-emerald-400 text-xs">Income</span>
              </div>
              <p className="text-white text-lg font-bold">${income.toLocaleString()}</p>
            </div>
            <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-4">
              <div className="flex items-center gap-2 mb-2">
                <TrendingDown size={14} className="text-red-400" />
                <span className="text-red-400 text-xs">Expenses</span>
              </div>
              <p className="text-white text-lg font-bold">${expense.toLocaleString()}</p>
            </div>
            <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-4">
              <div className="flex items-center gap-2 mb-2">
                <Wallet size={14} className="text-blue-400" />
                <span className="text-blue-400 text-xs">Net Flow</span>
              </div>
              <p className={`text-lg font-bold ${netFlow >= 0 ? 'text-white-400' : 'text-red-400'}`}>
                ${netFlow.toLocaleString()}
              </p>
            </div>
            <div className="rounded-2xl bg-amber-500/10 border border-amber-500/20 p-4">
              <div className="flex items-center gap-2 mb-2">
                <BarChart3 size={14} className="text-amber-400" />
                <span className="text-amber-400 text-xs">Savings Rate</span>
              </div>
              <p className="text-white text-lg font-bold">{savingsRate.toFixed(1)}%</p>
            </div>
          </motion.div>

          {/* Chart Tabs */}
          <div className="flex gap-2">
            {([
              { key: 'overview' as ChartTab, label: 'Overview', icon: LineIcon },
              { key: 'category' as ChartTab, label: 'Categories', icon: PieIcon },
              { key: 'trend' as ChartTab, label: 'Trends', icon: BarChart3 },
            ]).map(tab => (
              <button
                key={tab.key}
                onClick={() => setChartTab(tab.key)}
                className={`flex-1 h-10 rounded-xl text-xs font-medium flex items-center justify-center gap-1.5 transition-colors ${chartTab === tab.key ? 'bg-white/10 text-white border border-white/15' : 'text-slate-500'
                  }`}
              >
                <tab.icon size={14} />
                {tab.label}
              </button>
            ))}
          </div>

          {/* Charts */}
          {chartTab === 'overview' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-2xl bg-white/5 border border-white/5 p-5"
            >
              <h3 className="text-white text-sm font-semibold mb-4">Cash Flow</h3>
              <div className="h-52">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData}>
                    <defs>
                      <linearGradient id="incomeGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#10B981" stopOpacity={0.3} />
                        <stop offset="100%" stopColor="#10B981" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="expenseGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#EF4444" stopOpacity={0.3} />
                        <stop offset="100%" stopColor="#EF4444" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                    <XAxis dataKey="label" stroke="#64748b" fontSize={11} tickLine={false} axisLine={false} />
                    <YAxis stroke="#64748b" fontSize={11} tickLine={false} axisLine={false} tickFormatter={v => `$${v / 1000}k`} />
                    <Tooltip
                      contentStyle={{ backgroundColor: '#1e293b', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: '#fff' }}
                      formatter={(value: number) => [`$${value.toLocaleString()}`, '']}
                    />
                    <Area type="monotone" dataKey="income" stroke="#10B981" strokeWidth={2} fill="url(#incomeGrad)" name="Income" />
                    <Area type="monotone" dataKey="expense" stroke="#EF4444" strokeWidth={2} fill="url(#expenseGrad)" name="Expenses" />
                    <Legend iconType="circle" iconSize={8} formatter={(v) => <span className="text-slate-400 text-xs">{v}</span>} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </motion.div>
          )}

          {chartTab === 'category' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-2xl bg-white/5 border border-white/5 p-5"
            >
              <h3 className="text-white text-sm font-semibold mb-4">Spending by Category</h3>
              <div className="h-52">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={categoryBreakdown}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={80}
                      paddingAngle={3}
                      dataKey="amount"
                    >
                      {categoryBreakdown.map((_entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{ backgroundColor: '#1e293b', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: '#fff' }}
                      formatter={(value: number, name: string) => [`$${value.toLocaleString()}`, name]}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 space-y-2">
                {categoryBreakdown.map((cat, i) => (
                  <div key={cat.category} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[i % COLORS.length] }} />
                      <span className="text-slate-300 text-xs">{cat.category}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-white text-xs font-medium">${cat.amount.toLocaleString()}</span>
                      <span className="text-slate-500 text-xs">{cat.percentage}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {chartTab === 'trend' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-2xl bg-white/5 border border-white/5 p-5"
            >
              <h3 className="text-white text-sm font-semibold mb-4">Monthly Comparison</h3>
              <div className="h-52">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={monthlyChartData} barGap={4}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                    <XAxis dataKey="label" stroke="#64748b" fontSize={11} tickLine={false} axisLine={false} />
                    <YAxis stroke="#64748b" fontSize={11} tickLine={false} axisLine={false} tickFormatter={v => `$${v / 1000}k`} />
                    <Tooltip
                      contentStyle={{ backgroundColor: '#1e293b', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: '#fff' }}
                      formatter={(value: number) => [`$${value.toLocaleString()}`, '']}
                    />
                    <Bar dataKey="income" fill="#10B981" radius={[4, 4, 0, 0]} name="Income" />
                    <Bar dataKey="expense" fill="#EF4444" radius={[4, 4, 0, 0]} name="Expenses" />
                    <Legend iconType="circle" iconSize={8} formatter={(v) => <span className="text-slate-400 text-xs">{v}</span>} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </motion.div>
          )}

          {/* AI Insights */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex items-center gap-2 mb-3">
              <Lightbulb size={16} className="text-amber-400" />
              <h3 className="text-white text-sm font-semibold">AI Insights</h3>
            </div>
            <div className="space-y-3">
              {insights.slice(0, 4).map(insight => (
                <div
                  key={insight.id}
                  className={`rounded-2xl p-4 border ${insight.severity === 'warning' ? 'bg-amber-500/5 border-amber-500/20' :
                    insight.severity === 'danger' ? 'bg-red-500/5 border-red-500/20' :
                      insight.severity === 'success' ? 'bg-emerald-500/5 border-emerald-500/20' :
                        'bg-blue-500/5 border-blue-500/20'
                    }`}
                >
                  <p className="text-white text-sm font-medium mb-1">{insight.title}</p>
                  <p className="text-slate-400 text-xs leading-relaxed">{insight.description}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <div className="h-4" />
        </div>
      </div>
    </div >
  );
}
