
import React, { useState, useEffect } from 'react';
import { getSavingsInsight } from '../../services/geminiService';
import { useAppContext } from '../../hooks/useAppContext';

const AIPrompt = () => {
  const { targetAmount, savingsBalance } = useAppContext();
  const [insight, setInsight] = useState('Set a target to get personalized insights!');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchInsight = async () => {
      if (targetAmount && targetAmount > 0) {
        setLoading(true);
        const newInsight = await getSavingsInsight(targetAmount, savingsBalance);
        setInsight(newInsight);
        setLoading(false);
      } else {
        setInsight('Set a target to get personalized insights!');
      }
    };
    
    fetchInsight();
    // We only want to re-run this when the savings balance changes significantly,
    // not on every small transaction. A timeout can debounce this in a real app.
    // For this app, running on every change is fine.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [savingsBalance, targetAmount]);

  return (
    <div className="mt-4 p-4 bg-green-50 border-l-4 border-green-400 rounded-r-lg">
      <p className="text-sm font-semibold text-green-800">
        {loading ? 'Thinking...' : insight}
      </p>
    </div>
  );
};

export default AIPrompt;
