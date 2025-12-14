import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import WebApp from '@twa-dev/sdk';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import Lottery from './pages/Lottery';
import Profile from './pages/Profile';
import SupportChat from './pages/SupportChat';
import { MOCK_USER } from './constants';
import { UserProfile } from './types';

function App() {
  const [user, setUser] = useState<UserProfile>(MOCK_USER);

  useEffect(() => {
    // Инициализация Telegram Mini App
    if (typeof window !== 'undefined') {
      try {
        WebApp.ready();
        WebApp.expand();

        // Если есть данные пользователя от Telegram, используем их
        const tgUser = WebApp.initDataUnsafe?.user;
        if (tgUser) {
          setUser(prev => ({
            ...prev,
            id: tgUser.id,
            username: tgUser.username || tgUser.first_name || 'User',
            language: (tgUser.language_code === 'ru' || tgUser.language_code === 'en') 
              ? tgUser.language_code 
              : 'ru'
          }));
        }
      } catch (e) {
        console.error('Telegram WebApp init error:', e);
      }
    }
  }, []);

  return (
    <HashRouter>
      <div className="min-h-screen bg-[#1a1a1a] text-white font-sans max-w-md mx-auto relative shadow-2xl overflow-hidden">
        <Routes>
          <Route path="/" element={<Home user={user} setUser={setUser} />} />
          <Route path="/lottery" element={<Lottery user={user} setUser={setUser} />} />
          <Route path="/profile" element={<Profile user={user} />} />
          <Route path="/support" element={<SupportChat />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <Navigation />
      </div>
    </HashRouter>
  );
}

export default App;