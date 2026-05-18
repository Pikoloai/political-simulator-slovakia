'use client';

import { motion } from 'framer-motion';
import { Crisis } from '@/types/game';

interface CrisisAlertProps {
  crisis: Crisis;
}

const crisisIcons = {
  protest: '🚨',
  scandal: '💣',
  economy: '📉',
  health: '🏥',
  migration: '👥',
  coalition: '⚡',
};

const crisisColors = {
  protest: 'from-orange-600 to-red-600',
  scandal: 'from-red-600 to-purple-600',
  economy: 'from-red-600 to-orange-600',
  health: 'from-pink-600 to-red-600',
  migration: 'from-yellow-600 to-orange-600',
  coalition: 'from-purple-600 to-red-600',
};

export default function CrisisAlert({ crisis }: CrisisAlertProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className={`bg-gradient-to-br ${crisisColors[crisis.type]} border-2 border-red-400 rounded-lg p-4`}
    >
      <div className="flex items-start justify-between mb-2">
        <h4 className="font-bold text-lg text-white">{crisisIcons[crisis.type]} {crisis.type.toUpperCase()}</h4>
        <div className="bg-red-700 text-white text-xs font-bold px-3 py-1 rounded">STUPEŇ {crisis.severity}</div>
      </div>
      <p className="text-white text-sm mb-3">{crisis.description}</p>
      <div className="bg-black bg-opacity-20 rounded p-2">
        <p className="text-xs text-white">
          Postihnuté regióny: {crisis.affectedRegions.join(', ')}
        </p>
      </div>
    </motion.div>
  );
}
