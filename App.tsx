import React, { useState } from 'react';
import AuthPage from './pages/AuthPage';
import HomePage from './pages/HomePage';
import PaymentPage from './pages/PaymentPage';
import WalletPage from './pages/WalletPage';
import BottomNav from './components/core/BottomNav';
import { AppProvider, useAppContext } from './hooks/useAppContext';
import { Page } from './types';
import Modal from './components/core/Modal';

const MainApp = () => {
  const { user, notification, dismissNotification } = useAppContext();
  const [activePage, setActivePage] = useState<Page>(Page.HOME);

  if (!user) {
    return <AuthPage />;
  }

  const renderPage = () => {
    switch (activePage) {
      case Page.HOME:
        return <HomePage />;
      case Page.PAYMENT:
        return <PaymentPage />;
      case Page.WALLET:
        return <WalletPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen font-sans flex flex-col">
      <div className="flex-grow">
        {renderPage()}
      </div>
      <BottomNav activePage={activePage} setActivePage={setActivePage} />
      
      <Modal
        isOpen={!!notification}
        onClose={dismissNotification}
        title="Notification"
      >
        <div className="text-center space-y-4">
            <p className="text-gray-700">{notification}</p>
            <button
                onClick={dismissNotification}
                className="w-full bg-green-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-700"
            >
                Got it!
            </button>
        </div>
      </Modal>
    </div>
  );
};

const App = () => {
  return (
    <AppProvider>
      <MainApp />
    </AppProvider>
  );
};

export default App;