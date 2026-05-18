'use client';

import { motion } from 'framer-motion';
import { Region } from '@/types/game';
import { useState } from 'react';

interface RegionMapProps {
  regions: Region[];
}

export default function RegionMap({ regions }: RegionMapProps) {
  const [selectedRegion, setSelectedRegion] = useState<Region | null>(null);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-slate-800 border border-blue-500 rounded-lg p-6"
    >
      <h3 className="text-xl md:text-2xl font-bold mb-6">🗺️ MAPA SLOVENSKA</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {regions.map((region) => (
          <motion.button
            key={region.id}
            onClick={() => setSelectedRegion(region)}
            whileHover={{ scale: 1.05 }}
            className={`p-4 rounded-lg border-2 transition-all cursor-pointer ${
              selectedRegion?.id === region.id
                ? 'bg-blue-600 border-blue-400'
                : 'bg-slate-700 border-slate-600 hover:border-blue-500'
            }`}
          >
            <p className="font-bold text-lg mb-2">{region.name}</p>
            <div className="text-sm space-y-1 text-slate-300">
              <p>👥 Podpora: {region.voterSupport}%</p>
              <p>💰 Ekonomika: {region.economyLevel}%</p>
              <p>💼 Nezamestnanosť: {region.unemployment}%</p>
              <p>🚨 Protesty: {region.protests}</p>
            </div>
          </motion.button>
        ))}
      </div>

      {selectedRegion && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 p-6 bg-slate-700 border border-blue-500 rounded-lg"
        >
          <h4 className="text-xl font-bold mb-4">{selectedRegion.name} - Detailný prehľad</h4>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div>
              <p className="text-slate-300 text-sm">Obyvateľstvo</p>
              <p className="font-bold text-lg">{selectedRegion.population.toLocaleString('sk-SK')}</p>
            </div>
            <div>
              <p className="text-slate-300 text-sm">Podpora</p>
              <p className="font-bold text-lg text-green-400">{selectedRegion.voterSupport}%</p>
            </div>
            <div>
              <p className="text-slate-300 text-sm">Nezamestnanosť</p>
              <p className="font-bold text-lg text-red-400">{selectedRegion.unemployment}%</p>
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
