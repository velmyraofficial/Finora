import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import type { User, Transaction, Account, Budget, SavingsGoal, Bill, Insight, Notification, TimeRange } from '@/types';
import * as sampleData from '@/data/sampleData';

interface AppState {
  user: User | null;
  isAuthenticated: boolean;
  transactions: Transaction[];
  accounts: Account[];
  budgets: Budget[];
  savingsGoals: SavingsGoal[];
  bills: Bill[];
  insights: Insight[];
  notifications: Notification[];
  selectedTimeRange: TimeRange;
  unreadNotifications: number;
}

interface AppContextType extends AppState {
  login: (user: User) => void;
  logout: () => void;
  addTransaction: (tx: Transaction) => void;
  deleteTransaction: (id: string) => void;
  updateTransaction: (tx: Transaction) => void;
  addAccount: (account: Account) => void;
  updateBudget: (budget: Budget) => void;
  addSavingsGoal: (goal: SavingsGoal) => void;
  updateSavingsGoal: (goal: SavingsGoal) => void;
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  setTimeRange: (range: TimeRange) => void;
  markInsightRead: (id: string) => void;
  updateUser: (user: Partial<User>) => void;
}

const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AppState>({
    user: null,
    isAuthenticated: false,
    transactions: sampleData.transactions,
    accounts: sampleData.accounts,
    budgets: sampleData.budgets,
    savingsGoals: sampleData.savingsGoals,
    bills: sampleData.bills,
    insights: sampleData.insights,
    notifications: sampleData.notifications,
    selectedTimeRange: 'monthly',
    unreadNotifications: sampleData.notifications.filter(n => !n.isRead).length,
  });

  const login = useCallback((user: User) => {
    setState(prev => ({ ...prev, user, isAuthenticated: true }));
  }, []);

  const logout = useCallback(() => {
    setState(prev => ({ ...prev, user: null, isAuthenticated: false }));
  }, []);

  const addTransaction = useCallback((tx: Transaction) => {
    setState(prev => ({
      ...prev,
      transactions: [tx, ...prev.transactions],
    }));
  }, []);

  const deleteTransaction = useCallback((id: string) => {
    setState(prev => ({
      ...prev,
      transactions: prev.transactions.filter(t => t.id !== id),
    }));
  }, []);

  const updateTransaction = useCallback((tx: Transaction) => {
    setState(prev => ({
      ...prev,
      transactions: prev.transactions.map(t => t.id === tx.id ? tx : t),
    }));
  }, []);

  const addAccount = useCallback((account: Account) => {
    setState(prev => ({
      ...prev,
      accounts: [...prev.accounts, account],
    }));
  }, []);

  const updateBudget = useCallback((budget: Budget) => {
    setState(prev => ({
      ...prev,
      budgets: prev.budgets.map(b => b.id === budget.id ? budget : b),
    }));
  }, []);

  const addSavingsGoal = useCallback((goal: SavingsGoal) => {
    setState(prev => ({
      ...prev,
      savingsGoals: [...prev.savingsGoals, goal],
    }));
  }, []);

  const updateSavingsGoal = useCallback((goal: SavingsGoal) => {
    setState(prev => ({
      ...prev,
      savingsGoals: prev.savingsGoals.map(g => g.id === goal.id ? goal : g),
    }));
  }, []);

  const markNotificationRead = useCallback((id: string) => {
    setState(prev => {
      const updated = prev.notifications.map(n =>
        n.id === id ? { ...n, isRead: true } : n
      );
      return {
        ...prev,
        notifications: updated,
        unreadNotifications: updated.filter(n => !n.isRead).length,
      };
    });
  }, []);

  const markAllNotificationsRead = useCallback(() => {
    setState(prev => ({
      ...prev,
      notifications: prev.notifications.map(n => ({ ...n, isRead: true })),
      unreadNotifications: 0,
    }));
  }, []);

  const setTimeRange = useCallback((range: TimeRange) => {
    setState(prev => ({ ...prev, selectedTimeRange: range }));
  }, []);

  const markInsightRead = useCallback((id: string) => {
    setState(prev => ({
      ...prev,
      insights: prev.insights.map(i => i.id === id ? { ...i, isRead: true } : i),
    }));
  }, []);

  const updateUser = useCallback((userData: Partial<User>) => {
    setState(prev => ({
      ...prev,
      user: prev.user ? { ...prev.user, ...userData } : null,
    }));
  }, []);

  return (
    <AppContext.Provider
      value={{
        ...state,
        login,
        logout,
        addTransaction,
        deleteTransaction,
        updateTransaction,
        addAccount,
        updateBudget,
        addSavingsGoal,
        updateSavingsGoal,
        markNotificationRead,
        markAllNotificationsRead,
        setTimeRange,
        markInsightRead,
        updateUser,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
}