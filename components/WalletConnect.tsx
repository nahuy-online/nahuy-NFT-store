import React, { useState } from 'react';
import { Wallet } from 'lucide-react';

interface WalletConnectProps {
  address: string | null;
  onConnect: (address: string) => void;
  onDisconnect: () => void;
}

const WalletConnect: React.FC<WalletConnectProps> = ({ address, onConnect, onDisconnect }) => {
  const [loading, setLoading] = useState(false);

  const handleConnect = () => {
    setLoading(true);
    // Simulate connection delay
    setTimeout(() => {
      onConnect("EQD...8vA");
      setLoading(false);
    }, 1500);
  };

  if (address) {
    return (
      <button 
        onClick={onDisconnect}
        className="flex items-center gap-2 bg-slate-800 border border-slate-700 text-slate-300 px-3 py-1.5 rounded-full text-xs font-medium"
      >
        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
        {address}
      </button>
    );
  }

  return (
    <button
      onClick={handleConnect}
      disabled={loading}
      className="flex items-center gap-2 bg-ton hover:bg-blue-500 text-white px-4 py-2 rounded-xl text-sm font-bold transition-all active:scale-95"
    >
      {loading ? (
        <span className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full"></span>
      ) : (
        <Wallet size={16} />
      )}
      Connect Wallet
    </button>
  );
};

export default WalletConnect;