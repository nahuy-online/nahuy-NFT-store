import React, { useState, useEffect, useRef } from 'react';
import { sendMessageToGemini } from '../services/geminiService';
import { ChatMessage } from '../types';
import { IconBrain } from '../components/Icons';

const SupportChat: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: '1', role: 'model', text: 'Привет! Я ИИ-помощник nahuy_NFT_bot. Чем могу помочь?' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [thinkingMode, setThinkingMode] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: input
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    const botResponseText = await sendMessageToGemini(userMsg.text, thinkingMode);

    const botMsg: ChatMessage = {
      id: (Date.now() + 1).toString(),
      role: 'model',
      text: botResponseText,
      isThinking: thinkingMode
    };

    setMessages(prev => [...prev, botMsg]);
    setLoading(false);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-64px)] bg-[#1a1a1a]">
      {/* Header */}
      <div className="p-4 bg-[#2a2a2a] border-b border-gray-800 flex justify-between items-center shadow-md z-10">
        <div>
            <h1 className="font-bold text-lg">AI Поддержка</h1>
            <p className="text-[10px] text-gray-400">Gemini 3.0 Pro Preview</p>
        </div>
        
        {/* Thinking Mode Toggle */}
        <label className="flex items-center space-x-2 cursor-pointer bg-black/20 p-1.5 rounded-lg border border-gray-700">
            <input 
                type="checkbox" 
                checked={thinkingMode}
                onChange={(e) => setThinkingMode(e.target.checked)}
                className="hidden"
            />
            <div className={`w-8 h-4 rounded-full p-0.5 transition-colors ${thinkingMode ? 'bg-purple-500' : 'bg-gray-600'}`}>
                <div className={`w-3 h-3 bg-white rounded-full shadow-sm transform transition-transform ${thinkingMode ? 'translate-x-4' : 'translate-x-0'}`} />
            </div>
            <IconBrain className={`w-4 h-4 ${thinkingMode ? 'text-purple-400 animate-pulse' : 'text-gray-500'}`} />
        </label>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] p-3 rounded-2xl text-sm leading-relaxed relative ${
                msg.role === 'user'
                  ? 'bg-purple-600 text-white rounded-br-none'
                  : 'bg-[#2a2a2a] text-gray-200 border border-gray-700 rounded-bl-none'
              }`}
            >
              {msg.isThinking && msg.role === 'model' && (
                  <div className="absolute -top-3 left-0 bg-gray-800 text-[9px] text-purple-300 px-2 py-0.5 rounded-full border border-purple-900/50 flex items-center">
                     <IconBrain className="w-3 h-3 mr-1" /> Thinking
                  </div>
              )}
              {msg.text}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-[#2a2a2a] p-3 rounded-2xl rounded-bl-none border border-gray-700 flex space-x-1 items-center">
               <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
               <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
               <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 bg-[#2a2a2a] border-t border-gray-800">
        <div className="flex items-center space-x-2 bg-black/30 rounded-xl p-2 border border-gray-700 focus-within:border-purple-500 transition-colors">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Задайте вопрос..."
            className="flex-1 bg-transparent outline-none text-sm text-white placeholder-gray-500"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || loading}
            className={`p-2 rounded-lg transition-colors ${
                !input.trim() || loading ? 'text-gray-600' : 'text-purple-400 hover:bg-purple-900/20'
            }`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
              <path d="M3.105 2.289a.75.75 0 00-.826.95l1.414 4.925A1.5 1.5 0 005.135 9.25h6.115a.75.75 0 010 1.5H5.135a1.5 1.5 0 00-1.442 1.086l-1.414 4.926a.75.75 0 00.826.95 28.896 28.896 0 0015.293-7.154.75.75 0 000-1.115A28.897 28.897 0 003.105 2.289z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SupportChat;