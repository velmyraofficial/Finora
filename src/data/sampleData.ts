import type {
  User, Transaction, Account, Budget, SavingsGoal, Bill,
  Category, Insight, Notification, FinancialHealth, ChartDataPoint, CategoryBreakdown
} from '@/types';

export const currentUser: User = {
  id: '1',
  name: 'Alex Morgan',
  email: 'alex.morgan@email.com',
  phone: '+1 (555) 123-4567',
  avatar: '',
  currency: 'USD',
  createdAt: '2024-01-15T00:00:00Z',
  hasBiometric: true,
  hasPin: true,
};

export const accounts: Account[] = [
  { id: '1', name: 'Main Checking', type: 'checking', balance: 8450.25, currency: 'USD', institution: 'Chase Bank', accountNumber: '****4521', isConnected: true, color: '#10B981', icon: 'landmark' },
  { id: '2', name: 'High Yield Savings', type: 'savings', balance: 15230.80, currency: 'USD', institution: 'Marcus by Goldman Sachs', accountNumber: '****8892', isConnected: true, color: '#3B82F6', icon: 'piggy-bank' },
  { id: '3', name: 'Credit Card', type: 'credit', balance: 1240.50, currency: 'USD', institution: 'American Express', accountNumber: '****3341', isConnected: true, color: '#EF4444', icon: 'credit-card' },
  { id: '4', name: 'Investment Portfolio', type: 'investment', balance: 28450.00, currency: 'USD', institution: 'Fidelity', accountNumber: '****7712', isConnected: true, color: '#8B5CF6', icon: 'trending-up' },
  { id: '5', name: 'Cash Wallet', type: 'cash', balance: 340.00, currency: 'USD', institution: 'Cash', accountNumber: 'N/A', isConnected: false, color: '#F59E0B', icon: 'banknote' },
];

export const categories: Category[] = [
  { id: '1', name: 'Food & Dining', type: 'expense', icon: 'utensils', color: '#EF4444', budget: 800 },
  { id: '2', name: 'Transportation', type: 'expense', icon: 'car', color: '#F59E0B', budget: 400 },
  { id: '3', name: 'Shopping', type: 'expense', icon: 'shopping-bag', color: '#EC4899', budget: 500 },
  { id: '4', name: 'Entertainment', type: 'expense', icon: 'film', color: '#8B5CF6', budget: 200 },
  { id: '5', name: 'Bills & Utilities', type: 'expense', icon: 'receipt', color: '#3B82F6', budget: 1200 },
  { id: '6', name: 'Healthcare', type: 'expense', icon: 'heart-pulse', color: '#10B981', budget: 300 },
  { id: '7', name: 'Education', type: 'expense', icon: 'graduation-cap', color: '#06B6D4', budget: 200 },
  { id: '8', name: 'Travel', type: 'expense', icon: 'plane', color: '#F97316', budget: 300 },
  { id: '9', name: 'Salary', type: 'income', icon: 'banknote', color: '#10B981' },
  { id: '10', name: 'Freelance', type: 'income', icon: 'laptop', color: '#3B82F6' },
  { id: '11', name: 'Investments', type: 'income', icon: 'trending-up', color: '#8B5CF6' },
  { id: '12', name: 'Gifts', type: 'income', icon: 'gift', color: '#EC4899' },
  { id: '13', name: 'Housing', type: 'expense', icon: 'home', color: '#6366F1', budget: 1800 },
  { id: '14', name: 'Subscriptions', type: 'expense', icon: 'repeat', color: '#14B8A6', budget: 150 },
];

