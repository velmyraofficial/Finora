import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, TrendingUp, TrendingDown, ArrowLeftRight, Receipt, Calendar, Tag, FileText, Building2, Trash2, Pencil, Info } from 'lucide-react';
import { useApp } from '@/hooks/useAppContext';
import { useState } from 'react'

export default function TransactionDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { transactions, deleteTransaction } = useApp();
  const tx = transactions.find(t => t.id === id);
  const [showInfoModal, setShowInfoModal] = useState(false);

  if (!tx) {
    return (
      <div className="min-h-screen bg-[#0a0e1a] flex flex-col items-center justify-center">
        <p className="text-slate-400">Transaction not found</p>
        <button onClick={() => navigate(-1)} className="text-emerald-400 text-sm mt-4">Go Back</button>
      </div>
    );
  }

  const handleDelete = () => {
    deleteTransaction(tx.id);
    navigate(-1);
  };

  const date = new Date(tx.date);

  return (
    <div className="min-h-screen bg-[#0a0e1a] flex justify-center">

      <div className="w-full max-w-7xl mx-auto px-5 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between px-4 h-14">
          <button onClick={() => navigate(-1)} className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/5">
            <ArrowLeft size={20} className="text-white" />
          </button>
          <div className="flex gap-2">
            <button onClick={() => setShowInfoModal(true)} className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/5">
              <Pencil size={18} className="text-slate-400" />
            </button>
            <button onClick={handleDelete} className="w-10 h-10 flex items-center justify-center rounded-xl bg-red-500/10">
              <Trash2 size={18} className="text-red-400" />
            </button>
          </div>
        </div>

        <div className="pt-4">
          {/* Amount */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center mb-8"
          >
            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-4 ${tx.type === 'income' ? 'bg-emerald-500/15' : tx.type === 'expense' ? 'bg-red-500/15' : 'bg-blue-500/15'
              }`}>
              {tx.type === 'income' && <TrendingUp size={28} className="text-emerald-400" />}
              {tx.type === 'expense' && <TrendingDown size={28} className="text-red-400" />}
              {tx.type === 'transfer' && <ArrowLeftRight size={28} className="text-blue-400" />}
            </div>
            <h1 className={`text-3xl font-bold ${tx.type === 'income' ? 'text-emerald-400' : tx.type === 'expense' ? 'text-red-400' : 'text-blue-400'
              }`}>
              {tx.type === 'income' ? '+' : tx.type === 'expense' ? '-' : ''}${tx.amount.toFixed(2)}
            </h1>
            <p className="text-slate-400 text-sm mt-1">{tx.description}</p>
            <span className={`mt-2 px-3 py-1 rounded-full text-xs font-medium ${tx.status === 'completed' ? 'bg-emerald-500/15 text-emerald-400' :
                tx.status === 'pending' ? 'bg-amber-500/15 text-amber-400' :
                  'bg-red-500/15 text-red-400'
              }`}>
              {tx.status.charAt(0).toUpperCase() + tx.status.slice(1)}
            </span>
          </motion.div>

          {/* Details */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="rounded-2xl bg-white/5 border border-white/5 divide-y divide-white/5"
          >
            <div className="flex items-center gap-4 p-4">
              <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
                <Receipt size={18} className="text-slate-400" />
              </div>
              <div className="flex-1">
                <p className="text-slate-500 text-xs">Category</p>
                <p className="text-white text-sm font-medium">{tx.category}</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4">
              <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
                <Calendar size={18} className="text-slate-400" />
              </div>
              <div className="flex-1">
                <p className="text-slate-500 text-xs">Date & Time</p>
                <p className="text-white text-sm font-medium">
                  {date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
                </p>
                <p className="text-slate-500 text-xs">{date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4">
              <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
                <Building2 size={18} className="text-slate-400" />
              </div>
              <div className="flex-1">
                <p className="text-slate-500 text-xs">Merchant</p>
                <p className="text-white text-sm font-medium">{tx.merchant || 'N/A'}</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4">
              <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
                <Tag size={18} className="text-slate-400" />
              </div>
              <div className="flex-1">
                <p className="text-slate-500 text-xs">Tags</p>
                <div className="flex gap-2 mt-1">
                  {tx.tags.map(tag => (
                    <span key={tag} className="px-2 py-0.5 rounded-full bg-white/10 text-slate-300 text-xs">{tag}</span>
                  ))}
                </div>
              </div>
            </div>
            {tx.note && (
              <div className="flex items-center gap-4 p-4">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
                  <FileText size={18} className="text-slate-400" />
                </div>
                <div className="flex-1">
                  <p className="text-slate-500 text-xs">Note</p>
                  <p className="text-white text-sm">{tx.note}</p>
                </div>
              </div>
            )}
            <div className="flex items-center gap-4 p-4">
              <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
                <ArrowLeftRight size={18} className="text-slate-400" />
              </div>
              <div className="flex-1">
                <p className="text-slate-500 text-xs">Transaction Type</p>
                <p className="text-white text-sm font-medium capitalize">{tx.type}</p>
              </div>
            </div>
          </motion.div>
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
