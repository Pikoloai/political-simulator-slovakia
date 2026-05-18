'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useGameStore } from '@/stores/gameStore';

interface IntroScreenProps {
  onComplete: () => void;
}

export default function IntroScreen({ onComplete }: IntroScreenProps) {
  const [currentScene, setCurrentScene] = useState(0);
  const setGamePhase = useGameStore((state) => state.setGamePhase);

  const scenes = [
    {
      title: 'POLITICKÁ KRÍZA',
      text: 'Vláda Michala Šimečku sa zrútila po koaličných chaoticnosti a politických škandáloch.',
      color: 'from-red-600 to-orange-600',
      icon: '💥',
    },
    {
      title: 'VZNIK PRÁZDNOTY',
      text: 'Slovensko sa ponáraža do hlbokej politickej nestability. Ekonomika sa spomaluje. Ľudia sú rozhnevaní.',
      color: 'from-orange-600 to-yellow-600',
      icon: '📉',
    },
    {
      title: 'VOĽBY SÚ VYHLÁSENÉ',
      text: 'Prezident Slovenskej republiky vyhlasuje predčasné voľby do Národnej rady.',
      color: 'from-yellow-600 to-blue-600',
      icon: '🗳️',
    },
    {
      title: 'SOCDEM VSTUPUJE DO BOJA',
      text: 'Sociálnodemokratická strana vedená Ing. Mgr. Richardom Hangurbadžom spúšťa kampáň s názvom: "Stabilita, poriadok, budúcnosť."',
      color: 'from-blue-600 to-green-600',
      icon: '📢',
    },
    {
      title: 'TVOJ MOMENT PRIŠIEL',
      text: 'Ako premiérsky kandidát SOCDEM-u, musíš viesť stranu k víťazstvu a zachrániť Slovensko.',
      color: 'from-green-600 to-blue-600',
      icon: '🎯',
    },
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      if (currentScene < scenes.length - 1) {
        setCurrentScene(currentScene + 1);
      }
    }, 5000);
    return () => clearTimeout(timer);
  }, [currentScene, scenes.length]);

  const handleSkip = () => {
    setGamePhase('government');
    onComplete();
  };

  const scene = scenes[currentScene];

  return (
    <div className={`min-h-screen bg-gradient-to-br ${scene.color} flex items-center justify-center p-4 transition-all duration-1000`}>
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-black opacity-40"></div>
      </div>

      <motion.div
        key={currentScene}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 max-w-2xl text-center"
      >
        <div className="text-8xl mb-8 animate-bounce">{scene.icon}</div>
        <h2 className="text-5xl md:text-6xl font-bold text-white mb-6 tracking-wider">{scene.title}</h2>
        <p className="text-xl md:text-2xl text-white mb-8 leading-relaxed font-light">{scene.text}</p>

        {currentScene === scenes.length - 1 && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={handleSkip}
            className="mt-8 px-8 py-4 bg-white text-blue-600 font-bold text-lg rounded-lg hover:bg-blue-100 transition-all shadow-lg"
          >
            ▶ Spustiť hru
          </motion.button>
        )}
      </motion.div>

      {/* Progress Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2 z-20">
        {scenes.map((_, idx) => (
          <div
            key={idx}
            className={`h-2 w-8 rounded-full transition-all ${
              idx === currentScene ? 'bg-white w-12' : 'bg-white bg-opacity-50'
            }`}
          ></div>
        ))}
      </div>

      {/* Skip Button */}
      <button
        onClick={handleSkip}
        className="absolute top-8 right-8 text-white hover:text-yellow-300 transition-colors z-20 underline"
      >
        Preskočiť
      </button>
    </div>
  );
}