export const transactions: Transaction[] = [
  { id: '1', type: 'expense', amount: 45.67, category: 'Food & Dining', description: 'Lunch at Chipotle', date: '2026-06-06T12:30:00Z', merchant: 'Chipotle', accountId: '1', tags: ['dining'], isRecurring: false, status: 'completed' },
  { id: '2', type: 'expense', amount: 128.50, category: 'Shopping', description: 'Grocery Run', date: '2026-06-05T18:15:00Z', merchant: 'Whole Foods', accountId: '1', tags: ['groceries'], isRecurring: false, status: 'completed' },
  { id: '3', type: 'income', amount: 5200.00, category: 'Salary', description: 'Monthly Salary', date: '2026-06-01T09:00:00Z', merchant: 'TechCorp Inc.', accountId: '1', tags: ['salary'], isRecurring: true, recurringFrequency: 'monthly', status: 'completed' },
  { id: '4', type: 'expense', amount: 35.00, category: 'Transportation', description: 'Uber Ride', date: '2026-06-05T08:30:00Z', merchant: 'Uber', accountId: '1', tags: ['transport'], isRecurring: false, status: 'completed' },
  { id: '5', type: 'expense', amount: 14.99, category: 'Subscriptions', description: 'Netflix Subscription', date: '2026-06-04T00:00:00Z', merchant: 'Netflix', accountId: '3', tags: ['subscription'], isRecurring: true, recurringFrequency: 'monthly', status: 'completed' },
  { id: '6', type: 'expense', amount: 89.99, category: 'Entertainment', description: 'Concert Tickets', date: '2026-06-03T20:00:00Z', merchant: 'Ticketmaster', accountId: '1', tags: ['entertainment'], isRecurring: false, status: 'completed' },
  { id: '7', type: 'expense', amount: 150.00, category: 'Utilities', description: 'Electric Bill', date: '2026-06-02T10:00:00Z', merchant: 'ConEdison', accountId: '1', tags: ['utilities'], isRecurring: true, recurringFrequency: 'monthly', status: 'completed' },
  { id: '8', type: 'expense', amount: 1200.00, category: 'Housing', description: 'Monthly Rent', date: '2026-06-01T00:00:00Z', merchant: 'Property Management', accountId: '1', tags: ['rent'], isRecurring: true, recurringFrequency: 'monthly', status: 'completed' },
  { id: '9', type: 'income', amount: 850.00, category: 'Freelance', description: 'Website Design Project', date: '2026-05-30T14:00:00Z', merchant: 'Client A', accountId: '2', tags: ['freelance'], isRecurring: false, status: 'completed' },
  { id: '10', type: 'expense', amount: 67.43, category: 'Food & Dining', description: 'Dinner Date', date: '2026-05-29T19:30:00Z', merchant: 'Olive Garden', accountId: '3', tags: ['dining'], isRecurring: false, status: 'completed' },
  { id: '11', type: 'expense', amount: 42.00, category: 'Transportation', description: 'Gas Refill', date: '2026-05-28T16:00:00Z', merchant: 'Shell', accountId: '1', tags: ['gas'], isRecurring: false, status: 'completed' },
  { id: '12', type: 'expense', amount: 199.00, category: 'Shopping', description: 'New Sneakers', date: '2026-05-27T13:20:00Z', merchant: 'Nike Store', accountId: '1', tags: ['shopping'], isRecurring: false, status: 'completed' },
  { id: '13', type: 'income', amount: 320.50, category: 'Investments', description: 'Dividend Payment', date: '2026-05-25T00:00:00Z', merchant: 'Fidelity', accountId: '4', tags: ['dividend'], isRecurring: true, recurringFrequency: 'monthly', status: 'completed' },
  { id: '14', type: 'expense', amount: 55.00, category: 'Healthcare', description: 'Pharmacy', date: '2026-05-24T11:00:00Z', merchant: 'CVS Pharmacy', accountId: '1', tags: ['health'], isRecurring: false, status: 'completed' },
  { id: '15', type: 'expense', amount: 12.99, category: 'Subscriptions', description: 'Spotify Premium', date: '2026-05-22T00:00:00Z', merchant: 'Spotify', accountId: '3', tags: ['subscription'], isRecurring: true, recurringFrequency: 'monthly', status: 'completed' },
  { id: '16', type: 'transfer', amount: 500.00, category: 'Transfer', description: 'Savings Transfer', date: '2026-05-20T10:00:00Z', merchant: 'Internal Transfer', accountId: '1', tags: ['savings'], isRecurring: true, recurringFrequency: 'monthly', status: 'completed' },
  { id: '17', type: 'expense', amount: 78.25, category: 'Food & Dining', description: 'Weekly Groceries', date: '2026-05-18T17:00:00Z', merchant: 'Trader Joe\'s', accountId: '1', tags: ['groceries'], isRecurring: false, status: 'completed' },
  { id: '18', type: 'expense', amount: 250.00, category: 'Travel', description: 'Flight Booking', date: '2026-05-15T09:00:00Z', merchant: 'Delta Airlines', accountId: '1', tags: ['travel'], isRecurring: false, status: 'completed' },
  { id: '19', type: 'income', amount: 1200.00, category: 'Freelance', description: 'Mobile App Project', date: '2026-05-12T15:30:00Z', merchant: 'StartupXYZ', accountId: '2', tags: ['freelance'], isRecurring: false, status: 'completed' },
  { id: '20', type: 'expense', amount: 65.00, category: 'Entertainment', description: 'Movie & Games', date: '2026-05-10T14:00:00Z', merchant: 'AMC Theaters', accountId: '1', tags: ['entertainment'], isRecurring: false, status: 'completed' },
  { id: '21', type: 'expense', amount: 1800.00, category: 'Housing', description: 'Monthly Rent', date: '2026-05-01T00:00:00Z', merchant: 'Property Management', accountId: '1', tags: ['rent'], isRecurring: true, recurringFrequency: 'monthly', status: 'completed' },
  { id: '22', type: 'income', amount: 5200.00, category: 'Salary', description: 'Monthly Salary', date: '2026-05-01T09:00:00Z', merchant: 'TechCorp Inc.', accountId: '1', tags: ['salary'], isRecurring: true, recurringFrequency: 'monthly', status: 'completed' },
  { id: '23', type: 'expense', amount: 145.00, category: 'Utilities', description: 'Internet & Cable', date: '2026-05-01T10:00:00Z', merchant: 'Spectrum', accountId: '1', tags: ['utilities'], isRecurring: true, recurringFrequency: 'monthly', status: 'completed' },
  { id: '24', type: 'expense', amount: 32.50, category: 'Food & Dining', description: 'Coffee & Pastry', date: '2026-06-06T08:15:00Z', merchant: 'Starbucks', accountId: '1', tags: ['coffee'], isRecurring: false, status: 'completed' },
  { id: '25', type: 'expense', amount: 299.00, category: 'Shopping', description: 'New Headphones', date: '2026-06-04T14:30:00Z', merchant: 'Best Buy', accountId: '3', tags: ['electronics'], isRecurring: false, status: 'completed' },
];

