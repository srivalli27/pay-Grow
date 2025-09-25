
import React from 'react';
import { useAppContext } from '../hooks/useAppContext';
import Header from '../components/core/Header';
import { BadgeType } from '../types';
import { BADGE_INFO } from '../constants';

const WalletPage = () => {
    const { savingsBalance, badges } = useAppContext();
    const highestBadge = badges.length > 0 ? badges[badges.length - 1].type : null;

    const getDiscount = () => {
        switch(highestBadge) {
            case BadgeType.GOLD: return "25% off on partner brands!";
            case BadgeType.SILVER: return "15% off on partner brands!";
            case BadgeType.BRONZE: return "5% off on partner brands!";
            default: return "Save more to unlock discounts!";
        }
    }

    return (
        <div className="p-4 pb-20">
            <Header />
            <div className="mt-6 p-6 bg-white rounded-2xl shadow-lg max-w-lg mx-auto text-center">
                <h2 className="text-xl font-semibold text-gray-600">Savings Wallet Balance</h2>
                <p className="text-5xl font-bold text-green-600 my-2">₹{savingsBalance.toFixed(2)}</p>
            </div>

            <div className="mt-8 space-y-6">
                <div className="p-6 bg-white rounded-2xl shadow-lg">
                    <h3 className="text-xl font-bold text-gray-800 mb-4">📈 Invest Your Savings</h3>
                    <p className="text-gray-600 mb-4">Grow your savings by investing in stocks, mutual funds, and more.</p>
                    <div className="flex space-x-4">
                        <a href="#" className="flex-1 text-center font-semibold py-3 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">Zerodha</a>
                        <a href="#" className="flex-1 text-center font-semibold py-3 px-4 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors">Groww</a>
                    </div>
                </div>

                <div className="p-6 bg-white rounded-2xl shadow-lg">
                    <h3 className="text-xl font-bold text-gray-800 mb-2">🎁 Get Discounts</h3>
                    <p className="text-gray-600 mb-4">Your badges unlock exclusive offers. Keep saving to get better deals!</p>
                    <div className="p-4 bg-green-50 border-2 border-dashed border-green-300 rounded-lg text-center">
                        <p className="text-lg font-bold text-green-700">{getDiscount()}</p>
                        {highestBadge && <p className="text-sm text-gray-500 mt-1">Thanks to your {BADGE_INFO[highestBadge].name} badge!</p>}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WalletPage;
