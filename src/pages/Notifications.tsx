import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Bell, Receipt, Target, TrendingUp, Shield } from 'lucide-react';
import { useApp } from '@/hooks/useAppContext';

const iconMap: Record<string, { icon: typeof Bell; color: string; bg: string }> = {
  budget: { icon: TrendingUp, color: 'text-amber-400', bg: 'bg-amber-500/15' },
  bill: { icon: Receipt, color: 'text-blue-400', bg: 'bg-blue-500/15' },
  goal: { icon: Target, color: 'text-emerald-400', bg: 'bg-emerald-500/15' },
  insight: { icon: TrendingUp, color: 'text-purple-400', bg: 'bg-purple-500/15' },
  security: { icon: Shield, color: 'text-red-400', bg: 'bg-red-500/15' },
  system: { icon: Bell, color: 'text-slate-400', bg: 'bg-white/10' },
};

export default function Notifications() {
  const navigate = useNavigate();
  const { notifications, markNotificationRead, markAllNotificationsRead } = useApp();

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <div className="min-h-screen bg-[#0a0e1a] flex justify-center">
      <div className="w-full max-w-7xl mx-auto px-5 lg:px-8">
        {/* Header */}
        <div className="sticky top-0 z-40 bg-[#0a0e1a]/95 backdrop-blur-xl border-b border-white/5 px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={() => navigate(-1)} className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/5">
              <ArrowLeft size={20} className="text-white" />
            </button>
            <h1 className="text-white font-semibold">Notifications</h1>
            {unreadCount > 0 && (
              <span className="px-2 py-0.5 rounded-full bg-red-500/20 text-red-400 text-[10px] font-bold">{unreadCount}</span>
            )}
          </div>
          {unreadCount > 0 && (
            <button onClick={markAllNotificationsRead} className="text-emerald-400 text-xs font-medium">
              Mark all read
            </button>
          )}
        </div>

        <div className="py-4 space-y-2 ">
          {notifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mb-4">
                <Bell size={24} className="text-slate-500" />
              </div>
              <p className="text-slate-400 text-sm">No notifications yet</p>
            </div>
          ) : (
            notifications.map((notif, i) => {
              const config = iconMap[notif.type] || iconMap.system;
              const Icon = config.icon;
              return (
                <motion.button
                  key={notif.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => markNotificationRead(notif.id)}
                  className={`w-full flex items-start gap-3 p-4 rounded-2xl text-left transition-colors ${notif.isRead ? 'bg-white/[0.02] border border-white/5' : 'bg-white/5 border border-white/10'
                    }`}
                >
                  <div className={`w-10 h-10 rounded-xl ${config.bg} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                    <Icon size={18} className={config.color} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-white text-sm font-medium">{notif.title}</p>
                      {!notif.isRead && <div className="w-2 h-2 rounded-full bg-emerald-400 flex-shrink-0" />}
                    </div>
                    <p className="text-slate-400 text-xs mt-0.5 leading-relaxed">{notif.message}</p>
                    <p className="text-slate-600 text-[10px] mt-1">
                      {new Date(notif.timestamp).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </motion.button>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
