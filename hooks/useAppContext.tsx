import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { User, Badge, BadgeType } from '../types';
import { BADGE_INFO, BADGE_THRESHOLDS } from '../constants';

interface AppContextType {
  user: User | null;
  mainBalance: number;
  savingsBalance: number;
  targetAmount: number | null;
  badges: Badge[];
  notification: string | null;
  login: (user: User) => void;
  logout: () => void;
  setTarget: (amount: number) => void;
  makePayment: (amount: number) => string;
  withdrawSavings: (amount: number) => boolean;
  dismissNotification: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const AppProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem('savepay-user');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  
  const [mainBalance, setMainBalance] = useState<number>(() => {
      const savedBalance = localStorage.getItem('savepay-mainBalance');
      return savedBalance ? parseFloat(savedBalance) : 5000;
  });

  const [savingsBalance, setSavingsBalance] = useState<number>(() => {
      const savedSavings = localStorage.getItem('savepay-savingsBalance');
      return savedSavings ? parseFloat(savedSavings) : 0;
  });
  
  const [targetAmount, setTargetAmount] = useState<number | null>(() => {
      const savedTarget = localStorage.getItem('savepay-targetAmount');
      return savedTarget ? parseFloat(savedTarget) : null;
  });

  const [badges, setBadges] = useState<Badge[]>([]);
  const [notification, setNotification] = useState<string | null>(null);


  useEffect(() => {
    if (user) {
      localStorage.setItem('savepay-user', JSON.stringify(user));
      localStorage.setItem('savepay-mainBalance', mainBalance.toString());
      localStorage.setItem('savepay-savingsBalance', savingsBalance.toString());
      if (targetAmount !== null) {
        localStorage.setItem('savepay-targetAmount', targetAmount.toString());
      } else {
        localStorage.removeItem('savepay-targetAmount');
      }
    } else {
      localStorage.removeItem('savepay-user');
      localStorage.removeItem('savepay-mainBalance');
      localStorage.removeItem('savepay-savingsBalance');
      localStorage.removeItem('savepay-targetAmount');
    }
  }, [user, mainBalance, savingsBalance, targetAmount]);
  
  useEffect(() => {
    // Handle badge updates and notifications using a functional update for setBadges
    setBadges(prevBadges => {
        const newBadges: Badge[] = [];
        if(savingsBalance >= BADGE_THRESHOLDS.BRONZE) newBadges.push({type: BadgeType.BRONZE, count: 1});
        if(savingsBalance >= BADGE_THRESHOLDS.SILVER) newBadges.push({type: BadgeType.SILVER, count: 1});
        if(savingsBalance >= BADGE_THRESHOLDS.GOLD) newBadges.push({type: BadgeType.GOLD, count: 1});
        
        if (newBadges.length > prevBadges.length) {
            const newBadge = newBadges[prevBadges.length];
            setNotification(`Congratulations! You've earned the ${BADGE_INFO[newBadge.type].name} badge!`);
        }
        return newBadges;
    });

    // Handle target reached notification
    if (targetAmount !== null && savingsBalance >= targetAmount) {
        setNotification(`Goal Reached! You've successfully saved ₹${targetAmount}. Set a new goal to continue your journey!`);
        setTargetAmount(null);
    }
  }, [savingsBalance, targetAmount]);

  const login = (userData: User) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };

  const setTarget = (amount: number) => {
    if (amount > 0) {
      setTargetAmount(amount);
    }
  };

  const makePayment = (amount: number): string => {
    if (amount <= 0) return "Invalid amount.";
    const roundedAmount = Math.ceil(amount / 10) * 10;
    if (roundedAmount > mainBalance) return "Insufficient funds for rounded-up payment.";
    
    const savedAmount = roundedAmount - amount;

    setMainBalance(prev => prev - roundedAmount);
    setSavingsBalance(prev => prev + savedAmount);

    return `Payment of ₹${roundedAmount.toFixed(2)} successful.`;
  };

  const withdrawSavings = (amount: number): boolean => {
    if (amount > 0 && amount <= savingsBalance) {
      setSavingsBalance(prev => prev - amount);
      setMainBalance(prev => prev + amount);
      return true;
    }
    return false;
  };

  const dismissNotification = () => setNotification(null);
  
  const value = { user, mainBalance, savingsBalance, targetAmount, badges, login, logout, setTarget, makePayment, withdrawSavings, notification, dismissNotification };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};

export { AppProvider, useAppContext };