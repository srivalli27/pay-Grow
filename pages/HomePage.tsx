
import React, { useState } from 'react';
import { useAppContext } from '../hooks/useAppContext';
import Header from '../components/core/Header';
import Modal from '../components/core/Modal';
import TargetSetter from '../components/home/TargetSetter';
import AIPrompt from '../components/home/AIPrompt';
import Badges from '../components/home/Badges';
import { InfoIcon } from '../constants';

const HomePage = () => {
    const { user, mainBalance, savingsBalance, withdrawSavings } = useAppContext();
    const [isBalanceModalOpen, setBalanceModalOpen] = useState(false);
    const [isSavingsModalOpen, setSavingsModalOpen] = useState(false);
    const [isWithdrawModalOpen, setWithdrawModalOpen] = useState(false);
    const [withdrawAmount, setWithdrawAmount] = useState('');
    const [message, setMessage] = useState('');

    const handleWithdraw = () => {
        const amount = parseFloat(withdrawAmount);
        if(!isNaN(amount)) {
            const success = withdrawSavings(amount);
            if(success) {
                setMessage(`Successfully withdrew ₹${amount.toFixed(2)} to main balance.`);
                setWithdrawAmount('');
                setTimeout(() => setWithdrawModalOpen(false), 2000);
            } else {
                setMessage('Withdrawal failed. Insufficient savings or invalid amount.');
            }
            setTimeout(() => setMessage(''), 3000);
        }
    }

    return (
        <div className="p-4 pb-20 bg-gray-50">
            <Header />
            <main className="mt-6 space-y-6">
                <div className="p-6 bg-white rounded-2xl shadow-md">
                    <TargetSetter />
                    <AIPrompt />
                </div>
                
                <div className="grid grid-cols-3 gap-4 text-center">
                    <button onClick={() => setBalanceModalOpen(true)} className="p-4 bg-white rounded-2xl shadow-md flex flex-col items-center justify-center space-y-2 hover:bg-green-50 transition-colors">
                        <span className="text-2xl">💰</span>
                        <span className="font-semibold text-sm text-gray-700">Main Balance</span>
                    </button>
                    <button onClick={() => setSavingsModalOpen(true)} className="p-4 bg-white rounded-2xl shadow-md flex flex-col items-center justify-center space-y-2 hover:bg-green-50 transition-colors">
                        <span className="text-2xl">🏦</span>
                        <span className="font-semibold text-sm text-gray-700">Savings</span>
                    </button>
                     <button onClick={() => setWithdrawModalOpen(true)} className="p-4 bg-white rounded-2xl shadow-md flex flex-col items-center justify-center space-y-2 hover:bg-green-50 transition-colors">
                        <span className="text-2xl">💸</span>
                        <span className="font-semibold text-sm text-gray-700">Withdraw</span>
                    </button>
                </div>

                <Badges />

                 <div className="p-6 bg-white rounded-2xl shadow-md">
                    <div className="flex items-center mb-3">
                        <InfoIcon className="w-6 h-6 text-green-500 mr-3" />
                        <h3 className="text-lg font-bold text-gray-800">How Badges Work</h3>
                    </div>
                    <p className="text-sm text-gray-600">
                        Earn badges by reaching savings milestones. Each badge unlocks exclusive discounts and offers in the Wallet section. The more you save, the more you earn!
                    </p>
                </div>
            </main>

            {/* Modals */}
            <Modal isOpen={isBalanceModalOpen} onClose={() => setBalanceModalOpen(false)} title="Main Balance">
                <p className="text-4xl font-bold text-green-600 text-center">₹{mainBalance.toFixed(2)}</p>
            </Modal>
            <Modal isOpen={isSavingsModalOpen} onClose={() => setSavingsModalOpen(false)} title="Savings Wallet">
                 <p className="text-4xl font-bold text-green-600 text-center">₹{savingsBalance.toFixed(2)}</p>
            </Modal>
            <Modal isOpen={isWithdrawModalOpen} onClose={() => setWithdrawModalOpen(false)} title="Withdraw Savings">
                <div className="space-y-4">
                    <p className="text-sm text-gray-600">Enter amount to move from savings to main balance.</p>
                    <input type="number" value={withdrawAmount} onChange={e => setWithdrawAmount(e.target.value)}
                        placeholder="e.g., 100" className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"/>
                    <button onClick={handleWithdraw} className="w-full bg-green-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-700">
                        Confirm Withdraw
                    </button>
                    {message && <p className="text-center text-sm text-gray-700 mt-2">{message}</p>}
                </div>
            </Modal>
        </div>
    );
};

export default HomePage;
