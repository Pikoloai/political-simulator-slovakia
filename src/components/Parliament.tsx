'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useGameStore } from '@/stores/gameStore';
import { MP } from '@/types/game';

export default function Parliament() {
  const parliament = useGameStore((state) => state.parliament);
  const [selectedMP, setSelectedMP] = useState<MP | null>(null);
  const [filterParty, setFilterParty] = useState<string | null>(null);
  const [showVoting, setShowVoting] = useState(false);
  const [votes, setVotes] = useState({ za: 0, proti: 0, zdrzal: 0, nehlasoval: 0 });
  const updateMPVote = useGameStore((state) => state.updateMPVote);

  const filteredMPs = filterParty ? parliament.filter((mp) => mp.party === filterParty) : parliament;
  const parties = Array.from(new Set(parliament.map((mp) => mp.party)));

  const handleVote = (mpId: string, vote: MP['votingBehavior']) => {
    updateMPVote(mpId, vote);
    setVotes((prev) => ({
      ...prev,
      [vote === 'Za' ? 'za' : vote === 'Proti' ? 'proti' : vote === 'Zdržal_sa' ? 'zdrzal' : 'nehlasoval']:
        prev[
          vote === 'Za'
            ? 'za'
            : vote === 'Proti'
              ? 'proti'
              : vote === 'Zdržal_sa'
                ? 'zdrzal'
                : 'nehlasoval'
        ] + 1,
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white p-4 md:p-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6 bg-slate-800 border border-blue-500 rounded-lg p-6"
      >
        <h1 className="text-3xl md:text-4xl font-bold mb-2">🏛️ PARLAMENTNÁ SÁLA</h1>
        <p className="text-blue-300">Národná rada Slovenskej republiky | 150 poslancov</p>
      </motion.div>

      {/* Controls */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="mb-6 bg-slate-800 border border-slate-700 rounded-lg p-4 flex flex-col md:flex-row gap-4 items-center"
      >
        <div className="flex-1 flex gap-2 flex-wrap">
          <button
            onClick={() => setFilterParty(null)}
            className={`px-4 py-2 rounded font-semibold transition-all ${
              filterParty === null ? 'bg-blue-600' : 'bg-slate-700 hover:bg-slate-600'
            }`}
          >
            Všetci poslanci
          </button>
          {parties.map((party) => (
            <button
              key={party}
              onClick={() => setFilterParty(party)}
              className={`px-4 py-2 rounded font-semibold transition-all text-sm ${
                filterParty === party ? 'bg-blue-600' : 'bg-slate-700 hover:bg-slate-600'
              }`}
            >
              {party}
            </button>
          ))}
        </div>
        <button
          onClick={() => setShowVoting(!showVoting)}
          className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded font-bold transition-all"
        >
          📊 Hlasovanie
        </button>
      </motion.div>

      {/* Voting Board */}
      {showVoting && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mb-6 bg-gradient-to-br from-slate-800 to-slate-900 border-2 border-green-500 rounded-lg p-6"
        >
          <h2 className="text-2xl font-bold mb-6">⚖️ HLASOVACIA TABUĽA</h2>
          <div className="grid grid-cols-4 gap-4 mb-6">
            <div className="bg-green-900 bg-opacity-40 border border-green-500 rounded-lg p-4 text-center">
              <p className="text-green-400 text-sm font-semibold">ZA</p>
              <p className="text-4xl font-bold text-green-300">{votes.za}</p>
            </div>
            <div className="bg-red-900 bg-opacity-40 border border-red-500 rounded-lg p-4 text-center">
              <p className="text-red-400 text-sm font-semibold">PROTI</p>
              <p className="text-4xl font-bold text-red-300">{votes.proti}</p>
            </div>
            <div className="bg-yellow-900 bg-opacity-40 border border-yellow-500 rounded-lg p-4 text-center">
              <p className="text-yellow-400 text-sm font-semibold">ZDRŽAL SA</p>
              <p className="text-4xl font-bold text-yellow-300">{votes.zdrzal}</p>
            </div>
            <div className="bg-gray-900 bg-opacity-40 border border-gray-500 rounded-lg p-4 text-center">
              <p className="text-gray-400 text-sm font-semibold">NEHLASOVAL</p>
              <p className="text-4xl font-bold text-gray-300">{votes.nehlasoval}</p>
            </div>
          </div>
          <div className="bg-slate-900 rounded-lg p-4 border border-slate-700">
            <p className="text-sm text-slate-300">Celkovo hlasovalo: {votes.za + votes.proti + votes.zdrzal}</p>
            <p className="text-sm text-slate-300">Potrebné na schválenie: 76 hlasov</p>
            <p className={`text-sm font-bold mt-2 ${
              votes.za >= 76 ? 'text-green-400' : 'text-red-400'
            }`}>
              {votes.za >= 76 ? '✅ Návrh bol schválený!' : `❌ Chýba ${76 - votes.za} hlasov`}
            </p>
          </div>
        </motion.div>
      )}

      {/* Parliament Chamber Grid */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="bg-slate-800 border border-blue-500 rounded-lg p-6"
      >
        <h2 className="text-xl md:text-2xl font-bold mb-4">Poslanci ({filteredMPs.length})</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
          {filteredMPs.map((mp, idx) => (
            <motion.button
              key={mp.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.02 }}
              onClick={() => setSelectedMP(mp)}
              className={`aspect-square rounded-lg flex items-center justify-center font-bold text-sm transition-all border-2 ${
                mp.alignment === 'government'
                  ? 'bg-blue-900 border-blue-500 hover:bg-blue-800'
                  : 'bg-red-900 border-red-500 hover:bg-red-800'
              } ${selectedMP?.id === mp.id ? 'ring-2 ring-yellow-400 scale-110' : ''}`}
              title={mp.name}
            >
              <span className="text-xs text-center px-1">👤</span>
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Selected MP Details */}
      {selectedMP && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 bg-slate-800 border-2 border-yellow-500 rounded-lg p-6 sticky bottom-4"
        >
          <button
            onClick={() => setSelectedMP(null)}
            className="float-right text-slate-400 hover:text-white text-2xl"
          >
            ✕
          </button>
          <h3 className="text-2xl font-bold mb-4">{selectedMP.name}</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            <div>
              <p className="text-slate-400 text-sm">Strana</p>
              <p className="font-bold">{selectedMP.party}</p>
            </div>
            <div>
              <p className="text-slate-400 text-sm">Región</p>
              <p className="font-bold">{selectedMP.region}</p>
            </div>
            <div>
              <p className="text-slate-400 text-sm">Vzťah</p>
              <p className={`font-bold ${
                selectedMP.alignment === 'government' ? 'text-green-400' : 'text-red-400'
              }`}>
                {selectedMP.alignment === 'government' ? 'Vláda' : 'Opozícia'}
              </p>
            </div>
            <div>
              <p className="text-slate-400 text-sm">Lojalita</p>
              <p className="font-bold text-blue-400">{Math.round(selectedMP.loyalty)}%</p>
            </div>
          </div>

          {showVoting && (
            <div className="flex gap-2 mt-4">
              <button
                onClick={() => handleVote(selectedMP.id, 'Za')}
                className="flex-1 bg-green-600 hover:bg-green-700 py-2 rounded font-bold transition-all"
              >
                ✓ ZA
              </button>
              <button
                onClick={() => handleVote(selectedMP.id, 'Proti')}
                className="flex-1 bg-red-600 hover:bg-red-700 py-2 rounded font-bold transition-all"
              >
                ✗ PROTI
              </button>
              <button
                onClick={() => handleVote(selectedMP.id, 'Zdržal_sa')}
                className="flex-1 bg-yellow-600 hover:bg-yellow-700 py-2 rounded font-bold transition-all"
              >
                ≈ ZDRŽAL SA
              </button>
              <button
                onClick={() => handleVote(selectedMP.id, 'Nehlasoval')}
                className="flex-1 bg-gray-600 hover:bg-gray-700 py-2 rounded font-bold transition-all"
              >
                — NEHLASOVAL
              </button>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
}
