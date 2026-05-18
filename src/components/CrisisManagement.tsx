'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useGameStore } from '@/stores/gameStore';
import { Crisis } from '@/types/game';

export default function CrisisManagement() {
  const crises = useGameStore((state) => state.crises);
  const addCrisis = useGameStore((state) => state.addCrisis);
  const updatePlayerStats = useGameStore((state) => state.updatePlayerStats);
  const [selectedCrisis, setSelectedCrisis] = useState<Crisis | null>(null);
  const [showNewCrisis, setShowNewCrisis] = useState(false);

  const crisisTypes = [
    { type: 'protest', label: 'Protesty', icon: '🚨', color: 'orange' },
    { type: 'scandal', label: 'Škandál', icon: '💣', color: 'red' },
    { type: 'economy', label: 'Ekonomika', icon: '📉', color: 'red' },
    { type: 'health', label: 'Zdravotníctvo', icon: '🏥', color: 'pink' },
    { type: 'migration', label: 'Migrácia', icon: '👥', color: 'yellow' },
    { type: 'coalition', label: 'Koalícia', icon: '⚡', color: 'purple' },
  ];

  const handleResolveCrisis = (crisisId: string, decisionType: 'aggressive' | 'diplomatic' | 'economic') => {
    const crisis = crises.find((c) => c.id === crisisId);
    if (!crisis) return;

    const impactMap = {
      aggressive: { approval: -10, economy: -15, media: 20 },
      diplomatic: { approval: 10, economy: -5, media: -10 },
      economic: { approval: 5, economy: 15, media: 0 },
    };

    const impact = impactMap[decisionType];
    updatePlayerStats({
      approvalRating: Math.max(0, Math.min(100, (useGameStore.getState().playerStats?.approvalRating || 50) + impact.approval)),
      economyHealth: Math.max(0, Math.min(100, (useGameStore.getState().playerStats?.economyHealth || 50) + impact.economy)),
      mediaPresure: Math.max(0, Math.min(100, (useGameStore.getState().playerStats?.mediaPresure || 50) + impact.media)),
    });

    setSelectedCrisis(null);
  };

  const handleCreateCrisis = (type: any) => {
    const newCrisis: Crisis = {
      id: Math.random().toString(36).substr(2, 9),
      type,
      severity: Math.floor(Math.random() * 50) + 30,
      description: `Nová kríza typu ${type} sa objavila a vyžaduje vašu pozornosť.`,
      affectedRegions: ['Bratislava', 'Košice'],
      createdDate: new Date(),
      resolved: false,
    };
    addCrisis(newCrisis);
    setShowNewCrisis(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white p-4 md:p-6 pb-24">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6 bg-slate-800 border border-red-500 rounded-lg p-6"
      >
        <h1 className="text-3xl md:text-4xl font-bold mb-2">⚠️ KRÍZOVÝ MANAŽMENT</h1>
        <p className="text-red-300">Aktívne krízy a hrozby</p>
      </motion.div>

      {/* Control Buttons */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="mb-6 flex gap-3 flex-wrap"
      >
        <button
          onClick={() => setShowNewCrisis(!showNewCrisis)}
          className="bg-red-600 hover:bg-red-700 px-6 py-3 rounded-lg font-bold transition-all"
        >
          ⚠️ Nová kríza (test)
        </button>
      </motion.div>

      {/* Create Crisis */}
      {showNewCrisis && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mb-6 bg-slate-800 border border-red-500 rounded-lg p-6"
        >
          <h2 className="text-2xl font-bold mb-4">Vytvoriť krizu (test)</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {crisisTypes.map((crisis) => (
              <button
                key={crisis.type}
                onClick={() => handleCreateCrisis(crisis.type)}
                className="bg-red-900 hover:bg-red-800 border border-red-500 rounded-lg p-4 text-left transition-all"
              >
                <p className="text-2xl mb-1">{crisis.icon}</p>
                <p className="font-bold text-sm">{crisis.label}</p>
              </button>
            ))}
          </div>
        </motion.div>
      )}

      {/* Active Crises */}
      {crises.length > 0 ? (
        <div className="space-y-4 mb-6">
          <h2 className="text-2xl font-bold">Aktívne krízy ({crises.length})</h2>
          {crises
            .filter((c) => !c.resolved)
            .map((crisis) => (
              <motion.button
                key={crisis.id}
                onClick={() => setSelectedCrisis(crisis)}
                whileHover={{ scale: 1.02 }}
                className={`w-full text-left p-6 rounded-lg border-2 transition-all ${
                  selectedCrisis?.id === crisis.id
                    ? 'bg-red-900 border-red-400 ring-2 ring-red-300'
                    : 'bg-slate-800 border-red-500 hover:border-red-400'
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <p className="font-bold text-lg mb-1">{crisis.type.toUpperCase()}</p>
                    <p className="text-slate-300 text-sm mb-2">{crisis.description}</p>
                    <p className="text-xs text-slate-400">Postihnuté regióny: {crisis.affectedRegions.join(', ')}</p>
                  </div>
                  <div className="text-right">
                    <div className="bg-red-700 text-white px-3 py-1 rounded font-bold text-sm mb-2">
                      STUPEŇ {crisis.severity}
                    </div>
                  </div>
                </div>
              </motion.button>
            ))}
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-green-900 bg-opacity-20 border border-green-500 rounded-lg p-6 text-center mb-6"
        >
          <p className="text-green-300 text-lg font-bold">✅ Zatiaľ bez aktívnych krízí</p>
        </motion.div>
      )}

      {/* Crisis Detail */}
      {selectedCrisis && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-slate-800 border-2 border-red-500 rounded-lg p-6 mb-6"
        >
          <button
            onClick={() => setSelectedCrisis(null)}
            className="float-right text-slate-400 hover:text-white text-2xl"
          >
            ✕
          </button>

          <h3 className="text-3xl font-bold mb-4">⚠️ {selectedCrisis.type.toUpperCase()}</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Crisis Info */}
            <div className="space-y-4">
              <div className="bg-slate-700 rounded-lg p-4">
                <p className="text-slate-300 text-sm mb-2">Popis</p>
                <p className="text-white">{selectedCrisis.description}</p>
              </div>
              <div className="bg-slate-700 rounded-lg p-4">
                <p className="text-slate-300 text-sm mb-2">Postihnuté regióny</p>
                <p className="text-white">{selectedCrisis.affectedRegions.join(', ')}</p>
              </div>
              <div className="bg-red-900 bg-opacity-40 rounded-lg p-4 border border-red-500">
                <p className="text-slate-300 text-sm mb-2">Závažnosť</p>
                <div className="flex items-center gap-3">
                  <div className="flex-1 bg-slate-600 rounded-full h-4 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${selectedCrisis.severity}%` }}
                      transition={{ duration: 0.8 }}
                      className="h-full bg-red-500"
                    />
                  </div>
                  <span className="font-bold text-red-300">{selectedCrisis.severity}%</span>
                </div>
              </div>
            </div>

            {/* Decision Options */}
            <div className="space-y-3">
              <p className="font-bold text-lg">Ako reagovať?</p>

              <button
                onClick={() => handleResolveCrisis(selectedCrisis.id, 'aggressive')}
                className="w-full bg-red-700 hover:bg-red-800 border-2 border-red-500 rounded-lg p-4 text-left transition-all group"
              >
                <p className="font-bold mb-1 group-hover:text-red-200">🔥 Agresívne riešenie</p>
                <p className="text-xs text-slate-300 group-hover:text-slate-200">Rýchle, ale nepopulárne. Schválenie -10%, Ekonomika -15%</p>
              </button>

              <button
                onClick={() => handleResolveCrisis(selectedCrisis.id, 'diplomatic')}
                className="w-full bg-blue-700 hover:bg-blue-800 border-2 border-blue-500 rounded-lg p-4 text-left transition-all group"
              >
                <p className="font-bold mb-1 group-hover:text-blue-200">🤝 Diplomatické riešenie</p>
                <p className="text-xs text-slate-300 group-hover:text-slate-200">Populárne, pomaly. Schválenie +10%, Médiá -10%</p>
              </button>

              <button
                onClick={() => handleResolveCrisis(selectedCrisis.id, 'economic')}
                className="w-full bg-green-700 hover:bg-green-800 border-2 border-green-500 rounded-lg p-4 text-left transition-all group"
              >
                <p className="font-bold mb-1 group-hover:text-green-200">💰 Ekonomické riešenie</p>
                <p className="text-xs text-slate-300 group-hover:text-slate-200">Nákladné, efektívne. Ekonomika +15%, Schválenie +5%</p>
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* Crisis History */}
      {crises.filter((c) => c.resolved).length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-slate-800 border border-slate-700 rounded-lg p-6"
        >
          <h2 className="text-xl font-bold mb-4">✅ Vyriešené krízy</h2>
          <div className="space-y-2">
            {crises
              .filter((c) => c.resolved)
              .map((crisis) => (
                <div key={crisis.id} className="flex items-center gap-3 p-3 bg-slate-700 rounded-lg">
                  <span>✅</span>
                  <p className="flex-1">{crisis.type.toUpperCase()} - {crisis.description}</p>
                </div>
              ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}
