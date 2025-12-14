import React, { useState } from 'react';
import { User } from '../types';
import { Dices, Trophy, AlertCircle } from 'lucide-react';

interface LotteryProps {
  user: User;
  onRoll: (result: number) => void;
  onBuyAttempts: () => void;
}

const Lottery: React.FC<LotteryProps> = ({ user, onRoll, onBuyAttempts }) => {
  const [rolling, setRolling] = useState(false);
  const [lastResult, setLastResult] = useState<number | null>(null);
  const [diceRotation, setDiceRotation] = useState({ x: 0, y: 0 });

  const rollDice = () => {
    if (user.balanceDice <= 0 || rolling) return;

    setRolling(true);
    setLastResult(null);

    // Animation frames
    const intervals = [100, 100, 100, 150, 200, 250, 300];
    let step = 0;

    const animate = () => {
      // Random rotation
      setDiceRotation({
        x: Math.floor(Math.random() * 360),
        y: Math.floor(Math.random() * 360)
      });

      if (step < intervals.length) {
        setTimeout(animate, intervals[step]);
        step++;
      } else {
        const result = Math.ceil(Math.random() * 6);
        setLastResult(result);
        setRolling(false);
        // Reset rotation based on result (simplified)
        setDiceRotation({ x: 0, y: 0 }); 
        onRoll(result);
      }
    };

    animate();
  };

  return (
    <div className="flex flex-col h-full p-4 pb-24 items-center justify-center relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 opacity-20 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-accent/30 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-ton/30 rounded-full blur-[100px]"></div>
      </div>

      <div className="text-center mb-8">
        <h2 className="text-3xl font-black mb-2 tracking-tight">ROLL & WIN</h2>
        <p className="text-slate-400">Roll the dice to win instant NFT prizes.</p>
      </div>

      <div className="relative w-48 h-48 mb-12 flex items-center justify-center perspective-1000">
        <div 
          className={`w-32 h-32 relative transition-all duration-300 preserve-3d ${rolling ? 'scale-90' : 'scale-100'}`}
          style={{ 
            transform: rolling 
              ? `rotateX(${diceRotation.x}deg) rotateY(${diceRotation.y}deg)` 
              : 'rotateX(0deg) rotateY(0deg)',
             transformStyle: 'preserve-3d'
          }}
        >
          {/* Simple CSS Cube representation */}
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-[0_0_30px_rgba(139,92,246,0.5)] border border-white/20">
             {lastResult ? (
               <span className="text-8xl font-black text-white drop-shadow-lg">{lastResult}</span>
             ) : (
               <Dices size={64} className="text-white/50" />
             )}
          </div>
        </div>
      </div>

      <div className="w-full max-w-xs space-y-4">
        {user.balanceDice > 0 ? (
          <button
            onClick={rollDice}
            disabled={rolling}
            className="w-full bg-white text-black py-4 rounded-2xl text-xl font-black tracking-wide shadow-xl active:scale-95 transition-all disabled:opacity-70 disabled:scale-100"
          >
            {rolling ? 'ROLLING...' : `ROLL (${user.balanceDice} LEFT)`}
          </button>
        ) : (
          <div className="space-y-3">
             <div className="bg-red-500/10 border border-red-500/50 p-3 rounded-xl flex items-center gap-3 text-red-200 text-sm">
                <AlertCircle size={20} />
                <span>No dice attempts left.</span>
             </div>
             <button
              onClick={onBuyAttempts}
              className="w-full bg-ton text-white py-3 rounded-xl font-bold active:scale-95 transition-all"
            >
              Buy Attempts
            </button>
          </div>
        )}

        {lastResult && !rolling && (
          <div className="bg-green-500/20 border border-green-500/50 p-4 rounded-xl text-center animate-bounce-short">
             <div className="flex items-center justify-center gap-2 text-green-400 font-bold mb-1">
               <Trophy size={18} />
               <span>WINNER!</span>
             </div>
             <p className="text-white text-sm">You won <span className="font-bold text-lg">{lastResult} NFTs</span></p>
          </div>
        )}
      </div>

      <div className="mt-8 text-center">
         <p className="text-xs text-slate-500 font-mono uppercase">1 Roll = 1 Attempt</p>
         <p className="text-xs text-slate-500 font-mono uppercase">Max Win = 6 NFTs</p>
      </div>
    </div>
  );
};

export default Lottery;