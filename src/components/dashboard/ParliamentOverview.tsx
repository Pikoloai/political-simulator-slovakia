'use client';

import { motion } from 'framer-motion';

interface ParliamentOverviewProps {
  government: number;
  opposition: number;
  detailed?: boolean;
}

export default function ParliamentOverview({
  government,
  opposition,
  detailed = false,
}: ParliamentOverviewProps) {
  const total = government + opposition;
  const majority = 76;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-slate-800 border border-blue-500 rounded-lg p-6"
    >
      <h3 className="text-xl md:text-2xl font-bold mb-6">🏛️ PARLAMENT SLOVENSKEJ REPUBLIKY</h3>

      {/* Majority Indicator */}
      <div className="mb-6 p-4 bg-slate-700 rounded-lg border border-slate-600">
        <p className="text-sm text-slate-300 mb-2">Parlamentná väčšina: {majority} mandátov</p>
        <div className="w-full bg-slate-600 rounded-full h-4 overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${(government / total) * 100}%` }}
            transition={{ duration: 0.8 }}
            className="h-full bg-gradient-to-r from-green-500 to-blue-500"
          />
        </div>
        <p className="text-xs text-slate-400 mt-2 font-semibold">
          {government} mandátov vládnej koalície | {opposition} mandátov opozície
        </p>
      </div>

      {/* Party Breakdown */}
      <div className="space-y-3">
        <div className="flex items-center justify-between p-3 bg-slate-700 rounded border border-green-500 border-opacity-50">
          <span className="font-semibold">🔴 SOCDEM</span>
          <span className="bg-green-600 px-3 py-1 rounded text-sm font-bold">40</span>
        </div>
        <div className="flex items-center justify-between p-3 bg-slate-700 rounded border border-blue-500 border-opacity-50">
          <span className="font-semibold">🔵 Progresívne Slovensko</span>
          <span className="bg-green-600 px-3 py-1 rounded text-sm font-bold">20</span>
        </div>
        <div className="flex items-center justify-between p-3 bg-slate-700 rounded border border-orange-500 border-opacity-50">
          <span className="font-semibold">🟠 SaS</span>
          <span className="bg-green-600 px-3 py-1 rounded text-sm font-bold">16</span>
        </div>
        <div className="flex items-center justify-between p-3 bg-slate-700 rounded border border-red-500 border-opacity-50">
          <span className="font-semibold">🔴 Opozícia</span>
          <span className="bg-red-600 px-3 py-1 rounded text-sm font-bold">{opposition}</span>
        </div>
      </div>

      {detailed && (
        <div className="mt-6 pt-6 border-t border-slate-700">
          <p className="text-sm text-slate-300 mb-4">⚠️ Koalícia potrebuje 76 mandátov k väčšine.</p>
          <p className="text-sm text-slate-300">
            {government >= majority
              ? '✅ Vláda má parlamentnú väčšinu.'
              : '❌ Vláda NEMÁ väčšinu! Riziková situácia.'}
          </p>
        </div>
      )}
    </motion.div>
  );
}
