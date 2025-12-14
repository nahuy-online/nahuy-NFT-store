import React, { useState, useEffect } from 'react';
import { AppTab, User, Currency, NftPackage } from './types';
import { mockUser, simulateApiCall } from './services/mockApi';
import BottomNav from './components/BottomNav';
import Marketplace from './components/Marketplace';
import Lottery from './components/Lottery';
import Profile from './components/Profile';
import Support from './components/Support';
import WalletConnect from './components/WalletConnect';
import { Coins } from 'lucide-react';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<AppTab>(AppTab.MARKET);
  const [user, setUser] = useState<User>(mockUser);
  const [isLoading, setIsLoading] = useState(true);

  // Initial Data Load
  useEffect(() => {
    simulateApiCall(mockUser).then((data) => {
      setUser(data);
      setIsLoading(false);
    });
  }, []);

  const handleConnectWallet = (address: string) => {
    setUser(prev => ({ ...prev, walletAddress: address }));
  };

  const handleDisconnectWallet = () => {
    setUser(prev => ({ ...prev, walletAddress: null }));
  };

  const handleBuyNft = (pack: NftPackage, currency: Currency) => {
    setUser(prev => ({
      ...prev,
      balanceNft: prev.balanceNft + pack.amount,
      balanceNftLocked: currency === Currency.STARS ? prev.balanceNftLocked + pack.amount : prev.balanceNftLocked
    }));
    alert(`Successfully bought ${pack.title} for ${pack.price[currency]} ${currency}!`);
  };

  const handleRollDice = (result: number) => {
    setUser(prev => ({
      ...prev,
      balanceDice: Math.max(0, prev.balanceDice - 1),
      balanceNft: prev.balanceNft + result
    }));
  };

  const handleBuyDiceAttempts = () => {
    setActiveTab(AppTab.MARKET);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-dark">
        <div className="w-12 h-12 border-4 border-ton border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-slate-400 font-mono text-xs animate-pulse">LOADING NAHUY.ONLINE...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark text-white font-sans selection:bg-ton selection:text-white">
      <div className="fixed top-0 left-0 right-0 h-16 bg-dark/80 backdrop-blur-md border-b border-slate-800 z-50 flex items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-ton rounded-lg flex items-center justify-center font-black text-white transform -rotate-3">
             N
          </div>
          <span className="font-bold tracking-tight">nahuy.online</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-1.5 bg-slate-800 rounded-full px-3 py-1 border border-slate-700">
             <Coins size={12} className="text-yellow-400" />
             <span className="text-xs font-bold">{user.balanceNft} NFT</span>
          </div>
          <WalletConnect 
            address={user.walletAddress} 
            onConnect={handleConnectWallet}
            onDisconnect={handleDisconnectWallet}
          />
        </div>
      </div>

      <main className="pt-16 min-h-screen">
        {activeTab === AppTab.MARKET && (
          <Marketplace onBuy={handleBuyNft} />
        )}
        {activeTab === AppTab.LOTTERY && (
          <Lottery 
            user={user} 
            onRoll={handleRollDice} 
            onBuyAttempts={handleBuyDiceAttempts}
          />
        )}
        {activeTab === AppTab.PROFILE && (
          <Profile user={user} onDisconnect={handleDisconnectWallet} />
        )}
        {activeTab === AppTab.SUPPORT && (
          <Support />
        )}
      </main>

      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
};

export default App;