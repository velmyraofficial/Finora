export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
  currency: string;
  createdAt: string;
  hasBiometric: boolean;
  hasPin: boolean;
}

export interface Transaction {
  id: string;
  type: 'income' | 'expense' | 'transfer';
  amount: number;
  category: string;
  subcategory?: string;
  description: string;
  date: string;
  merchant?: string;
  accountId: string;
  tags: string[];
  isRecurring: boolean;
  recurringFrequency?: 'daily' | 'weekly' | 'monthly' | 'yearly';
  note?: string;
  receiptUrl?: string;
  status: 'completed' | 'pending' | 'failed';
}

export interface Account {
  id: string;
  name: string;
  type: 'checking' | 'savings' | 'credit' | 'investment' | 'cash';
  balance: number;
  currency: string;
  institution: string;
  accountNumber: string;
  isConnected: boolean;
  color: string;
  icon: string;
}

export interface Budget {
  id: string;
  category: string;
  limit: number;
  spent: number;
  period: 'monthly' | 'weekly' | 'yearly';
  alertThreshold: number;
  isActive: boolean;
}

export interface SavingsGoal {
  id: string;
  name: string;
  targetAmount: number;
  currentAmount: number;
  deadline: string;
  color: string;
  icon: string;
  isCompleted: boolean;
  completedAt?: string;
}

export interface Bill {
  id: string;
  name: string;
  amount: number;
  dueDate: string;
  category: string;
  isRecurring: boolean;
  frequency: 'monthly' | 'weekly' | 'yearly' | 'one-time';
  status: 'upcoming' | 'overdue' | 'paid';
  autopay: boolean;
  merchant: string;
}

export interface Category {
  id: string;
  name: string;
  type: 'income' | 'expense';
  icon: string;
  color: string;
  budget?: number;
}

export interface Insight {
  id: string;
  type: 'spending' | 'saving' | 'budget' | 'goal' | 'bill' | 'tip';
  title: string;
  description: string;
  severity: 'info' | 'warning' | 'success' | 'danger';
  date: string;
  isRead: boolean;
  actionLabel?: string;
  actionRoute?: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'budget' | 'bill' | 'goal' | 'insight' | 'security' | 'system';
  timestamp: string;
  isRead: boolean;
}

export interface FinancialHealth {
  score: number;
  factors: {
    name: string;
    score: number;
    maxScore: number;
  }[];
  lastUpdated: string;
}

export type TimeRange = 'daily' | 'weekly' | 'monthly' | 'yearly';

export interface ChartDataPoint {
  label: string;
  income?: number;
  expense?: number;
  balance?: number;
}

export interface CategoryBreakdown {
  category: string;
  amount: number;
  percentage: number;
  color: string;
}
