import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, SlidersHorizontal, Plus, ArrowLeftRight, TrendingUp, TrendingDown, X } from 'lucide-react';
import { useApp } from '@/hooks/useAppContext';
import { categories } from '@/data/sampleData';

type FilterType = 'all' | 'income' | 'expense' | 'transfer';

export default function Transactions() {
  const navigate = useNavigate();
  const { transactions } = useApp();
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<FilterType>('all');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'highest' | 'lowest'>('newest');

  const filteredTransactions = useMemo(() => {
    let result = [...transactions];
    if (search) {
      const q = search.toLowerCase();
      result = result.filter(t =>
        t.description.toLowerCase().includes(q) ||
        t.category.toLowerCase().includes(q) ||
        t.merchant?.toLowerCase().includes(q)
      );
    }
    if (filter !== 'all') result = result.filter(t => t.type === filter);
    if (selectedCategory !== 'all') result = result.filter(t => t.category === selectedCategory);
    result.sort((a, b) => {
      if (sortBy === 'newest') return new Date(b.date).getTime() - new Date(a.date).getTime();
      if (sortBy === 'oldest') return new Date(a.date).getTime() - new Date(b.date).getTime();
      if (sortBy === 'highest') return b.amount - a.amount;
      return a.amount - b.amount;
    });
    return result;
  }, [transactions, search, filter, selectedCategory, sortBy]);

  const grouped = useMemo(() => {
    const groups: Record<string, typeof transactions> = {};
    filteredTransactions.forEach(tx => {
      const date = new Date(tx.date);
      const key = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
      if (!groups[key]) groups[key] = [];
      groups[key].push(tx);
    });
    return groups;
  }, [filteredTransactions]);

  const expenseCategories = categories.filter(c => c.type === 'expense');

  return (
    <div className="min-h-screen bg-[#0a0e1a] flex justify-center">

      {/* <div className="w-full max-w-7xl px-5"> */}
      <div className="w-full max-w-7xl mx-auto px-5 lg:px-8">
        {/* Header */}
        <div className="sticky top-0 z-40 bg-[#0a0e1a]/95 backdrop-blur-xl border-b border-white/5 px-5 pt-4 pb-3">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-xl font-bold text-white">Transactions</h1>
            <button
              onClick={() => navigate('/add-transaction')}
              className="w-9 h-9 rounded-xl bg-emerald-500/15 flex items-center justify-center"
            >
              <Plus size={18} className="text-emerald-400" />
            </button>
          </div>

          {/* Search */}
          <div className="flex gap-2">
            <div className="flex-1 relative">
              <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                type="text"
                placeholder="Search transactions..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full h-11 pl-10 pr-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-emerald-500/50"
              />
              {search && (
                <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2">
                  <X size={14} className="text-slate-500" />
                </button>
              )}
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`w-11 h-11 rounded-xl flex items-center justify-center border transition-colors ${showFilters ? 'bg-emerald-500/15 border-emerald-500/30' : 'bg-white/5 border-white/10'
                }`}
            >
              <SlidersHorizontal size={18} className={showFilters ? 'text-emerald-400' : 'text-slate-400'} />
            </button>
          </div>

          {/* Type Filter Pills */}
          <div className="flex gap-2 mt-3 overflow-x-auto scrollbar-hide">
            {(['all', 'income', 'expense', 'transfer'] as FilterType[]).map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${filter === f ? 'bg-emerald-500 text-white' : 'bg-white/5 text-slate-400 border border-white/10'
                  }`}
              >
                {f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>

          {/* Advanced Filters */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="pt-3 pb-1">
                  <p className="text-slate-400 text-xs mb-2">Category</p>
                  <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2">
                    <button
                      onClick={() => setSelectedCategory('all')}
                      className={`px-3 py-1.5 rounded-full text-xs whitespace-nowrap ${selectedCategory === 'all' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-white/5 text-slate-400 border border-white/10'}`}
                    >
                      All
                    </button>
                    {expenseCategories.map(c => (
                      <button
                        key={c.id}
                        onClick={() => setSelectedCategory(c.name)}
                        className={`px-3 py-1.5 rounded-full text-xs whitespace-nowrap ${selectedCategory === c.name ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-white/5 text-slate-400 border border-white/10'}`}
                      >
                        {c.name}
                      </button>
                    ))}
                  </div>
                  <p className="text-slate-400 text-xs mb-2 mt-2">Sort By</p>
                  <div className="flex gap-2">
                    {(['newest', 'oldest', 'highest', 'lowest'] as const).map(s => (
                      <button
                        key={s}
                        onClick={() => setSortBy(s)}
                        className={`px-3 py-1.5 rounded-full text-xs capitalize ${sortBy === s ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-white/5 text-slate-400 border border-white/10'}`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Transaction List */}

        {/* <div className="px-5 py-4 space-y-6"> */}
        
        <div className="space-y-6 lg:space-y-8 pb-8">
          {Object.entries(grouped).length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mb-4">
                <Search size={24} className="text-slate-500" />
              </div>
              <p className="text-slate-400 text-sm">No transactions found</p>
              <p className="text-slate-600 text-xs mt-1">Try adjusting your filters</p>
            </div>
          ) : (
            Object.entries(grouped).map(([date, txs]) => (
              <div key={date}>
                <p className="text-slate-500 text-xs font-medium mb-2 uppercase tracking-wider">{date}</p>
                <div className="space-y-2">
                  {txs.map((tx, i) => (
                    <motion.button
                      key={tx.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.03 }}
                      onClick={() => navigate(`/transaction/${tx.id}`)}
                      className="w-full flex items-center gap-3 p-3.5 rounded-2xl bg-white/5 border border-white/5 text-left active:bg-white/10 transition-colors"
                    >
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${tx.type === 'income' ? 'bg-emerald-500/15' : tx.type === 'expense' ? 'bg-red-500/15' : 'bg-blue-500/15'
                        }`}>
                        {tx.type === 'income' && <TrendingUp size={18} className="text-emerald-400" />}
                        {tx.type === 'expense' && <TrendingDown size={18} className="text-red-400" />}
                        {tx.type === 'transfer' && <ArrowLeftRight size={18} className="text-blue-400" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-white text-sm font-medium truncate">{tx.description}</p>
                        <p className="text-slate-500 text-xs">{tx.category} {tx.merchant && `· ${tx.merchant}`}</p>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <p className={`text-sm font-semibold ${tx.type === 'income' ? 'text-emerald-400' : tx.type === 'expense' ? 'text-red-400' : 'text-blue-400'
                          }`}>
                          {tx.type === 'income' ? '+' : tx.type === 'expense' ? '-' : ''}${tx.amount.toFixed(2)}
                        </p>
                        <p className="text-slate-600 text-[10px]">{tx.status}</p>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>

        <div className="h-4" />
      </div>
    </div>
  );
}
