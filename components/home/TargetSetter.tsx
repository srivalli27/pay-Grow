
import React, { useState } from 'react';
import { useAppContext } from '../../hooks/useAppContext';

const TargetSetter = () => {
  const { targetAmount, setTarget, savingsBalance } = useAppContext();
  const [newTarget, setNewTarget] = useState('');
  
  const handleSetTarget = (e: React.FormEvent) => {
    e.preventDefault();
    const amount = parseInt(newTarget, 10);
    if (!isNaN(amount) && amount > 0) {
      setTarget(amount);
      setNewTarget('');
    }
  };

  if (targetAmount !== null) {
    const progress = Math.min((savingsBalance / targetAmount) * 100, 100);
    return (
      <div>
        <div className="flex justify-between items-center mb-1">
          <h3 className="text-md font-bold text-gray-800">Savings Goal</h3>
          <span className="text-sm font-semibold text-green-600">
            ₹{savingsBalance.toFixed(0)} / ₹{targetAmount}
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div className="bg-green-500 h-2.5 rounded-full" style={{ width: `${progress}%` }}></div>
        </div>
      </div>
    );
  }

  return (
    <div>
        <h3 className="text-lg font-bold text-gray-800 mb-2">Set a Savings Goal</h3>
        <p className="text-sm text-gray-600 mb-4">What are you saving for? Set a target to stay motivated!</p>
        <form onSubmit={handleSetTarget} className="flex space-x-2">
            <input 
                type="number" 
                value={newTarget}
                onChange={e => setNewTarget(e.target.value)}
                placeholder="e.g., 5000" 
                className="flex-grow w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <button type="submit" className="bg-green-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-700">Set</button>
        </form>
    </div>
  );
};

export default TargetSetter;
