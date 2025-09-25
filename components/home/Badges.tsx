
import React from 'react';
import { useAppContext } from '../../hooks/useAppContext';
import { BadgeType } from '../../types';
import { BadgeIcon, BADGE_INFO } from '../../constants';

const SingleBadge = ({ type, earned }: { type: BadgeType, earned: boolean }) => {
    const info = BADGE_INFO[type];
    const earnedClass = earned ? info.color : 'text-gray-300';
    const earnedBg = earned ? 'bg-green-50' : 'bg-gray-100';

    return (
        <div className={`p-4 rounded-xl flex flex-col items-center text-center ${earnedBg}`}>
            <BadgeIcon className={`w-10 h-10 mb-2 ${earnedClass}`} />
            <p className={`font-bold text-sm ${earned ? 'text-gray-800' : 'text-gray-400'}`}>{info.name}</p>
            <p className="text-xs text-gray-500">{info.description}</p>
        </div>
    );
}


const Badges = () => {
  const { badges } = useAppContext();
  const earnedBadges = new Set(badges.map(b => b.type));

  return (
    <div className="p-6 bg-white rounded-2xl shadow-md">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Your Badges</h3>
        <div className="grid grid-cols-3 gap-4">
            <SingleBadge type={BadgeType.BRONZE} earned={earnedBadges.has(BadgeType.BRONZE)} />
            <SingleBadge type={BadgeType.SILVER} earned={earnedBadges.has(BadgeType.SILVER)} />
            <SingleBadge type={BadgeType.GOLD} earned={earnedBadges.has(BadgeType.GOLD)} />
        </div>
    </div>
  );
};

export default Badges;
