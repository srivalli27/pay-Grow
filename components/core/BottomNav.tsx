
import React from 'react';
import { Page } from '../../types';
import { HomeIcon, PaymentIcon, WalletIcon } from '../../constants';

interface BottomNavProps {
  activePage: Page;
  setActivePage: (page: Page) => void;
}

const NavItem = ({ icon, label, isActive, onClick }: { icon: JSX.Element, label: string, isActive: boolean, onClick: () => void }) => {
  const activeClass = isActive ? 'text-green-600' : 'text-gray-500';
  return (
    <button onClick={onClick} className={`flex flex-col items-center justify-center w-full pt-2 pb-1 transition-colors duration-200 hover:text-green-500 ${activeClass}`}>
      {React.cloneElement(icon, { className: 'w-7 h-7 mb-1' })}
      <span className="text-xs font-medium">{label}</span>
    </button>
  );
};

const BottomNav = ({ activePage, setActivePage }: BottomNavProps) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 h-16 bg-white border-t border-gray-200 shadow-[0_-2px_10px_rgba(0,0,0,0.05)]">
      <div className="flex justify-around h-full">
        <NavItem 
          icon={<HomeIcon />} 
          label="Home" 
          isActive={activePage === Page.HOME}
          onClick={() => setActivePage(Page.HOME)} 
        />
        <NavItem 
          icon={<PaymentIcon />} 
          label="Payment" 
          isActive={activePage === Page.PAYMENT}
          onClick={() => setActivePage(Page.PAYMENT)} 
        />
        <NavItem 
          icon={<WalletIcon />} 
          label="Wallet" 
          isActive={activePage === Page.WALLET}
          onClick={() => setActivePage(Page.WALLET)} 
        />
      </div>
    </div>
  );
};

export default BottomNav;
