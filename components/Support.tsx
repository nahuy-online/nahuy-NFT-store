import React from 'react';
import { MessageCircle, ExternalLink, HelpCircle } from 'lucide-react';

const Support: React.FC = () => {
  const faqs = [
    { q: "How does 'Lazy Minting' work?", a: "NFTs are stored in our database initially. You can request a withdrawal to mint them to your real blockchain wallet at any time." },
    { q: "Why are my Stars NFTs locked?", a: "Purchases made with Telegram Stars have a 21-day security hold period to prevent fraud. They will unlock automatically." },
    { q: "What is the Dice winning chance?", a: "The number you roll is exactly the number of NFTs you win. Rolling a 6 gives you 6 NFTs." },
  ];

  return (
    <div className="p-4 pb-24 space-y-8 h-full overflow-y-auto no-scrollbar">
      <div className="text-center pt-8">
        <div className="w-20 h-20 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4 border border-slate-700">
           <MessageCircle size={32} className="text-ton" />
        </div>
        <h2 className="text-2xl font-black mb-2">Need Help?</h2>
        <p className="text-slate-400 text-sm max-w-xs mx-auto">Our support team is available 24/7 to assist you with any issues.</p>
      </div>

      <a 
        href="https://t.me/Nahuy_support_bot" 
        target="_blank" 
        rel="noopener noreferrer"
        className="block w-full bg-ton hover:bg-blue-500 text-white p-4 rounded-xl text-center font-bold transition-all active:scale-95 shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2"
      >
        <span>Open Support Bot</span>
        <ExternalLink size={16} />
      </a>

      <div>
        <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
          <HelpCircle size={18} className="text-slate-400" />
          FAQ
        </h3>
        <div className="space-y-3">
          {faqs.map((item, i) => (
            <div key={i} className="bg-card border border-slate-700 p-4 rounded-xl">
              <p className="font-bold text-sm text-white mb-2">{item.q}</p>
              <p className="text-xs text-slate-400 leading-relaxed">{item.a}</p>
            </div>
          ))}
        </div>
      </div>
      
      <div className="text-center mt-10">
        <p className="text-xs text-slate-600">
            nahuy.online © 2024<br/>
            All rights reserved.<br/>
            <a href="#" className="underline">Terms</a> • <a href="#" className="underline">Privacy</a>
        </p>
      </div>
    </div>
  );
};

export default Support;