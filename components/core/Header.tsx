
import React from 'react';
import { useAppContext } from '../../hooks/useAppContext';

const Header = () => {
    const { user, logout } = useAppContext();

    const getGreeting = () => {
        const hours = new Date().getHours();
        if (hours < 12) return "Good Morning";
        if (hours < 18) return "Good Afternoon";
        return "Good Evening";
    }

    return (
        <header className="flex justify-between items-center">
            <div>
                <p className="text-gray-500 text-sm">{getGreeting()},</p>
                <h1 className="text-2xl font-bold text-gray-800 capitalize">{user?.name}</h1>
            </div>
            <button onClick={logout} className="text-sm font-semibold text-green-600 bg-green-100 px-3 py-1 rounded-full hover:bg-green-200 transition-colors">
                Logout
            </button>
        </header>
    );
};

export default Header;
