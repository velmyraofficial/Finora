import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Plus, Receipt, AlertTriangle, Clock, Repeat, CreditCard, Info } from 'lucide-react';
import type { Bill } from '@/types';
import { useApp } from '@/hooks/useAppContext';
import { useState } from 'react'

export default function Bills() {
  const navigate = useNavigate();
  const { bills } = useApp();

  const upcoming = bills.filter(b => b.status === 'upcoming');
  const overdue = bills.filter(b => b.status === 'overdue');

  const totalUpcoming = upcoming.reduce((s, b) => s + b.amount, 0);
  const totalOverdue = overdue.reduce((s, b) => s + b.amount, 0);
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
            <h1 className="text-white font-semibold">Bills & Subscriptions</h1>
          </div>
          <button onClick={() => setShowInfoModal(true)} className="w-9 h-9 rounded-xl bg-emerald-500/15 flex items-center justify-center">
            <Plus size={18} className="text-emerald-400" />
          </button>
        </div>

        <div className="py-4 space-y-5">
          {/* Summary Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-2 gap-3"
          >
            <div className="rounded-2xl bg-amber-500/10 border border-amber-500/20 p-4">
              <div className="flex items-center gap-2 mb-2">
                <Clock size={14} className="text-amber-400" />
                <span className="text-amber-400 text-xs">Upcoming</span>
              </div>
              <p className="text-white text-lg font-bold">${totalUpcoming.toFixed(2)}</p>
              <p className="text-slate-500 text-[10px] mt-1">{upcoming.length} bills</p>
            </div>
            <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-4">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle size={14} className="text-red-400" />
                <span className="text-red-400 text-xs">Overdue</span>
              </div>
              <p className="text-white text-lg font-bold">${totalOverdue.toFixed(2)}</p>
              <p className="text-slate-500 text-[10px] mt-1">{overdue.length} bills</p>
            </div>
          </motion.div>

          {/* Overdue Section */}
          {overdue.length > 0 && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
              <h3 className="text-red-400 text-xs font-semibold mb-3 flex items-center gap-1.5">
                <AlertTriangle size={14} /> Overdue
              </h3>
              <div className="space-y-2">
                {overdue.map(bill => (
                  <BillCard key={bill.id} bill={bill} statusColor="red" />
                ))}
              </div>
            </motion.div>
          )}

          {/* Upcoming Section */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <h3 className="text-amber-400 text-xs font-semibold mb-3 flex items-center gap-1.5">
              <Clock size={14} /> Upcoming
            </h3>
            <div className="space-y-2">
              {upcoming.map(bill => (
                <BillCard key={bill.id} bill={bill} statusColor="amber" />
              ))}
            </div>
          </motion.div>

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

function BillCard({ bill, statusColor }: { bill: Bill; statusColor: string }) {
  const daysUntil = Math.ceil((new Date(bill.dueDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24));
  const colorClasses: Record<string, { bg: string; border: string; badge: string }> = {
    red: { bg: 'bg-red-500/5', border: 'border-red-500/15', badge: 'bg-red-500/15 text-red-400' },
    amber: { bg: 'bg-amber-500/5', border: 'border-amber-500/15', badge: 'bg-amber-500/15 text-amber-400' },
    emerald: { bg: 'bg-emerald-500/5', border: 'border-emerald-500/15', badge: 'bg-emerald-500/15 text-emerald-400' },
  };
  const c = colorClasses[statusColor] || colorClasses.amber;

  return (
    <div className={`rounded-2xl ${c.bg} border ${c.border} p-4`}>
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
          <Receipt size={18} className="text-slate-400" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <p className="text-white text-sm font-medium truncate">{bill.name}</p>
            {bill.isRecurring && <Repeat size={10} className="text-slate-500 flex-shrink-0" />}
          </div>
          <p className="text-slate-500 text-xs">{bill.merchant}</p>
        </div>
        <div className="text-right flex-shrink-0">
          <p className="text-white text-sm font-bold">${bill.amount.toFixed(2)}</p>
          <span className={`text-[10px] px-2 py-0.5 rounded-full ${c.badge}`}>
            {daysUntil > 0 ? `${daysUntil} days` : 'Today'}
          </span>
        </div>
      </div>
      {bill.autopay && (
        <div className="flex items-center gap-1 mt-2 pt-2 border-t border-white/5">
          <CreditCard size={10} className="text-emerald-400" />
          <span className="text-emerald-400 text-[10px]">Autopay enabled</span>
        </div>
      )}

    </div>
  );
}
