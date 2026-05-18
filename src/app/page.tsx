'use client';

import { useState, useEffect } from 'react';
import { useGameStore } from '@/stores/gameStore';
import MainMenu from '@/components/MainMenu';
import IntroScreen from '@/components/IntroScreen';
import Dashboard from '@/components/Dashboard';
import Parliament from '@/components/Parliament';
import Government from '@/components/Government';
import MediaSystem from '@/components/MediaSystem';
import Elections from '@/components/Elections';
import Diplomacy from '@/components/Diplomacy';
import CrisisManagement from '@/components/CrisisManagement';
import Campaign from '@/components/Campaign';

type GameScreen = 'menu' | 'intro' | 'dashboard' | 'parliament' | 'government' | 'media' | 'elections' | 'diplomacy' | 'crisis' | 'campaign';

export default function Home() {
  const [currentScreen, setCurrentScreen] = useState<GameScreen>('menu');
  const gameState = useGameStore((state) => state.gameState);

  const handleNavigate = (screen: GameScreen) => {
    setCurrentScreen(screen);
  };

  const navigationButtons = [
    { id: 'dashboard', label: '📊 Prehľad', icon: '📊' },
    { id: 'parliament', label: '🏛️ Parlament', icon: '🏛️' },
    { id: 'government', label: '🏢 Vláda', icon: '🏢' },
    { id: 'media', label: '📺 Médi a', icon: '📺' },
    { id: 'elections', label: '🗳️ Voľby', icon: '🗳️' },
    { id: 'diplomacy', label: '🌍 Diplomacia', icon: '🌍' },
    { id: 'crisis', label: '⚠️ Krízy', icon: '⚠️' },
    { id: 'campaign', label: '📢 Kampáň', icon: '📢' },
  ];

  const renderScreen = () => {
    switch (currentScreen) {
      case 'menu':
        return <MainMenu onGameStart={() => setCurrentScreen('intro')} />;
      case 'intro':
        return <IntroScreen onComplete={() => setCurrentScreen('dashboard')} />;
      case 'dashboard':
        return <Dashboard />;
      case 'parliament':
        return <Parliament />;
      case 'government':
        return <Government />;
      case 'media':
        return <MediaSystem />;
      case 'elections':
        return <Elections />;
      case 'diplomacy':
        return <Diplomacy />;
      case 'crisis':
        return <CrisisManagement />;
      case 'campaign':
        return <Campaign />;
      default:
        return <MainMenu onGameStart={() => setCurrentScreen('intro')} />;
    }
  };

  return (
    <main className="min-h-screen bg-slate-900">
      {renderScreen()}

      {/* Bottom Navigation - Only show when game is active */}
      {gameState && currentScreen !== 'menu' && currentScreen !== 'intro' && (
        <div className="fixed bottom-0 left-0 right-0 bg-slate-800 border-t border-blue-500 p-2 md:p-3 z-50 max-h-20 overflow-y-auto">
          <div className="flex gap-1 md:gap-2 overflow-x-auto pb-2">
            {navigationButtons.map((btn) => (
              <button
                key={btn.id}
                onClick={() => handleNavigate(btn.id as GameScreen)}
                className={`flex-shrink-0 px-2 md:px-4 py-2 rounded font-bold text-xs md:text-sm transition-all ${
                  currentScreen === btn.id
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/50'
                    : 'bg-slate-700 text-white hover:bg-slate-600'
                }`}
                title={btn.label}
              >
                <span className="md:hidden">{btn.icon}</span>
                <span className="hidden md:inline">{btn.label}</span>
              </button>
            ))}
            <button
              onClick={() => {
                useGameStore.getState().reset();
                setCurrentScreen('menu');
              }}
              className="flex-shrink-0 px-2 md:px-4 py-2 bg-red-700 text-white rounded font-bold text-xs md:text-sm hover:bg-red-800 transition-all ml-auto"
              title="Koniec"
            >
              <span className="md:hidden">🚪</span>
              <span className="hidden md:inline">🚪 Koniec</span>
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
