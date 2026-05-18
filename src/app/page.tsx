'use client';

import { useState, useEffect } from 'react';
import { useGameStore } from '@/stores/gameStore';
import MainMenu from '@/components/MainMenu';
import IntroScreen from '@/components/IntroScreen';
import Dashboard from '@/components/Dashboard';
import Parliament from '@/components/Parliament';
import Government from '@/components/Government';
import MediaSystem from '@/components/MediaSystem';

type GameScreen = 'menu' | 'intro' | 'dashboard' | 'parliament' | 'government' | 'media';

export default function Home() {
  const [currentScreen, setCurrentScreen] = useState<GameScreen>('menu');
  const gameState = useGameStore((state) => state.gameState);

  // Navigation
  const handleNavigate = (screen: GameScreen) => {
    setCurrentScreen(screen);
  };

  return (
    <main className="min-h-screen bg-slate-900">
      {currentScreen === 'menu' && <MainMenu onGameStart={() => setCurrentScreen('intro')} />}

      {currentScreen === 'intro' && (
        <IntroScreen onComplete={() => setCurrentScreen('dashboard')} />
      )}

      {currentScreen === 'dashboard' && (
        <>
          <Dashboard />
          {/* Bottom Navigation */}
          <div className="fixed bottom-0 left-0 right-0 bg-slate-800 border-t border-blue-500 p-2 md:p-3 flex gap-2 overflow-x-auto z-50">
            <button
              onClick={() => handleNavigate('dashboard')}
              className="flex-shrink-0 px-4 py-2 bg-blue-600 text-white rounded font-bold text-sm md:text-base hover:bg-blue-700 transition-all"
            >
              📊 Prehľad
            </button>
            <button
              onClick={() => handleNavigate('parliament')}
              className="flex-shrink-0 px-4 py-2 bg-slate-700 text-white rounded font-bold text-sm md:text-base hover:bg-slate-600 transition-all"
            >
              🏛️ Parlament
            </button>
            <button
              onClick={() => handleNavigate('government')}
              className="flex-shrink-0 px-4 py-2 bg-slate-700 text-white rounded font-bold text-sm md:text-base hover:bg-slate-600 transition-all"
            >
              🏢 Vláda
            </button>
            <button
              onClick={() => handleNavigate('media')}
              className="flex-shrink-0 px-4 py-2 bg-slate-700 text-white rounded font-bold text-sm md:text-base hover:bg-slate-600 transition-all"
            >
              📺 Médiá
            </button>
            <button
              onClick={() => {
                useGameStore.getState().reset();
                setCurrentScreen('menu');
              }}
              className="flex-shrink-0 px-4 py-2 bg-red-700 text-white rounded font-bold text-sm md:text-base hover:bg-red-800 transition-all ml-auto"
            >
              🚪 Koniec
            </button>
          </div>
        </>
      )}

      {currentScreen === 'parliament' && (
        <>
          <Parliament />
          {/* Bottom Navigation */}
          <div className="fixed bottom-0 left-0 right-0 bg-slate-800 border-t border-blue-500 p-2 md:p-3 flex gap-2 overflow-x-auto z-50">
            <button
              onClick={() => handleNavigate('dashboard')}
              className="flex-shrink-0 px-4 py-2 bg-slate-700 text-white rounded font-bold text-sm md:text-base hover:bg-slate-600 transition-all"
            >
              📊 Prehľad
            </button>
            <button
              onClick={() => handleNavigate('parliament')}
              className="flex-shrink-0 px-4 py-2 bg-blue-600 text-white rounded font-bold text-sm md:text-base hover:bg-blue-700 transition-all"
            >
              🏛️ Parlament
            </button>
            <button
              onClick={() => handleNavigate('government')}
              className="flex-shrink-0 px-4 py-2 bg-slate-700 text-white rounded font-bold text-sm md:text-base hover:bg-slate-600 transition-all"
            >
              🏢 Vláda
            </button>
            <button
              onClick={() => handleNavigate('media')}
              className="flex-shrink-0 px-4 py-2 bg-slate-700 text-white rounded font-bold text-sm md:text-base hover:bg-slate-600 transition-all"
            >
              📺 Médiá
            </button>
            <button
              onClick={() => {
                useGameStore.getState().reset();
                setCurrentScreen('menu');
              }}
              className="flex-shrink-0 px-4 py-2 bg-red-700 text-white rounded font-bold text-sm md:text-base hover:bg-red-800 transition-all ml-auto"
            >
              🚪 Koniec
            </button>
          </div>
        </>
      )}

      {currentScreen === 'government' && (
        <>
          <Government />
          {/* Bottom Navigation */}
          <div className="fixed bottom-0 left-0 right-0 bg-slate-800 border-t border-blue-500 p-2 md:p-3 flex gap-2 overflow-x-auto z-50">
            <button
              onClick={() => handleNavigate('dashboard')}
              className="flex-shrink-0 px-4 py-2 bg-slate-700 text-white rounded font-bold text-sm md:text-base hover:bg-slate-600 transition-all"
            >
              📊 Prehľad
            </button>
            <button
              onClick={() => handleNavigate('parliament')}
              className="flex-shrink-0 px-4 py-2 bg-slate-700 text-white rounded font-bold text-sm md:text-base hover:bg-slate-600 transition-all"
            >
              🏛️ Parlament
            </button>
            <button
              onClick={() => handleNavigate('government')}
              className="flex-shrink-0 px-4 py-2 bg-blue-600 text-white rounded font-bold text-sm md:text-base hover:bg-blue-700 transition-all"
            >
              🏢 Vláda
            </button>
            <button
              onClick={() => handleNavigate('media')}
              className="flex-shrink-0 px-4 py-2 bg-slate-700 text-white rounded font-bold text-sm md:text-base hover:bg-slate-600 transition-all"
            >
              📺 Médiá
            </button>
            <button
              onClick={() => {
                useGameStore.getState().reset();
                setCurrentScreen('menu');
              }}
              className="flex-shrink-0 px-4 py-2 bg-red-700 text-white rounded font-bold text-sm md:text-base hover:bg-red-800 transition-all ml-auto"
            >
              🚪 Koniec
            </button>
          </div>
        </>
      )}

      {currentScreen === 'media' && (
        <>
          <MediaSystem />
          {/* Bottom Navigation */}
          <div className="fixed bottom-0 left-0 right-0 bg-slate-800 border-t border-blue-500 p-2 md:p-3 flex gap-2 overflow-x-auto z-50">
            <button
              onClick={() => handleNavigate('dashboard')}
              className="flex-shrink-0 px-4 py-2 bg-slate-700 text-white rounded font-bold text-sm md:text-base hover:bg-slate-600 transition-all"
            >
              📊 Prehľad
            </button>
            <button
              onClick={() => handleNavigate('parliament')}
              className="flex-shrink-0 px-4 py-2 bg-slate-700 text-white rounded font-bold text-sm md:text-base hover:bg-slate-600 transition-all"
            >
              🏛️ Parlament
            </button>
            <button
              onClick={() => handleNavigate('government')}
              className="flex-shrink-0 px-4 py-2 bg-slate-700 text-white rounded font-bold text-sm md:text-base hover:bg-slate-600 transition-all"
            >
              🏢 Vláda
            </button>
            <button
              onClick={() => handleNavigate('media')}
              className="flex-shrink-0 px-4 py-2 bg-blue-600 text-white rounded font-bold text-sm md:text-base hover:bg-blue-700 transition-all"
            >
              📺 Médiá
            </button>
            <button
              onClick={() => {
                useGameStore.getState().reset();
                setCurrentScreen('menu');
              }}
              className="flex-shrink-0 px-4 py-2 bg-red-700 text-white rounded font-bold text-sm md:text-base hover:bg-red-800 transition-all ml-auto"
            >
              🚪 Koniec
            </button>
          </div>
        </>
      )}
    </main>
  );
}