export const budgets: Budget[] = [
  { id: '1', category: 'Food & Dining', limit: 800, spent: 623.40, period: 'monthly', alertThreshold: 80, isActive: true },
  { id: '2', category: 'Transportation', limit: 400, spent: 245.50, period: 'monthly', alertThreshold: 75, isActive: true },
  { id: '3', category: 'Shopping', limit: 500, spent: 498.99, period: 'monthly', alertThreshold: 90, isActive: true },
  { id: '4', category: 'Entertainment', limit: 200, spent: 154.00, period: 'monthly', alertThreshold: 85, isActive: true },
  { id: '5', category: 'Bills & Utilities', limit: 1200, spent: 1195.00, period: 'monthly', alertThreshold: 95, isActive: true },
  { id: '6', category: 'Housing', limit: 1800, spent: 1800.00, period: 'monthly', alertThreshold: 90, isActive: true },
  { id: '7', category: 'Subscriptions', limit: 150, spent: 150.98, period: 'monthly', alertThreshold: 90, isActive: true },
];

export const savingsGoals: SavingsGoal[] = [
  { id: '1', name: 'Emergency Fund', targetAmount: 10000, currentAmount: 7200, deadline: '2026-12-31', color: '#10B981', icon: 'shield', isCompleted: false },
  { id: '2', name: 'Vacation to Japan', targetAmount: 5000, currentAmount: 3250, deadline: '2027-03-15', color: '#3B82F6', icon: 'plane', isCompleted: false },
  { id: '3', name: 'New Laptop', targetAmount: 2500, currentAmount: 1800, deadline: '2026-08-01', color: '#8B5CF6', icon: 'laptop', isCompleted: false },
  { id: '4', name: 'Car Down Payment', targetAmount: 15000, currentAmount: 8500, deadline: '2027-06-01', color: '#F59E0B', icon: 'car', isCompleted: false },
];

