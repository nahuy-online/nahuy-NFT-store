import React from 'react';
import { NavLink } from 'react-router-dom';
import { IconHome, IconDice, IconProfile, IconChat } from './Icons';

const Navigation: React.FC = () => {
  const navClass = ({ isActive }: { isActive: boolean }) =>
    `flex flex-col items-center justify-center w-full h-full space-y-1 ${
      isActive ? 'text-purple-400' : 'text-gray-500 hover:text-gray-300'
    }`;

  return (
    <nav className="fixed bottom-0 left-0 right-0 h-16 bg-[#1a1a1a] border-t border-gray-800 z-50">
      <div className="flex justify-between items-center h-full px-6 max-w-md mx-auto">
        <NavLink to="/" className={navClass}>
          <IconHome className="w-6 h-6" />
          <span className="text-[10px]">Главная</span>
        </NavLink>
        <NavLink to="/lottery" className={navClass}>
          <IconDice className="w-6 h-6" />
          <span className="text-[10px]">Лотерея</span>
        </NavLink>
        <NavLink to="/profile" className={navClass}>
          <IconProfile className="w-6 h-6" />
          <span className="text-[10px]">Профиль</span>
        </NavLink>
        <NavLink to="/support" className={navClass}>
          <IconChat className="w-6 h-6" />
          <span className="text-[10px]">AI Помощь</span>
        </NavLink>
      </div>
    </nav>
  );
};

export default Navigation;