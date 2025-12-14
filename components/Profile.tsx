import React from 'react';
import { User, ReferralStat } from '../types';
import { Copy, LogOut, Globe, History, Lock, Unlock } from 'lucide-react';
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface ProfileProps {
  user: User;
  onDisconnect: () => void;
}

const Profile: React.FC<ProfileProps> = ({ user, onDisconnect }) => {
  const refLink = `https://t.me/nahuy_bot?start=ref_${user.id}`;
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(refLink);
  };

  const referralData: ReferralStat[] = [
    { level: 1, percent: 3, earned: 150 },
    { level: 2, percent: 3, earned: 80 },
    { level: 3, percent: 3, earned: 45 },
  ];

  return (
    <div className="p-4 pb-24 space-y-6 overflow-y-auto h-full no-scrollbar">
      
      {/* User Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-ton to-accent flex items-center justify-center text-xl font-bold">
            {user.username.charAt(0).toUpperCase()}
          </div>
          <div>
            <h2 className="font-bold text-lg">@{user.username}</h2>
            <p className="text-xs text-slate-400">ID: {user.id}</p>
          </div>
        </div>
        <button className="p-2 bg-slate-800 rounded-full text-slate-400 hover:text-white transition-colors">
          <Globe size={20} />
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-card p-4 rounded-2xl border border-slate-700">
          <div className="flex items-center gap-2 text-slate-400 text-xs font-bold mb-2">
            <Unlock size={12} />
            AVAILABLE
          </div>
          <p className="text-2xl font-black text-white">{user.balanceNft} <span className="text-xs font-normal text-slate-500">NFTs</span></p>
        </div>
        <div className="bg-card p-4 rounded-2xl border border-slate-700 relative overflow-hidden">
          <div className="absolute -right-2 -top-2 w-12 h-12 bg-yellow-500/10 rounded-full blur-xl"></div>
          <div className="flex items-center gap-2 text-yellow-500/80 text-xs font-bold mb-2">
            <Lock size={12} />
            LOCKED (STARS)
          </div>
          <p className="text-2xl font-black text-white">{user.balanceNftLocked} <span className="text-xs font-normal text-slate-500">NFTs</span></p>
        </div>
      </div>

      {/* Dice Balance */}
      <div className="bg-gradient-to-r from-slate-800 to-slate-900 p-4 rounded-2xl border border-slate-700 flex justify-between items-center">
        <div>
           <p className="text-xs text-slate-400 font-bold mb-1">DICE ATTEMPTS</p>
           <p className="text-2xl font-black">{user.balanceDice}</p>
        </div>
        <button className="bg-white text-black px-4 py-2 rounded-lg text-xs font-bold">
          Buy More
        </button>
      </div>

      {/* Referral Section */}
      <div className="bg-card rounded-2xl p-5 border border-slate-700">
        <h3 className="font-bold text-lg mb-4">Referral Program</h3>
        
        {/* Chart */}
        <div className="h-40 w-full mb-4">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={referralData}>
              <XAxis dataKey="level" tickFormatter={(val) => `Lvl ${val}`} stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} />
              <Tooltip 
                cursor={{fill: 'rgba(255,255,255,0.05)'}} 
                contentStyle={{backgroundColor: '#1e293b', borderColor: '#334155', borderRadius: '8px', fontSize: '12px'}}
              />
              <Bar dataKey="earned" radius={[4, 4, 0, 0]}>
                {referralData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={index % 2 === 0 ? '#0098EA' : '#8B5CF6'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Link */}
        <div className="bg-black/30 p-3 rounded-xl flex items-center justify-between gap-2 border border-slate-700/50">
          <p className="text-xs text-slate-400 truncate flex-1 font-mono">{refLink}</p>
          <button 
            onClick={copyToClipboard}
            className="text-ton hover:text-white p-1"
          >
            <Copy size={16} />
          </button>
        </div>
      </div>

      {/* Actions */}
      <div className="space-y-2">
        <button className="w-full bg-slate-800 p-4 rounded-xl flex items-center justify-between text-sm font-bold group">
          <span className="flex items-center gap-3">
            <History size={18} className="text-slate-400" />
            Transaction History
          </span>
          <span className="text-slate-500 group-hover:translate-x-1 transition-transform">→</span>
        </button>
        
        {user.walletAddress && (
           <button 
             onClick={onDisconnect}
             className="w-full bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl flex items-center justify-center gap-2 text-sm font-bold mt-4"
           >
             <LogOut size={16} />
             Disconnect Wallet
           </button>
        )}
      </div>
    </div>
  );
};

export default Profile;