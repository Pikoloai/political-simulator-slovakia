'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useGameStore } from '@/stores/gameStore';

interface MainMenuProps {
  onGameStart: (phase: 'intro' | 'campaign' | 'government') => void;
}

export default function MainMenu({ onGameStart }: MainMenuProps) {
  const [activeOption, setActiveOption] = useState<string | null>(null);
  const [playerName, setPlayerName] = useState('Richard Hangurbadžo');
  const [showNameInput, setShowNameInput] = useState(false);
  const initializeGame = useGameStore((state) => state.initializeGame);
  const setGamePhase = useGameStore((state) => state.setGamePhase);

  const handleNewGame = () => {
    initializeGame(playerName);
    setGamePhase('intro');
    onGameStart('intro');
  };

  const menuItems = [
    { id: 'new', label: 'Nová hra', icon: '🎮' },
    { id: 'continue', label: 'Pokračovať', icon: '▶️' },
    { id: 'career', label: 'Politická kariéra', icon: '🏛️' },
    { id: 'settings', label: 'Nastavenia', icon: '⚙️' },
    { id: 'exit', label: 'Koniec', icon: '🚪' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex flex-col items-center justify-center overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-screen filter blur-3xl animate-blob"></div>
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-red-500 rounded-full mix-blend-screen filter blur-3xl animate-blob animation-delay-2000"></div>
      </div>

      <div className="relative z-10 w-full max-w-2xl px-4">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 tracking-wider">
            SLOVENSKÝ
          </h1>
          <h2 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-400 to-red-400 bg-clip-text text-transparent mb-8">
            POLITICKÝ SIMULÁTOR
          </h2>
          <div className="h-1 w-64 mx-auto bg-gradient-to-r from-blue-400 to-red-400 rounded-full"></div>
        </motion.div>

        {/* Menu Items */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, staggerChildren: 0.1 }}
          className="space-y-4 mb-8"
        >
          {menuItems.map((item, index) => (
            <motion.button
              key={item.id}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              onClick={() => {
                setActiveOption(item.id);
                if (item.id === 'new') setShowNameInput(true);
              }}
              onMouseEnter={() => setActiveOption(item.id)}
              onMouseLeave={() => !showNameInput && setActiveOption(null)}
              className={`w-full py-4 px-6 rounded-lg font-bold text-lg transition-all duration-300 flex items-center justify-center gap-3 ${
                activeOption === item.id
                  ? 'bg-gradient-to-r from-blue-500 to-red-500 text-white shadow-lg shadow-blue-500/50 scale-105'
                  : 'bg-slate-800 text-white hover:bg-slate-700 border border-slate-700'
              }}`}
            >
              <span className="text-2xl">{item.icon}</span>
              {item.label}
            </motion.button>
          ))}
        </motion.div>

        {/* Name Input */}
        {showNameInput && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-slate-800 border border-blue-500 rounded-lg p-6 mb-4"
          >
            <label className="block text-white mb-3 font-semibold">Tvoje meno:</label>
            <input
              type="text"
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              className="w-full bg-slate-700 border border-blue-400 rounded px-4 py-2 text-white mb-4 focus:outline-none focus:border-blue-300"
              placeholder="Ing. Mgr. Richard Hangurbadžo"
            />
            <div className="flex gap-3">
              <button
                onClick={handleNewGame}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 rounded font-bold transition-all"
              >
                ✓ Štartovať hru
              </button>
              <button
                onClick={() => setShowNameInput(false)}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 rounded font-bold transition-all"
              >
                ✕ Zrušiť
              </button>
            </div>
          </motion.div>
        )}

        {/* Footer Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center text-slate-400 text-sm mt-12 border-t border-slate-700 pt-6"
        >
          <p>Politický simulátor pre Slovensko</p>
          <p className="mt-2">©2024 - Všetky práva vyhradené</p>
        </motion.div>
      </div>
    </div>
  );
}
