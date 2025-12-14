import React from 'react';
import { UserProfile } from '../types';

interface ProfileProps {
  user: UserProfile;
}

const Profile: React.FC<ProfileProps> = ({ user }) => {
  return (
    <div className="pb-24 px-4 pt-6">
      <div className="flex items-center space-x-4 mb-8">
        <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center text-2xl">
          👻
        </div>
        <div>
          <h1 className="text-xl font-bold">@{user.username}</h1>
          <p className="text-xs text-gray-500">ID: {user.id}</p>
          <div className="flex items-center space-x-2 mt-1">
             <span className="px-2 py-0.5 bg-gray-800 rounded text-[10px] text-gray-400 border border-gray-700">RU</span>
             <span className="px-2 py-0.5 bg-gray-800 rounded text-[10px] text-gray-400 border border-gray-700">Lvl {user.referralLevel}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-[#2a2a2a] p-4 rounded-2xl border border-gray-800">
          <p className="text-xs text-gray-400 mb-1">Баланс NFT</p>
          <p className="text-2xl font-bold text-white">{user.balanceNft}</p>
          {user.balanceNftLocked > 0 && (
             <p className="text-[10px] text-yellow-500 mt-1">🔒 {user.balanceNftLocked} на холде</p>
          )}
        </div>
        <div className="bg-[#2a2a2a] p-4 rounded-2xl border border-gray-800">
          <p className="text-xs text-gray-400 mb-1">Попытки Dice</p>
          <p className="text-2xl font-bold text-white">{user.balanceDice}</p>
        </div>
      </div>

      <h2 className="text-lg font-bold mb-4">Кошелек</h2>
      <div className="bg-[#2a2a2a] p-4 rounded-2xl border border-gray-800 mb-6 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
            <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
          </div>
          <div>
            <p className="text-sm font-bold">TonConnect</p>
            <p className="text-xs text-gray-500">Не подключен</p>
          </div>
        </div>
        <button className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg text-xs font-bold transition-colors">
          Подключить
        </button>
      </div>

      <h2 className="text-lg font-bold mb-4">Реферальная программа</h2>
      <div className="bg-[#2a2a2a] p-4 rounded-2xl border border-gray-800 mb-6">
        <div className="flex justify-between mb-4">
           <div>
             <p className="text-xs text-gray-400">TON</p>
             <p className="font-mono">{user.referralEarnings.TON}</p>
           </div>
           <div>
             <p className="text-xs text-gray-400">USDT</p>
             <p className="font-mono">{user.referralEarnings.USDT}</p>
           </div>
           <div>
             <p className="text-xs text-gray-400">Stars</p>
             <p className="font-mono">{user.referralEarnings.STARS}</p>
           </div>
        </div>
        <button className="w-full py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-sm transition-colors">
          Получить реф. ссылку
        </button>
      </div>

      <div className="space-y-3">
        <button className="w-full py-3 bg-gray-800 rounded-xl text-sm font-medium hover:bg-gray-700 text-left px-4">
           📜 История транзакций
        </button>
        <button className="w-full py-3 bg-gray-800 rounded-xl text-sm font-medium hover:bg-gray-700 text-left px-4 text-red-400">
           📤 Вывести NFT (Mint)
        </button>
      </div>
    </div>
  );
};

export default Profile;