'use client';

import { motion } from 'framer-motion';

interface StatCardProps {
  title: string;
  value: number;
  icon: string;
  color: 'blue' | 'green' | 'yellow' | 'red' | 'purple' | 'orange';
  small?: boolean;
}

const colorClasses = {
  blue: 'from-blue-600 to-blue-700 border-blue-500',
  green: 'from-green-600 to-green-700 border-green-500',
  yellow: 'from-yellow-600 to-yellow-700 border-yellow-500',
  red: 'from-red-600 to-red-700 border-red-500',
  purple: 'from-purple-600 to-purple-700 border-purple-500',
  orange: 'from-orange-600 to-orange-700 border-orange-500',
};

export default function StatCard({ title, value, icon, color, small = false }: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`bg-gradient-to-br ${colorClasses[color]} border rounded-lg p-4 md:p-6 ${
        small ? 'p-4' : ''
      }`}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-white text-opacity-80 text-sm md:text-base mb-1">{title}</p>
          <p className={`font-bold text-white ${small ? 'text-2xl' : 'text-3xl md:text-4xl'}`}>
            {value}%
          </p>
        </div>
        <div className={`text-4xl md:text-5xl ${small ? 'text-3xl' : ''}`}>{icon}</div>
      </div>
    </motion.div>
  );
}
