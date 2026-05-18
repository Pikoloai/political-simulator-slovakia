'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useGameStore } from '@/stores/gameStore';
import { Law } from '@/types/game';

export default function Government() {
  const gameState = useGameStore((state) => state.gameState);
  const playerStats = useGameStore((state) => state.playerStats);
  const laws = useGameStore((state) => state.laws);
  const addLaw = useGameStore((state) => state.addLaw);
  const updatePlayerStats = useGameStore((state) => state.updatePlayerStats);
  const [activeTab, setActiveTab] = useState<'cabinet' | 'laws' | 'crisis' | 'press'>('cabinet');
  const [showNewLaw, setShowNewLaw] = useState(false);
  const [newLaw, setNewLaw] = useState({
    title: '',
    description: '',
    category: 'taxes' as const,
  });

  const handleCreateLaw = () => {
    if (newLaw.title && newLaw.description) {
      const law: Law = {
        id: Math.random().toString(36).substr(2, 9),
        title: newLaw.title,
        description: newLaw.description,
        category: newLaw.category,
        impact: {
          economy: Math.random() * 20 - 10,
          popularity: Math.random() * 20 - 10,
          media: Math.random() * 30 - 15,
        },
        status: 'draft',
        createdDate: gameState?.currentDate || new Date(),
      };
      addLaw(law);
      setNewLaw({ title: '', description: '', category: 'taxes' });
      setShowNewLaw(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white p-4 md:p-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6 bg-slate-800 border border-blue-500 rounded-lg p-6"
      >
        <h1 className="text-3xl md:text-4xl font-bold mb-2">🏛️ VLÁDA SLOVENSKEJ REPUBLIKY</h1>
        <p className="text-blue-300">Premiér: Ing. Mgr. Richard Hangurbadžo | SOCDEM</p>
      </motion.div>

      {/* Tab Navigation */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="mb-6 flex flex-wrap gap-2 bg-slate-800 p-3 rounded-lg border border-slate-700"
      >
        {(['cabinet', 'laws', 'crisis', 'press'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded font-semibold transition-all ${
              activeTab === tab ? 'bg-blue-600 text-white' : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
            }`}
          >
            {tab === 'cabinet' && '👥 Kabinet'}
            {tab === 'laws' && '📜 Zákony'}
            {tab === 'crisis' && '⚠️ Krízy'}
            {tab === 'press' && '📢 TK'}
          </button>
        ))}
      </motion.div>

      {/* Cabinet Tab */}
      {activeTab === 'cabinet' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/* Ministries */}
          <div className="md:col-span-2 bg-slate-800 border border-blue-500 rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4">🏢 Ministerstvá</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                'Financií',
                'Vnútra',
                'Obrany',
                'Zahraničných vecí',
                'Zdravotníctva',
                'Školstva',
                'Dopravy',
                'Spravodlivosti',
                'Kultúry',
                'Hospodárstva',
                'Cestovného ruchu',
                'Životného prostredia',
              ].map((ministry, idx) => (
                <motion.button
                  key={idx}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.05 }}
                  className="bg-slate-700 border border-slate-600 hover:border-blue-500 rounded-lg p-4 text-left transition-all"
                >
                  <p className="font-bold mb-1">{ministry}</p>
                  <p className="text-xs text-slate-400">Minister: ${['Ľubomír Jahnátek', 'Matúš Šutaj Eštok', 'Robert Kaliňák'][idx % 3]}</p>
                  <div className="mt-2 text-xs space-y-1">
                    <p className="text-slate-300">📊 Výkon: {70 + Math.random() * 30}%</p>
                    <p className="text-slate-300">💰 Rozpočet: {Math.floor(Math.random() * 5000)}M €</p>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Government Stats */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-slate-800 border border-blue-500 rounded-lg p-6"
          >
            <h3 className="text-xl font-bold mb-4">📊 Stav vlády</h3>
            <div className="space-y-3">
              <div>
                <p className="text-slate-400 text-sm mb-1">Koaličná stabilita</p>
                <div className="w-full bg-slate-700 rounded-full h-3 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${playerStats?.coalitionStability || 0}%` }}
                    transition={{ duration: 0.8 }}
                    className="h-full bg-green-500"
                  />
                </div>
              </div>
              <div>
                <p className="text-slate-400 text-sm mb-1">Veřejná dôvera</p>
                <div className="w-full bg-slate-700 rounded-full h-3 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${playerStats?.publicTrust || 0}%` }}
                    transition={{ duration: 0.8 }}
                    className="h-full bg-blue-500"
                  />
                </div>
              </div>
              <div>
                <p className="text-slate-400 text-sm mb-1">Mediálny tlak</p>
                <div className="w-full bg-slate-700 rounded-full h-3 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${playerStats?.mediaPresure || 0}%` }}
                    transition={{ duration: 0.8 }}
                    className="h-full bg-red-500"
                  />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Actions */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-slate-800 border border-blue-500 rounded-lg p-6"
          >
            <h3 className="text-xl font-bold mb-4">⚡ Akcie</h3>
            <button className="w-full mb-2 bg-blue-600 hover:bg-blue-700 py-3 rounded font-bold transition-all">
              🗓️ Zasadnutie vlády
            </button>
            <button className="w-full mb-2 bg-green-600 hover:bg-green-700 py-3 rounded font-bold transition-all">
              📜 Návrh zákona
            </button>
            <button className="w-full bg-orange-600 hover:bg-orange-700 py-3 rounded font-bold transition-all">
              📢 Tlačová konferencia
            </button>
          </motion.div>
        </motion.div>
      )}

      {/* Laws Tab */}
      {activeTab === 'laws' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={() => setShowNewLaw(!showNewLaw)}
            className="w-full bg-green-600 hover:bg-green-700 py-3 rounded-lg font-bold text-lg transition-all"
          >
            ➕ Vytvorить nový zákon
          </motion.button>

          {showNewLaw && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-slate-800 border border-blue-500 rounded-lg p-6"
            >
              <h3 className="text-2xl font-bold mb-4">📋 Nový zákon</h3>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Názov zákona"
                  value={newLaw.title}
                  onChange={(e) => setNewLaw({ ...newLaw, title: e.target.value })}
                  className="w-full bg-slate-700 border border-blue-400 rounded px-4 py-2 text-white placeholder-slate-400 focus:outline-none focus:border-blue-300"
                />
                <textarea
                  placeholder="Popis zákona"
                  value={newLaw.description}
                  onChange={(e) => setNewLaw({ ...newLaw, description: e.target.value })}
                  rows={4}
                  className="w-full bg-slate-700 border border-blue-400 rounded px-4 py-2 text-white placeholder-slate-400 focus:outline-none focus:border-blue-300"
                />
                <select
                  value={newLaw.category}
                  onChange={(e) => setNewLaw({ ...newLaw, category: e.target.value as any })}
                  className="w-full bg-slate-700 border border-blue-400 rounded px-4 py-2 text-white focus:outline-none focus:border-blue-300"
                >
                  <option value="taxes">Dane a dane</option>
                  <option value="social">Sociálna politika</option>
                  <option value="economy">Ekonomika</option>
                  <option value="health">Zdravotníctvo</option>
                  <option value="education">Školstvo</option>
                  <option value="defense">Obrana</option>
                </select>
                <div className="flex gap-3">
                  <button
                    onClick={handleCreateLaw}
                    className="flex-1 bg-green-600 hover:bg-green-700 py-2 rounded font-bold transition-all"
                  >
                    ✓ Vytvorить
                  </button>
                  <button
                    onClick={() => setShowNewLaw(false)}
                    className="flex-1 bg-red-600 hover:bg-red-700 py-2 rounded font-bold transition-all"
                  >
                    ✕ Zrušiť
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* Laws List */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {laws.map((law) => (
              <motion.div
                key={law.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-slate-800 border border-blue-500 rounded-lg p-4"
              >
                <h4 className="font-bold text-lg mb-2">{law.title}</h4>
                <p className="text-slate-300 text-sm mb-3">{law.description}</p>
                <div className="flex gap-2 text-xs mb-3">
                  <span className="bg-blue-600 px-2 py-1 rounded">{law.category}</span>
                  <span className={`px-2 py-1 rounded ${
                    law.status === 'draft' ? 'bg-yellow-600' :
                    law.status === 'debate' ? 'bg-orange-600' :
                    law.status === 'voting' ? 'bg-blue-600' :
                    law.status === 'passed' ? 'bg-green-600' : 'bg-red-600'
                  }`}>
                    {law.status}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}
