import React, { useState } from 'react';
import { Currency, UserProfile } from '../types';
import { NFT_PACKS } from '../constants';

interface HomeProps {
  user: UserProfile;
  setUser: React.Dispatch<React.SetStateAction<UserProfile>>;
}

const Home: React.FC<HomeProps> = ({ user, setUser }) => {
  const [selectedCurrency, setSelectedCurrency] = useState<Currency>('TON');
  const [processing, setProcessing] = useState<number | null>(null);

  const handleBuy = (packIndex: number) => {
    setProcessing(packIndex);
    setTimeout(() => {
      // Mock successful purchase
      setUser(prev => ({
        ...prev,
        balanceNft: prev.balanceNft + NFT_PACKS[packIndex].amount
      }));
      setProcessing(null);
      alert(`Успешно куплено ${NFT_PACKS[packIndex].amount} NFT!`);
    }, 1500);
  };

  const getPriceDisplay = (prices: { TON: number, USDT: number, STARS: number }) => {
    const value = prices[selectedCurrency];
    if (selectedCurrency === 'STARS') return `${value.toLocaleString()} Stars`;
    return `${value} ${selectedCurrency}`;
  };

  return (
    <div className="pb-24 px-4 pt-6">
      <h1 className="text-2xl font-bold mb-2">Купить NFT</h1>
      <p className="text-gray-400 text-sm mb-6">Выберите пакет и способ оплаты.</p>

      {/* Currency Selector */}
      <div className="bg-[#2a2a2a] p-1 rounded-xl flex mb-8">
        {(['TON', 'USDT', 'STARS'] as Currency[]).map((curr) => (
          <button
            key={curr}
            onClick={() => setSelectedCurrency(curr)}
            className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${
              selectedCurrency === curr
                ? 'bg-purple-600 text-white shadow-lg'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            {curr}
          </button>
        ))}
      </div>

      {selectedCurrency === 'STARS' && (
        <div className="bg-yellow-900/30 border border-yellow-700/50 p-3 rounded-lg mb-6 text-xs text-yellow-500">
          ⚠️ При оплате Stars действует холд 21 день на вывод (антифрод).
        </div>
      )}

      {/* Pricing Packs */}
      <div className="grid grid-cols-2 gap-4">
        {NFT_PACKS.map((pack, index) => (
          <div key={index} className="bg-[#2a2a2a] rounded-2xl p-4 flex flex-col items-center border border-gray-800 hover:border-purple-500 transition-colors">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-full flex items-center justify-center text-xl font-bold mb-3 shadow-lg shadow-purple-900/50">
              {pack.amount}x
            </div>
            <h3 className="font-bold text-lg mb-1">{pack.amount} NFT</h3>
            <p className="text-gray-400 text-sm mb-4">Пакет токенов</p>
            
            <button
              onClick={() => handleBuy(index)}
              disabled={processing !== null}
              className={`w-full py-2 rounded-xl font-bold transition-all text-xs ${
                processing === index
                  ? 'bg-gray-600 cursor-not-allowed'
                  : 'bg-white text-black hover:bg-gray-200'
              }`}
            >
              {processing === index ? '...' : getPriceDisplay(pack.prices)}
            </button>
          </div>
        ))}
      </div>

      <div className="mt-8 p-4 bg-[#2a2a2a] rounded-xl border border-gray-800">
        <h3 className="font-bold mb-2 text-gray-300">О коллекции</h3>
        <p className="text-xs text-gray-500 leading-relaxed">
          Уникальные NFT с возможностью ленивого минтинга. Покупая сейчас, вы резервируете индексы в базе данных. Вывод в блокчейн доступен в профиле.
        </p>
      </div>
    </div>
  );
};

export default Home;