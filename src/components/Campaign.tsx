'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useGameStore } from '@/stores/gameStore';

export default function Campaign() {
  const gameState = useGameStore((state) => state.gameState);
  const playerStats = useGameStore((state) => state.playerStats);
  const updatePlayerStats = useGameStore((state) => state.updatePlayerStats);
  const [activeTab, setActiveTab] = useState<'overview' | 'rallies' | 'media' | 'budget'>('overview');
  const [campaignBudget, setCampaignBudget] = useState(50000);
  const [campaignSpent, setCampaignSpent] = useState(10000);

  const handleCampaignAction = (type: 'rally' | 'ad' | 'social' | 'billboard', cost: number) => {
    if (campaignBudget - campaignSpent >= cost) {
      setCampaignSpent(campaignSpent + cost);
      const approval = Math.random() * 5 + 2;
      updatePlayerStats({
        approvalRating: Math.min(100, (playerStats?.approvalRating || 50) + approval),
        politicalPoints: (playerStats?.politicalPoints || 0) + Math.floor(cost / 100),
      });
    }
  };

  const remainingBudget = campaignBudget - campaignSpent;
  const budgetPercent = (campaignSpent / campaignBudget) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white p-4 md:p-6 pb-24">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6 bg-slate-800 border border-blue-500 rounded-lg p-6"
      >
        <h1 className="text-3xl md:text-4xl font-bold mb-2">📢 KAMPANIA SOCDEM</h1>
        <p className="text-blue-300">Volebná kampaň a podpora verejnosti</p>
      </motion.div>

      {/* Tab Navigation */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="mb-6 flex flex-wrap gap-2 bg-slate-800 p-3 rounded-lg border border-slate-700"
      >
        {(['overview', 'rallies', 'media', 'budget'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded font-semibold transition-all ${
              activeTab === tab ? 'bg-blue-600 text-white' : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
            }`}
          >
            {tab === 'overview' && '📊 Prehľad'}
            {tab === 'rallies' && '🎤 Zhromaždenia'}
            {tab === 'media' && '📺 Médiá'}
            {tab === 'budget' && '💰 Rozpočet'}
          </button>
        ))}
      </motion.div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          {/* Campaign Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-slate-800 border border-blue-500 rounded-lg p-6"
            >
              <p className="text-slate-300 text-sm mb-2">Schválenie</p>
              <p className="text-4xl font-bold text-blue-400 mb-2">{Math.round(playerStats?.approvalRating || 0)}%</p>
              <div className="w-full bg-slate-700 rounded-full h-2 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${playerStats?.approvalRating || 0}%` }}
                  transition={{ duration: 0.8 }}
                  className="h-full bg-blue-500"
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-slate-800 border border-green-500 rounded-lg p-6"
            >
              <p className="text-slate-300 text-sm mb-2">Politické body</p>
              <p className="text-4xl font-bold text-green-400">{playerStats?.politicalPoints}</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-slate-800 border border-purple-500 rounded-lg p-6"
            >
              <p className="text-slate-300 text-sm mb-2">Nálada ľudí</p>
              <p className="text-4xl font-bold text-purple-400">{Math.round(playerStats?.publicMood || 0)}%</p>
            </motion.div>
          </div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 20 }}
            className="bg-slate-800 border border-blue-500 rounded-lg p-6"
          >
            <h2 className="text-2xl font-bold mb-4">Rýchle akcie</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button
                onClick={() => handleCampaignAction('rally', 5000)}
                disabled={remainingBudget < 5000}
                className="bg-blue-600 hover:bg-blue-700 disabled:bg-slate-600 disabled:opacity-50 px-4 py-3 rounded-lg font-bold transition-all"
              >
                🎤 Zhromaždenie (5000€)
              </button>
              <button
                onClick={() => handleCampaignAction('ad', 3000)}
                disabled={remainingBudget < 3000}
                className="bg-green-600 hover:bg-green-700 disabled:bg-slate-600 disabled:opacity-50 px-4 py-3 rounded-lg font-bold transition-all"
              >
                📺 TV reklama (3000€)
              </button>
              <button
                onClick={() => handleCampaignAction('social', 1500)}
                disabled={remainingBudget < 1500}
                className="bg-purple-600 hover:bg-purple-700 disabled:bg-slate-600 disabled:opacity-50 px-4 py-3 rounded-lg font-bold transition-all"
              >
                📱 Sociálne médiá (1500€)
              </button>
              <button
                onClick={() => handleCampaignAction('billboard', 2000)}
                disabled={remainingBudget < 2000}
                className="bg-orange-600 hover:bg-orange-700 disabled:bg-slate-600 disabled:opacity-50 px-4 py-3 rounded-lg font-bold transition-all"
              >
                🔖 Billboard (2000€)
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Rallies Tab */}
      {activeTab === 'rallies' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="w-full bg-green-600 hover:bg-green-700 py-3 rounded-lg font-bold text-lg transition-all"
          >
            🎤 Naplan
vať zhromaždenie
          </motion.button>

          {['Bratislava', 'Košice', 'Banská Bystrica', 'Žilina', 'Prešov'].map((city, idx) => (
            <motion.button
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="w-full text-left p-4 bg-slate-800 border border-blue-500 rounded-lg hover:border-blue-400 transition-all"
            >
              <p className="font-bold mb-1">{city}</p>
              <p className="text-sm text-slate-300">Podpora: {65 + Math.random() * 30}%</p>
            </motion.button>
          ))}
        </motion.div>
      )}

      {/* Media Tab */}
      {activeTab === 'media' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="w-full bg-green-600 hover:bg-green-700 py-3 rounded-lg font-bold text-lg transition-all"
          >
            📢 Nová tla čová správa
          </motion.button>

          {[
            { outlet: 'TA3', type: 'TV interview' },
            { outlet: 'TASR', type: 'Tla čová správa' },
            { outlet: 'Pravda', type: 'Článok' },
            { outlet: 'Facebook', type: 'Post' },
            { outlet: 'Instagram', type: 'Story' },
          ].map((media, idx) => (
            <motion.button
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="w-full text-left p-4 bg-slate-800 border border-blue-500 rounded-lg hover:border-blue-400 transition-all"
            >
              <p className="font-bold mb-1">{media.outlet}</p>
              <p className="text-sm text-slate-300">{media.type}</p>
            </motion.button>
          ))}
        </motion.div>
      )}

      {/* Budget Tab */}
      {activeTab === 'budget' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-slate-800 border border-blue-500 rounded-lg p-6"
          >
            <h2 className="text-2xl font-bold mb-4">Rozpočet kampane</h2>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span>Celkový rozpočet:</span>
                  <span className="font-bold">{campaignBudget.toLocaleString('sk-SK')}€</span>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span>Utratené:</span>
                  <span className="font-bold text-red-400">{campaignSpent.toLocaleString('sk-SK')}€</span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-4 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${budgetPercent}%` }}
                    transition={{ duration: 0.8 }}
                    className="h-full bg-red-500"
                  />
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span>Zostáva:</span>
                  <span className={`font-bold ${
                    remainingBudget > 10000 ? 'text-green-400' : remainingBudget > 5000 ? 'text-yellow-400' : 'text-red-400'
                  }`}>
                    {remainingBudget.toLocaleString('sk-SK')}€
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
