import {
  Landmark, PiggyBank, CreditCard, TrendingUp, Banknote,
  Utensils, Car, ShoppingBag, Film, Receipt, HeartPulse,
  GraduationCap, Plane, Gift, Home, Repeat, Shield, Laptop,
  type LucideIcon,
} from 'lucide-react';

const iconMap: Record<string, LucideIcon> = {
  landmark: Landmark,
  'piggy-bank': PiggyBank,
  'credit-card': CreditCard,
  'trending-up': TrendingUp,
  banknote: Banknote,
  utensils: Utensils,
  car: Car,
  'shopping-bag': ShoppingBag,
  film: Film,
  receipt: Receipt,
  'heart-pulse': HeartPulse,
  'graduation-cap': GraduationCap,
  plane: Plane,
  gift: Gift,
  home: Home,
  repeat: Repeat,
  shield: Shield,
  laptop: Laptop,
};

export function getIcon(name: string): LucideIcon {
  return iconMap[name] || Banknote;
}
