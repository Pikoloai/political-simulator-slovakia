'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useGameStore } from '@/stores/gameStore';

export default function Elections() {
  const gameState = useGameStore((state) => state.gameState);
  const [activeTab, setActiveTab] = useState<'parliamentary' | 'presidential' | 'regional'>('parliamentary');
  const [showElectionInfo, setShowElectionInfo] = useState(false);

  const electionTypes = [
    {
      id: 'parliamentary',
      name: 'Parlamentné voľby',
      icon: '🗳️',
      nextDate: '2028-04-11',
      description: 'Voľby do Národnej rady Slovenskej republiky',
      seats: 150,
    },
    {
      id: 'presidential',
      name: 'Prezidentské voľby',
      icon: '🎯',
      nextDate: '2029-04-15',
      description: 'Voľby prezidenta Slovenskej republiky',
      seats: 1,
    },
    {
      id: 'regional',
      name: 'Regionálne voľby',
      icon: '🗺️',
      nextDate: '2027-10-15',
      description: 'Voľby do regionálnych samospráv',
      seats: 8,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white p-4 md:p-6 pb-24">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6 bg-slate-800 border border-blue-500 rounded-lg p-6"
      >
        <h1 className="text-3xl md:text-4xl font-bold mb-2">🗳️ VOLEBNÝ KALENDÁR</h1>
        <p className="text-blue-300">Nasledujüe voľby a politické dátumy</p>
      </motion.div>

      {/* Election Types */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {electionTypes.map((election) => (
          <motion.button
            key={election.id}
            onClick={() => setActiveTab(election.id as any)}
            whileHover={{ scale: 1.05 }}
            className={`p-6 rounded-lg border-2 transition-all text-left ${
              activeTab === election.id
                ? 'bg-blue-900 border-blue-400'
                : 'bg-slate-800 border-slate-600 hover:border-blue-400'
            }`}
          >
            <div className="text-4xl mb-3">{election.icon}</div>
            <h3 className="font-bold text-lg mb-2">{election.name}</h3>
            <p className="text-sm text-slate-300 mb-3">{election.description}</p>
            <p className="text-xs text-blue-300">Dalšie: {election.nextDate}</p>
          </motion.button>
        ))}
      </div>

      {/* Active Election Details */}
      {electionTypes
        .filter((e) => e.id === activeTab)
        .map((election) => (
          <motion.div
            key={election.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-slate-800 border border-blue-500 rounded-lg p-6 mb-6"
          >
            <h2 className="text-2xl font-bold mb-4">{election.name} - Detaily</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Election Info */}
              <div className="space-y-4">
                <div className="bg-slate-700 rounded-lg p-4">
                  <p className="text-slate-300 text-sm mb-2">Dátum voľby</p>
                  <p className="text-2xl font-bold">{election.nextDate}</p>
                </div>
                <div className="bg-slate-700 rounded-lg p-4">
                  <p className="text-slate-300 text-sm mb-2">Počet mandátov</p>
                  <p className="text-2xl font-bold">{election.seats}</p>
                </div>
                <div className="bg-slate-700 rounded-lg p-4">
                  <p className="text-slate-300 text-sm mb-2">Včasova os</p>
                  <p className="text-sm text-slate-400">Voľby sa uskutocňujú kazdé 4 roky.</p>
                </div>
              </div>

              {/* Polling */}
              <div className="space-y-4">
                <div className="bg-slate-700 rounded-lg p-4">
                  <p className="text-slate-300 text-sm mb-3">Aktuálne prieskumy</p>
                  <div className="space-y-2">
                    {[
                      { party: 'SOCDEM', support: 28 },
                      { party: 'Progresívne Slovensko', support: 18 },
                      { party: 'SaS', support: 12 },
                      { party: 'KDH', support: 10 },
                      { party: 'Spolu', support: 8 },
                    ].map((poll) => (
                      <div key={poll.party}>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm">{poll.party}</span>
                          <span className="font-bold text-sm">{poll.support}%</span>
                        </div>
                        <div className="w-full bg-slate-600 rounded-full h-2 overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${poll.support}%` }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="h-full bg-blue-500"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-6 flex gap-3 flex-wrap">
              <button className="flex-1 bg-blue-600 hover:bg-blue-700 py-3 rounded-lg font-bold transition-all">
                📈 Podrobnejšie prieskumy
              </button>
              <button className="flex-1 bg-green-600 hover:bg-green-700 py-3 rounded-lg font-bold transition-all">
                📢 Kampáň 
              </button>
              <button className="flex-1 bg-orange-600 hover:bg-orange-700 py-3 rounded-lg font-bold transition-all">
                🗺️ Regióny
              </button>
            </div>
          </motion.div>
        ))}

      {/* Political Calendar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-slate-800 border border-blue-500 rounded-lg p-6"
      >
        <h2 className="text-2xl font-bold mb-4">📅 Politický kalendár</h2>
        <div className="space-y-3">
          {[
            { date: '2026-06-15', event: 'Zasadnutie vlády' },
            { date: '2026-07-01', event: 'Prezidentská receptioncia' },
            { date: '2026-08-15', event: 'Parlamentné sedenie' },
            { date: '2026-09-01', event: 'Koniec školného roka' },
            { date: '2026-10-28', event: 'Deň vzniknú Slovenskej republiky' },
            { date: '2026-11-15', event: 'Zasadnutie vlády' },
            { date: '2026-12-25', event: 'Vilézi Vianoce' },
          ].map((event, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="flex items-center justify-between p-3 bg-slate-700 rounded-lg border border-slate-600"
            >
              <div>
                <p className="font-bold">{event.event}</p>
                <p className="text-sm text-slate-400">{event.date}</p>
              </div>
              <div className="text-2xl">📅</div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