export const bills: Bill[] = [
  { id: '1', name: 'Rent', amount: 1800.00, dueDate: '2026-07-01', category: 'Housing', isRecurring: true, frequency: 'monthly', status: 'upcoming', autopay: true, merchant: 'Property Management' },
  { id: '2', name: 'Electric Bill', amount: 150.00, dueDate: '2026-06-15', category: 'Utilities', isRecurring: true, frequency: 'monthly', status: 'upcoming', autopay: true, merchant: 'ConEdison' },
  { id: '3', name: 'Internet', amount: 89.99, dueDate: '2026-06-20', category: 'Utilities', isRecurring: true, frequency: 'monthly', status: 'upcoming', autopay: false, merchant: 'Spectrum' },
  { id: '4', name: 'Netflix', amount: 15.99, dueDate: '2026-06-10', category: 'Subscriptions', isRecurring: true, frequency: 'monthly', status: 'upcoming', autopay: true, merchant: 'Netflix' },
  { id: '5', name: 'Spotify', amount: 10.99, dueDate: '2026-06-12', category: 'Subscriptions', isRecurring: true, frequency: 'monthly', status: 'upcoming', autopay: true, merchant: 'Spotify' },
  { id: '6', name: 'Car Insurance', amount: 145.00, dueDate: '2026-06-25', category: 'Insurance', isRecurring: true, frequency: 'monthly', status: 'upcoming', autopay: true, merchant: 'Geico' },
  { id: '7', name: 'Phone Bill', amount: 65.00, dueDate: '2026-06-18', category: 'Utilities', isRecurring: true, frequency: 'monthly', status: 'upcoming', autopay: false, merchant: 'T-Mobile' },
  { id: '8', name: 'Gym Membership', amount: 49.99, dueDate: '2026-06-05', category: 'Health', isRecurring: true, frequency: 'monthly', status: 'overdue', autopay: false, merchant: 'Equinox' },
];

export const insights: Insight[] = [
  { id: '1', type: 'spending', title: 'Food spending up 25%', description: 'You spent $623 on food this month, 25% more than last month. Consider cooking at home more often.', severity: 'warning', date: '2026-06-06T10:00:00Z', isRead: false, actionLabel: 'View Details', actionRoute: '/analytics' },
  { id: '2', type: 'saving', title: 'Save $120/month', description: 'You can save $120 monthly by reviewing your subscription services. You have 8 active subscriptions.', severity: 'success', date: '2026-06-05T14:00:00Z', isRead: false, actionLabel: 'Review', actionRoute: '/bills' },
  { id: '3', type: 'goal', title: 'Goal on track!', description: 'Your Emergency Fund goal is 72% complete. You are on track to achieve it by December 2026.', severity: 'success', date: '2026-06-04T09:00:00Z', isRead: true },
  { id: '4', type: 'budget', title: 'Shopping budget almost exceeded', description: 'You have used 99.8% of your shopping budget. Only $1.01 remaining for this month.', severity: 'danger', date: '2026-06-04T16:00:00Z', isRead: false, actionLabel: 'Adjust Budget', actionRoute: '/budget' },
  { id: '5', type: 'bill', title: 'Upcoming bill: Rent', description: 'Your rent payment of $1,800 is due on July 1st. Ensure sufficient funds in your account.', severity: 'info', date: '2026-06-03T08:00:00Z', isRead: true },
  { id: '6', type: 'tip', title: 'Financial Tip', description: 'Consider automating your savings. Setting aside 20% of income can help build wealth faster.', severity: 'info', date: '2026-06-02T11:00:00Z', isRead: true },
];

