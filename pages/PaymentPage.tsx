import React, { useState } from 'react';
import { useAppContext } from '../hooks/useAppContext';
import Header from '../components/core/Header';

const PaymentPage = () => {
    const { makePayment, mainBalance } = useAppContext();
    const [recipient, setRecipient] = useState('');
    const [amount, setAmount] = useState('');
    const [message, setMessage] = useState('');

    const handlePayment = (e: React.FormEvent) => {
        e.preventDefault();
        const paymentAmount = parseFloat(amount);
        if (recipient && !isNaN(paymentAmount)) {
            const result = makePayment(paymentAmount);
            setMessage(result);
            if (!result.toLowerCase().includes('insufficient') && !result.toLowerCase().includes('invalid')) {
              setRecipient('');
              setAmount('');
            }
            setTimeout(() => setMessage(''), 4000);
        }
    };

    const paymentAmount = parseFloat(amount);
    const roundedAmount = !isNaN(paymentAmount) && paymentAmount > 0 ? Math.ceil(paymentAmount / 10) * 10 : 0;
    const buttonText = roundedAmount > 0 ? `Pay ₹${roundedAmount.toFixed(2)}` : 'Pay Securely';

    return (
        <div className="p-4 pb-20">
            <Header />
            <div className="mt-6 p-6 bg-white rounded-2xl shadow-lg max-w-lg mx-auto">
                <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">Make a Payment</h2>
                <form onSubmit={handlePayment} className="space-y-6">
                    <div>
                        <label htmlFor="recipient" className="block text-sm font-medium text-gray-700 mb-1">Recipient</label>
                        <input 
                            type="text" 
                            id="recipient"
                            value={recipient}
                            onChange={(e) => setRecipient(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                            placeholder="Enter name or UPI ID"
                            required
                        />
                    </div>
                     <div>
                        <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">Amount (₹)</label>
                        <input 
                            type="number" 
                            id="amount"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                            placeholder="0.00"
                            step="0.01"
                            min="0.01"
                            required
                        />
                    </div>
                    <button 
                        type="submit"
                        disabled={!roundedAmount || roundedAmount > mainBalance}
                        className="w-full bg-green-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-4 focus:ring-green-300 transition-transform transform hover:scale-105 disabled:bg-gray-400 disabled:cursor-not-allowed"
                    >
                        {buttonText}
                    </button>
                </form>
                {message && (
                    <div className={`mt-6 p-4 rounded-lg text-center text-sm ${message.toLowerCase().includes('successful') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        {message}
                    </div>
                )}
            </div>
        </div>
    );
};

export default PaymentPage;