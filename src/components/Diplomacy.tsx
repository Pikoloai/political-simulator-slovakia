'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useGameStore } from '@/stores/gameStore';

export default function Diplomacy() {
  const [activeTab, setActiveTab] = useState<'visits' | 'agreements' | 'sanctions'>('visits');
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);

  const countries = [
    { code: 'EU', name: '🇪🇺 Európska únia', relation: 'strong', status: '✅ Člen' },
    { code: 'CZ', name: '🇨🇿 Česká republika', relation: 'strong', status: '✅ Partner' },
    { code: 'PL', name: '🇵🇱 Poľsko', relation: 'medium', status: '⚖️ Neutrálna' },
    { code: 'HU', name: '🇭🇺 Maďarsko', relation: 'strong', status: '✅ Partner' },
    { code: 'AT', name: '🇦🇹 Rakúsko', relation: 'medium', status: '⚖️ Neutrálna' },
    { code: 'DE', name: '🇩🇪 Nemecko', relation: 'strong', status: '✅ Partner' },
    { code: 'FR', name: '🇫🇷 Francúzsko', relation: 'medium', status: '⚖️ Neutrálna' },
    { code: 'UA', name: '🇺🇦 Ukrajina', relation: 'strong', status: '✅ Podpora' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white p-4 md:p-6 pb-24">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6 bg-slate-800 border border-blue-500 rounded-lg p-6"
      >
        <h1 className="text-3xl md:text-4xl font-bold mb-2">🌍 DIPLOMACIA</h1>
        <p className="text-blue-300">Medzinárodné vzťahy a bilaterálne rokovania</p>
      </motion.div>

      {/* Tab Navigation */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="mb-6 flex flex-wrap gap-2 bg-slate-800 p-3 rounded-lg border border-slate-700"
      >
        {(['visits', 'agreements', 'sanctions'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded font-semibold transition-all ${
              activeTab === tab ? 'bg-blue-600 text-white' : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
            }`}
          >
            {tab === 'visits' && '✈️ Návštevy'}
            {tab === 'agreements' && '📋 Dohody'}
            {tab === 'sanctions' && '⚖️ Sankcie'}
          </button>
        ))}
      </motion.div>

      {/* Visits Tab */}
      {activeTab === 'visits' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="w-full bg-green-600 hover:bg-green-700 py-3 rounded-lg font-bold text-lg transition-all"
          >
            ✈️ Naplánuj návštevu zahraničia
          </motion.button>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {countries.map((country) => (
              <motion.button
                key={country.code}
                onClick={() => setSelectedCountry(country.code)}
                whileHover={{ scale: 1.05 }}
                className={`p-6 rounded-lg border-2 transition-all text-left ${
                  selectedCountry === country.code
                    ? 'bg-blue-900 border-blue-400'
                    : 'bg-slate-800 border-slate-600 hover:border-blue-400'
                }`}
              >
                <p className="text-2xl mb-2">{country.name}</p>
                <p className="text-sm text-slate-300 mb-3">{country.status}</p>
                <div className="flex gap-2">
                  <button className="flex-1 text-xs bg-blue-600 hover:bg-blue-700 py-1 rounded transition-all">
                    Rokuj
                  </button>
                  <button className="flex-1 text-xs bg-green-600 hover:bg-green-700 py-1 rounded transition-all">
                    Návšteva
                  </button>
                </div>
              </motion.button>
            ))}
          </div>
        </motion.div>
      )}

      {/* Agreements Tab */}
      {activeTab === 'agreements' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="w-full bg-green-600 hover:bg-green-700 py-3 rounded-lg font-bold text-lg transition-all"
          >
            ➕ Nová dohoda
          </motion.button>

          {[
            { country: 'Česká republika', type: 'Obchodná dohoda', status: '✅ Podpísaná' },
            { country: 'Maďarsko', type: 'Bezpečnostná spolupráca', status: '✅ Podpísaná' },
            { country: 'EU', type: 'Finančná podpora', status: '✅ Podpísaná' },
            { country: 'Nemecko', type: 'Technologická spolupráca', status: '⏳ V rokovaní' },
            { country: 'Ukrajina', type: 'Humanitárna pomoc', status: '✅ Podpísaná' },
          ].map((agreement, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="bg-slate-800 border border-blue-500 rounded-lg p-4"
            >
              <div className="flex justify-between items-start mb-2">
                <div>
                  <p className="font-bold text-lg">{agreement.country}</p>
                  <p className="text-sm text-slate-300">{agreement.type}</p>
                </div>
                <span className="text-xl">{agreement.status}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* Sanctions Tab */}
      {activeTab === 'sanctions' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-red-900 bg-opacity-20 border border-red-500 rounded-lg p-4 mb-6"
          >
            <p className="text-red-300 font-bold mb-2">⚠️ Sankcie</p>
            <p className="text-sm">Slovensko podporuje sankcie voči agrsorovi.</p>
          </motion.div>

          {[
            { country: 'Rusko', type: 'Hospodárske sankcie', level: 'Vysoké' },
            { country: 'Bielorussko', type: 'Letové zákazy', level: 'Stredné' },
            { country: 'Iran', type: 'Zbrojný embargo', level: 'Nízke' },
          ].map((sanction, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="bg-slate-800 border border-red-500 rounded-lg p-4"
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-bold text-lg">{sanction.country}</p>
                  <p className="text-sm text-slate-300">{sanction.type}</p>
                </div>
                <span className={`px-3 py-1 rounded text-xs font-bold ${
                  sanction.level === 'Vysoké' ? 'bg-red-600' :
                  sanction.level === 'Stredné' ? 'bg-yellow-600' :
                  'bg-orange-600'
                }`}>
                  {sanction.level}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
}
