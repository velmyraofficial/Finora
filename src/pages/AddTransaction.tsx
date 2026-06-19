import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, TrendingUp, TrendingDown, ArrowLeftRight, DollarSign, Calendar, Tag, FileText, Building2 } from 'lucide-react';
import { useApp } from '@/hooks/useAppContext';
import { categories } from '@/data/sampleData';
import type { Transaction } from '@/types';

export default function AddTransaction() {
  const navigate = useNavigate();
  const location = useLocation();
  const { addTransaction, accounts } = useApp();
  const initialType = location.state?.type || 'expense';
  const [fromAccount, setFromAccount] = useState('');
  const [toAccount, setToAccount] = useState('');

  const [type, setType] = useState<'income' | 'expense' | 'transfer'>(initialType);
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [merchant, setMerchant] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [note, setNote] = useState('');
  const [tagInput, setTagInput] = useState('');
  const [tags, setTags] = useState<string[]>([]);

  const filteredCategories = categories.filter(c => c.type === type);

  const handleAddTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput('');
    }
  };

  const handleSubmit = () => {
    if (
      type === 'transfer' &&
      fromAccount === toAccount
    ) {
      alert('Please select different accounts');
      return;
    }

    if (!amount || !description || !category) return;
    const tx: Transaction = {
      id: Date.now().toString(),
      type,
      amount: parseFloat(amount),
      category,
      description,
      date: new Date(date).toISOString(),
      merchant: merchant || undefined,
      accountId: '1',
      tags,
      isRecurring: false,
      note: note || undefined,
      status: 'completed',
    };
    addTransaction(tx);
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-[#0a0e1a] flex justify-center">

      <div className="w-full max-w-7xl mx-auto px-5 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between px-4 h-14">
          <button onClick={() => navigate(-1)} className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/5">
            <ArrowLeft size={20} className="text-white" />
          </button>
          <h1 className="text-white font-semibold">Add Transaction</h1>
          <div className="w-10" />
        </div>

        <div className="pt-2 pb-8 space-y-5">
          {/* Type Selector */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex gap-2">
            {([
              { key: 'income' as const, label: 'Income', icon: TrendingUp, color: 'bg-emerald-500' },
              { key: 'expense' as const, label: 'Expense', icon: TrendingDown, color: 'bg-red-500' },
              { key: 'transfer' as const, label: 'Transfer', icon: ArrowLeftRight, color: 'bg-blue-500' },
            ]).map(t => (
              <button
                key={t.key}
                onClick={() => { setType(t.key); setCategory(''); }}
                className={`flex-1 h-12 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors ${type === t.key ? `${t.color} text-white` : 'bg-white/5 text-slate-400 border border-white/10'
                  }`}
              >
                <t.icon size={14} />
                {t.label}
              </button>
            ))}
          </motion.div>

          {/* Amount */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}>
            <label className="text-slate-400 text-xs mb-2 block ml-1">Amount</label>
            <div className="relative">
              <DollarSign size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                type="number"
                placeholder="0.00"
                value={amount}
                onChange={e => setAmount(e.target.value)}
                className="w-full h-14 pl-12 pr-4 rounded-2xl bg-white/5 border border-white/10 text-white text-xl font-bold placeholder-slate-600 focus:outline-none focus:border-emerald-500/50 focus:bg-white/[0.07] transition-all"
              />
            </div>
          </motion.div>

          {/* Description */}
          {type !== 'transfer' && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
              <label className="text-slate-400 text-xs mb-2 block ml-1">Description</label>
              <input
                type="text"
                placeholder="What was this for?"
                value={description}
                onChange={e => setDescription(e.target.value)}
                className="w-full h-14 px-4 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-emerald-500/50 focus:bg-white/[0.07] transition-all"
              />
            </motion.div>
          )}

          {/* Category */}
          {type !== 'transfer' && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
              <label className="text-slate-400 text-xs mb-2 block ml-1">Category</label>
              <div className="flex flex-wrap gap-2">
                {filteredCategories.map(c => (
                  <button
                    key={c.id}
                    onClick={() => setCategory(c.name)}
                    className={`px-3 py-2 rounded-xl text-xs font-medium transition-colors ${category === c.name ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-white/5 text-slate-400 border border-white/10'
                      }`}
                  >
                    {c.name}
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Merchant */}
          {type !== 'transfer' && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
              <label className="text-slate-400 text-xs mb-2 block ml-1">Merchant (optional)</label>
              <div className="relative">
                <Building2 size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  type="text"
                  placeholder="Merchant name"
                  value={merchant}
                  onChange={e => setMerchant(e.target.value)}
                  className="w-full h-14 pl-12 pr-4 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-emerald-500/50 focus:bg-white/[0.07] transition-all"
                />
              </div>
            </motion.div>
          )}

          {type === 'transfer' && (
            <>
              {/* From Account */}
              <div>
                <label className="text-slate-400 text-xs mb-2 block ml-1">
                  From Account
                </label>

                <select
                  value={fromAccount}
                  onChange={(e) => setFromAccount(e.target.value)}
                  className="w-full h-14 px-4 rounded-2xl bg-white/5 border border-white/10 text-white"
                >
                  <option value="">Select account</option>

                  {accounts.map((account) => (
                    <option
                      key={account.id}
                      value={account.id}
                    >
                      {account.name} • $
                      {account.balance.toLocaleString()}
                    </option>
                  ))}
                </select>
              </div>

              {/* To Account */}
              <div>
                <label className="text-slate-400 text-xs mb-2 block ml-1">
                  To Account
                </label>

                <select
                  value={toAccount}
                  onChange={(e) => setToAccount(e.target.value)}
                  className="w-full h-14 px-4 rounded-2xl bg-white/5 border border-white/10 text-white"
                >
                  <option value="">Select account</option>

                  {accounts.map((account) => (
                    <option
                      key={account.id}
                      value={account.id}
                    >
                      {account.name} • $
                      {account.balance.toLocaleString()}
                    </option>
                  ))}
                </select>
              </div>
            </>
          )}

          {/* Date */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
            <label className="text-slate-400 text-xs mb-2 block ml-1">Date</label>
            <div className="relative">
              <Calendar size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                type="date"
                value={date}
                onChange={e => setDate(e.target.value)}
                className="w-full h-14 pl-12 pr-4 rounded-2xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-emerald-500/50 focus:bg-white/[0.07] transition-all"
              />
            </div>
          </motion.div>

          {/* Tags */}
          {type !== 'transfer' && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
              <label className="text-slate-400 text-xs mb-2 block ml-1">Tags</label>
              <div className="flex gap-2 mb-2 flex-wrap">
                {tags.map(tag => (
                  <span key={tag} className="px-2 py-1 rounded-lg bg-emerald-500/15 text-emerald-400 text-xs flex items-center gap-1">
                    {tag}
                    <button onClick={() => setTags(tags.filter(t => t !== tag))} className="text-emerald-400/60">×</button>
                  </span>
                ))}
              </div>
              <div className="relative">
                <Tag size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  type="text"
                  placeholder="Add a tag and press Enter"
                  value={tagInput}
                  onChange={e => setTagInput(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
                  className="w-full h-12 pl-12 pr-4 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-emerald-500/50"
                />
              </div>
            </motion.div>
          )}

          {/* Note */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}>
            <label className="text-slate-400 text-xs mb-2 block ml-1">Note (optional)</label>
            <div className="relative">
              <FileText size={18} className="absolute left-4 top-4 text-slate-500" />
              <textarea
                placeholder="Add a note..."
                value={note}
                onChange={e => setNote(e.target.value)}
                rows={3}
                className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-emerald-500/50 focus:bg-white/[0.07] transition-all resize-none"
              />
            </div>
          </motion.div>

          {/* Submit */}
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            onClick={handleSubmit}
            disabled={
              type === 'transfer'
                ? !amount ||
                !fromAccount ||
                !toAccount
                : !amount ||
                !description ||
                !category
            }
            className="w-full h-14 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold shadow-lg shadow-emerald-500/25 active:scale-[0.98] transition-transform disabled:opacity-40"
          >
            Add Transaction
          </motion.button>
        </div>
      </div>
    </div>
  );
}
