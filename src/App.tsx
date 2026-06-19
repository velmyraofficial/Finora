import { Routes, Route } from 'react-router-dom';
import { AppProvider } from '@/hooks/useAppContext';
import Layout from '@/components/Layout';
import Welcome from '@/pages/Welcome';
import Login from '@/pages/Login';
import Signup from '@/pages/Signup';
import OTP from '@/pages/OTP';
import ProfileSetup from '@/pages/ProfileSetup';
import ForgotPassword from '@/pages/ForgotPassword';
import Home from '@/pages/Home';
import Transactions from '@/pages/Transactions';
import Analytics from '@/pages/Analytics';
import Budget from '@/pages/Budget';
import Profile from '@/pages/Profile';
import TransactionDetail from '@/pages/TransactionDetail';
import AddTransaction from '@/pages/AddTransaction';
import Notifications from '@/pages/Notifications';
import Accounts from '@/pages/Accounts';
import Bills from '@/pages/Bills';
import Settings from '@/pages/Settings';
import SavingsGoals from '@/pages/SavingsGoals';
import Insights from '@/pages/Insights';
import Security from './pages/Security';

export default function App() {
  return (
    <AppProvider>
      <Layout>
        <Routes>
          <Route path="/welcome" element={<Welcome />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/otp" element={<OTP />} />
          <Route path="/profile-setup" element={<ProfileSetup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/home" element={<Home />} />
          <Route path="/" element={<Welcome />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/budget" element={<Budget />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/transaction/:id" element={<TransactionDetail />} />
          <Route path="/add-transaction" element={<AddTransaction />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/accounts" element={<Accounts />} />
          <Route path="/bills" element={<Bills />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/savings-goals" element={<SavingsGoals />} />
          <Route path="/insights" element={<Insights />} />
          <Route path="/security" element={<Security />} />
        </Routes>
      </Layout>
    </AppProvider>
  );
}
