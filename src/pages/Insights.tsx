import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Lightbulb, TrendingUp, TrendingDown, AlertTriangle, Sparkles, Info } from 'lucide-react';
import { insights } from '@/data/sampleData';
import { useState } from 'react'

const severityConfig: Record<string, { icon: typeof Lightbulb; color: string; bg: string; border: string }> = {
  success: { icon: TrendingUp, color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20' },
  warning: { icon: AlertTriangle, color: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/20' },
  danger: { icon: TrendingDown, color: 'text-red-400', bg: 'bg-red-500/10', border: 'border-red-500/20' },
  info: { icon: Lightbulb, color: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/20' },
};

const typeLabels: Record<string, string> = {
  spending: 'Spending',
  saving: 'Savings',
  budget: 'Budget',
  goal: 'Goal',
  bill: 'Bill',
  tip: 'Tip',
};

export default function Insights() {
  const navigate = useNavigate();
  const [showInfoModal, setShowInfoModal] = useState(false);

  return (
    <div className="min-h-screen bg-[#0a0e1a] flex justify-center">
      <div className="w-full max-w-7xl mx-auto px-5 lg:px-8">
        {/* Header */}
        <div className="sticky top-0 z-40 bg-[#0a0e1a]/95 backdrop-blur-xl border-b border-white/5 px-4 h-14 flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/5">
            <ArrowLeft size={20} className="text-white" />
          </button>
          <h1 className="text-white font-semibold">AI Insights</h1>
        </div>

        <div className="py-4 space-y-4">
          {/* Header Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-2xl bg-gradient-to-br from-purple-500/20 to-blue-500/10 border border-purple-500/20 p-6"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 rounded-2xl bg-purple-500/20 flex items-center justify-center">
                <Sparkles size={24} className="text-purple-400" />
              </div>
              <div>
                <h2 className="text-white text-lg font-bold">Smart Insights</h2>
                <p className="text-slate-400 text-xs">AI-powered financial analysis</p>
              </div>
            </div>
            <p className="text-slate-300 text-sm leading-relaxed">
              Our AI analyzes your spending patterns, budget adherence, and financial goals to provide personalized recommendations.
            </p>
          </motion.div>

          {/* Insights List */}
          {insights.map((insight, i) => {
            const config = severityConfig[insight.severity] || severityConfig.info;
            const Icon = config.icon;
            return (
              <motion.div
                key={insight.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.08 }}
                className={`rounded-2xl ${config.bg} border ${config.border} p-5`}
              >
                <div className="flex items-start gap-3">
                  <div className={`w-10 h-10 rounded-xl ${config.bg} flex items-center justify-center flex-shrink-0`}>
                    <Icon size={18} className={config.color} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`text-[10px] font-semibold uppercase tracking-wider ${config.color}`}>
                        {typeLabels[insight.type] || insight.type}
                      </span>
                    </div>
                    <h3 className="text-white text-sm font-semibold mb-1">{insight.title}</h3>
                    <p className="text-slate-400 text-xs leading-relaxed">{insight.description}</p>
                    {insight.actionLabel && (
                      <button onClick={() => setShowInfoModal(true)} className="mt-3 px-4 py-2 rounded-xl bg-white/10 text-emerald-400 text-xs font-medium">
                        {insight.actionLabel}
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}

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