export const notifications: Notification[] = [
  { id: '1', title: 'Budget Alert', message: 'Shopping budget at 99% - only $1.01 left', type: 'budget', timestamp: '2026-06-06T10:30:00Z', isRead: false },
  { id: '2', title: 'Bill Reminder', message: 'Gym membership payment of $49.99 is overdue', type: 'bill', timestamp: '2026-06-06T09:00:00Z', isRead: false },
  { id: '3', title: 'Goal Progress', message: 'Emergency Fund reached 72% of target!', type: 'goal', timestamp: '2026-06-05T16:00:00Z', isRead: false },
  { id: '4', title: 'Spending Insight', message: 'Food spending increased by 25% this month', type: 'insight', timestamp: '2026-06-05T14:00:00Z', isRead: true },
  { id: '5', title: 'Security', message: 'New login detected from Chrome on Windows', type: 'security', timestamp: '2026-06-04T22:00:00Z', isRead: true },
  { id: '6', title: 'Bill Paid', message: 'Netflix subscription of $15.99 paid successfully', type: 'bill', timestamp: '2026-06-04T00:00:00Z', isRead: true },
];

export const financialHealth: FinancialHealth = {
  score: 78,
  factors: [
    { name: 'Savings Rate', score: 22, maxScore: 25 },
    { name: 'Debt Management', score: 20, maxScore: 25 },
    { name: 'Spending Control', score: 18, maxScore: 25 },
    { name: 'Budget Adherence', score: 18, maxScore: 25 },
  ],
  lastUpdated: '2026-06-06T00:00:00Z',
};

export const monthlyChartData: ChartDataPoint[] = [
  { label: 'Jan', income: 4800, expense: 3200, balance: 1600 },
  { label: 'Feb', income: 5200, expense: 3400, balance: 1800 },
  { label: 'Mar', income: 4950, expense: 4100, balance: 850 },
  { label: 'Apr', income: 5500, expense: 3600, balance: 1900 },
  { label: 'May', income: 6370, expense: 3890, balance: 2480 },
  { label: 'Jun', income: 5200, expense: 2456, balance: 2744 },
];

export const weeklyChartData: ChartDataPoint[] = [
  { label: 'Mon', income: 0, expense: 45.67, balance: -45.67 },
  { label: 'Tue', income: 0, expense: 128.50, balance: -128.50 },
  { label: 'Wed', income: 0, expense: 14.99, balance: -14.99 },
  { label: 'Thu', income: 0, expense: 89.99, balance: -89.99 },
  { label: 'Fri', income: 0, expense: 35.00, balance: -35.00 },
  { label: 'Sat', income: 0, expense: 150.00, balance: -150.00 },
  { label: 'Sun', income: 5200, expense: 1200, balance: 4000 },
];

export const categoryBreakdown: CategoryBreakdown[] = [
  { category: 'Housing', amount: 1800, percentage: 28.5, color: '#6366F1' },
  { category: 'Food & Dining', amount: 623.40, percentage: 19.8, color: '#EF4444' },
  { category: 'Shopping', amount: 498.99, percentage: 15.8, color: '#EC4899' },
  { category: 'Utilities', amount: 389.99, percentage: 12.3, color: '#3B82F6' },
  { category: 'Transportation', amount: 245.50, percentage: 7.8, color: '#F59E0B' },
  { category: 'Entertainment', amount: 154.00, percentage: 4.9, color: '#8B5CF6' },
  { category: 'Subscriptions', amount: 127.98, percentage: 4.1, color: '#14B8A6' },
  { category: 'Healthcare', amount: 55.00, percentage: 1.7, color: '#10B981' },
  { category: 'Other', amount: 163.14, percentage: 5.1, color: '#6B7280' },
];

export const dailyChartData: ChartDataPoint[] = [
  { label: '6AM', balance: 8450 },
  { label: '9AM', balance: 8417 },
  { label: '12PM', balance: 8367 },
  { label: '3PM', balance: 8367 },
  { label: '6PM', balance: 8367 },
  { label: '9PM', balance: 8367 },
];
