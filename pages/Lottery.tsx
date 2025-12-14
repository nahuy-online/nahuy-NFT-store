import React, { useState, useRef } from 'react';
import { Currency, UserProfile } from '../types';
import { DICE_PACKS } from '../constants';
import { IconDice } from '../components/Icons';

interface LotteryProps {
  user: UserProfile;
  setUser: React.Dispatch<React.SetStateAction<UserProfile>>;
}

const Lottery: React.FC<LotteryProps> = ({ user, setUser }) => {
  const [rolling, setRolling] = useState(false);
  const [lastResult, setLastResult] = useState<number | null>(null);
  const [selectedCurrency, setSelectedCurrency] = useState<Currency>('TON');
  const [buying, setBuying] = useState<number | null>(null);
  const cooldownRef = useRef(false);

  const rollDice = () => {
    if (user.balanceDice <= 0) return;
    if (cooldownRef.current) return;

    // Rate Limit 3 seconds
    cooldownRef.current = true;
    setTimeout(() => { cooldownRef.current = false; }, 3000);

    setRolling(true);
    setLastResult(null);

    // Simulate animation duration
    setTimeout(() => {
      const result = Math.floor(Math.random() * 6) + 1;
      setRolling(false);
      setLastResult(result);
      
      setUser(prev => ({
        ...prev,
        balanceDice: prev.balanceDice - 1,
        balanceNft: prev.balanceNft + result
      }));

    }, 1500);
  };

  const handleBuyAttempts = (packIndex: number) => {
    setBuying(packIndex);
    setTimeout(() => {
      setUser(prev => ({ 
        ...prev, 
        balanceDice: prev.balanceDice + DICE_PACKS[packIndex].amount 
      }));
      setBuying(null);
      alert(`Куплено ${DICE_PACKS[packIndex].amount} попыток!`);
    }, 1000);
  };

  const getPriceDisplay = (prices: { TON: number, USDT: number, STARS: number }) => {
    const value = prices[selectedCurrency];
    if (selectedCurrency === 'STARS') return `${value.toLocaleString()} Stars`;
    return `${value} ${selectedCurrency}`;
  };

  const showShop = user.balanceDice === 0;

  return (
    <div className="pb-24 px-4 pt-6 h-full flex flex-col items-center overflow-y-auto">
      <h1 className="text-2xl font-bold mb-2">Лотерея Dice</h1>
      <p className="text-gray-400 text-sm mb-4 text-center">
        Бросай кубик и выигрывай NFT!<br/>
        Выпавшее число = количеству призов.
      </p>

      {/* Main Dice Area */}
      {!showShop && (
        <div className="flex flex-col items-center justify-center w-full max-w-xs mb-8">
            <div className={`w-40 h-40 bg-gray-800 rounded-3xl flex items-center justify-center mb-6 border-4 border-gray-700 shadow-2xl relative overflow-hidden transition-all duration-300 ${rolling ? 'animate-bounce scale-110' : ''}`}>
            {rolling ? (
                <span className="text-6xl animate-spin">🎲</span>
            ) : lastResult ? (
                <div className="text-center">
                    <span className="text-6xl font-black text-purple-400">{lastResult}</span>
                    <p className="text-xs text-gray-400 mt-2">NFT выиграно</p>
                </div>
            ) : (
                <IconDice className="w-16 h-16 text-gray-600" />
            )}
            </div>

            <div className="text-center mb-6">
                <p className="text-gray-400 text-sm uppercase tracking-wider mb-1">Доступно попыток</p>
                <p className="text-3xl font-mono font-bold text-white">{user.balanceDice}</p>
            </div>

            <button
            onClick={rollDice}
            disabled={rolling}
            className={`w-full py-4 rounded-xl font-bold text-lg transition-all transform active:scale-95 ${
                rolling
                ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                : 'bg-purple-600 text-white shadow-lg shadow-purple-900/50 hover:bg-purple-500'
            }`}
            >
            {rolling ? 'Бросаем...' : 'БРОСИТЬ КУБИК 🎲'}
            </button>
            
            {lastResult && !rolling && (
                <div className="absolute top-40 transform pointer-events-none">
                    <div className="text-yellow-400 text-4xl font-bold animate-ping">+{lastResult} NFT!</div>
                </div>
            )}
        </div>
      )}

      {/* Shop Section */}
      <div className={`w-full max-w-md ${showShop ? 'opacity-100' : 'opacity-100 pt-8 border-t border-gray-800'}`}>
        <h3 className="font-bold text-lg mb-4 text-center text-gray-300">
           {showShop ? "Закончились попытки 😢" : "Купить еще попытки"}
        </h3>
        
        {/* Currency Selector for Dice */}
        <div className="bg-[#2a2a2a] p-1 rounded-xl flex mb-6 mx-auto max-w-xs">
            {(['TON', 'USDT', 'STARS'] as Currency[]).map((curr) => (
            <button
                key={curr}
                onClick={() => setSelectedCurrency(curr)}
                className={`flex-1 py-1.5 text-xs font-medium rounded-lg transition-all ${
                selectedCurrency === curr
                    ? 'bg-purple-600 text-white shadow'
                    : 'text-gray-400 hover:text-white'
                }`}
            >
                {curr}
            </button>
            ))}
        </div>

        <div className="grid grid-cols-2 gap-3">
            {DICE_PACKS.map((pack, index) => (
                <button
                    key={index}
                    onClick={() => handleBuyAttempts(index)}
                    disabled={buying !== null}
                    className="bg-[#2a2a2a] p-3 rounded-xl border border-gray-800 flex flex-col items-center hover:border-purple-500 transition-all active:scale-95"
                >
                    <div className="font-bold text-white text-lg">{pack.amount}x 🎲</div>
                    <div className="text-xs text-purple-400 font-mono mt-1">
                        {buying === index ? '...' : getPriceDisplay(pack.prices)}
                    </div>
                </button>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Lottery;