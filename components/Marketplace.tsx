import React, { useState } from 'react';
import { Currency, NftPackage } from '../types';
import { nftPackages } from '../services/mockApi';
import { Star, Zap, DollarSign, CheckCircle2 } from 'lucide-react';

interface MarketplaceProps {
  onBuy: (pack: NftPackage, currency: Currency) => void;
}

const Marketplace: React.FC<MarketplaceProps> = ({ onBuy }) => {
  const [selectedCurrency, setSelectedCurrency] = useState<Currency>(Currency.TON);
  const [purchasingId, setPurchasingId] = useState<number | null>(null);

  const handleBuy = (pack: NftPackage) => {
    setPurchasingId(pack.id);
    // Simulate network request
    setTimeout(() => {
      onBuy(pack, selectedCurrency);
      setPurchasingId(null);
    }, 1500);
  };

  const getCurrencyIcon = (c: Currency) => {
    switch (c) {
      case Currency.TON: return <Zap className="text-blue-400" size={16} fill="currentColor" />;
      case Currency.STARS: return <Star className="text-yellow-400" size={16} fill="currentColor" />;
      case Currency.USDT: return <DollarSign className="text-green-400" size={16} />;
    }
  };

  return (
    <div className="p-4 pb-24 space-y-6 animate-fade-in">
      <header className="space-y-2">
        <h1 className="text-3xl font-black bg-gradient-to-r from-ton to-accent bg-clip-text text-transparent">
          NFT Store
        </h1>
        <p className="text-slate-400 text-sm">Purchase NFT slots to hold or play.</p>
      </header>

      {/* Currency Switcher */}
      <div className="bg-card p-1 rounded-xl flex">
        {Object.values(Currency).map((c) => (
          <button
            key={c}
            onClick={() => setSelectedCurrency(c)}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-bold transition-all ${
              selectedCurrency === c
                ? 'bg-slate-700 text-white shadow-lg'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            {getCurrencyIcon(c)}
            {c}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-4">
        {nftPackages.map((pack) => (
          <div key={pack.id} className="bg-card border border-slate-700 rounded-2xl overflow-hidden flex flex-col relative group">
            <div className="relative h-32 overflow-hidden">
               <img 
                 src={pack.image} 
                 alt={pack.title} 
                 className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
               />
               <div className="absolute top-2 right-2 bg-black/60 backdrop-blur px-2 py-1 rounded-md text-xs font-bold text-white">
                 x{pack.amount}
               </div>
            </div>
            
            <div className="p-3 flex flex-col flex-1">
              <h3 className="font-bold text-lg leading-tight mb-1">{pack.title}</h3>
              <div className="mt-auto pt-3 flex items-center justify-between">
                <div className="flex items-center gap-1 font-mono text-lg font-bold text-ton">
                   {getCurrencyIcon(selectedCurrency)}
                   {pack.price[selectedCurrency]}
                </div>
                
                <button
                  onClick={() => handleBuy(pack)}
                  disabled={purchasingId !== null}
                  className="bg-white text-black p-2 rounded-lg font-bold hover:bg-slate-200 active:scale-95 transition-all disabled:opacity-50"
                >
                  {purchasingId === pack.id ? (
                    <span className="w-5 h-5 block rounded-full border-2 border-black border-t-transparent animate-spin"></span>
                  ) : (
                    "Buy"
                  )}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 bg-slate-800/50 p-4 rounded-xl border border-dashed border-slate-700">
        <h4 className="flex items-center gap-2 text-sm font-bold text-slate-300 mb-2">
          <CheckCircle2 size={16} className="text-green-500" />
          Lazy Minting Active
        </h4>
        <p className="text-xs text-slate-500">
          NFTs are stored off-chain until you request a withdrawal. Stars purchases have a 21-day lock period.
        </p>
      </div>
    </div>
  );
};

export default Marketplace;