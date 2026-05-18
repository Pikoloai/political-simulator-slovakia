'use client';

import { useGameStore } from '@/stores/gameStore';
import { motion } from 'framer-motion';
import StatCard from './dashboard/StatCard';
import ParliamentOverview from './dashboard/ParliamentOverview';
import RegionMap from './dashboard/RegionMap';
import MediaFeed from './dashboard/MediaFeed';
import CrisisAlert from './dashboard/CrisisAlert';
import { useState } from 'react';

export default function Dashboard() {
  const gameState = useGameStore((state) => state.gameState);
  const playerStats = useGameStore((state) => state.playerStats);
  const regions = useGameStore((state) => state.regions);
  const parliament = useGameStore((state) => state.parliament);
  const mediaArticles = useGameStore((state) => state.mediaArticles);
  const crises = useGameStore((state) => state.crises);
  const [activeTab, setActiveTab] = useState<'overview' | 'parliament' | 'map' | 'media'>('overview');
  const updateGameDay = useGameStore((state) => state.updateGameDay);

  if (!gameState || !playerStats) return null;

  const governmentMPs = parliament.filter((mp) => mp.alignment === 'government').length;
  const oppositionMPs = parliament.filter((mp) => mp.alignment === 'opposition').length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white p-4 md:p-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-slate-800 border border-blue-500 rounded-lg p-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-white">🏛️ VLÁDNY PANEL</h1>
            <p className="text-blue-300 text-sm md:text-base mt-1">Deň {gameState.gameDay} | {gameState.currentDate.toLocaleDateString('sk-SK')}</p>
          </div>
          <button
            onClick={updateGameDay}
            className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 px-4 md:px-6 py-3 rounded-lg font-bold transition-all self-start md:self-auto"
          >
            ⏭️ Ďalší deň
          </button>
        </div>
      </motion.div>

      {/* Main Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard
          title="Schválenie"
          value={Math.round(playerStats.approvalRating)}
          icon="👥"
          color="blue"
        />
        <StatCard
          title="Ekonomika"
          value={Math.round(playerStats.economyHealth)}
          icon="💰"
          color="green"
        />
        <StatCard
          title="Koalícia"
          value={Math.round(playerStats.coalitionStability)}
          icon="🤝"
          color="yellow"
        />
        <StatCard
          title="Kríza"
          value={Math.round(playerStats.crisisLevel)}
          icon="⚠️"
          color="red"
        />
      </div>

      {/* Secondary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <StatCard
          title="Nálada ľudí"
          value={Math.round(playerStats.publicMood)}
          icon="😊"
          color="purple"
          small
        />
        <StatCard
          title="Mediálny tlak"
          value={Math.round(playerStats.mediaPresure)}
          icon="📺"
          color="orange"
          small
        />
        <StatCard
          title="Politické body"
          value={playerStats.politicalPoints}
          icon="⭐"
          color="yellow"
          small
        />
      </div>

      {/* Crisis Alerts */}
      {crises.length > 0 && (
        <div className="mb-6">
          <h3 className="text-xl font-bold mb-3">⚠️ AKTÍVNE KRÍZY</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {crises.slice(0, 2).map((crisis) => (
              <CrisisAlert key={crisis.id} crisis={crisis} />
            ))}
          </div>
        </div>
      )}

      {/* Tab Navigation */}
      <div className="mb-6 flex flex-wrap gap-2 bg-slate-800 p-3 rounded-lg border border-slate-700">
        {(['overview', 'parliament', 'map', 'media'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded font-semibold transition-all ${
              activeTab === tab
                ? 'bg-blue-600 text-white'
                : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
            }`}
          >
            {tab === 'overview' && '📊 Prehľad'}
            {tab === 'parliament' && '🏛️ Parlament'}
            {tab === 'map' && '🗺️ Mapa'}
            {tab === 'media' && '📺 Médiá'}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ParliamentOverview government={governmentMPs} opposition={oppositionMPs} />
          <MediaFeed articles={mediaArticles.slice(0, 5)} />
        </div>
      )}

      {activeTab === 'parliament' && <ParliamentOverview government={governmentMPs} opposition={oppositionMPs} detailed />}

      {activeTab === 'map' && <RegionMap regions={regions} />}

      {activeTab === 'media' && <MediaFeed articles={mediaArticles} />}
    </div>
  );
}
