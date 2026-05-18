'use client';

import { motion } from 'framer-motion';
import { MediaArticle } from '@/types/game';
import { useState } from 'react';

interface MediaFeedProps {
  articles: MediaArticle[];
}

const sentimentIcons = {
  positive: '👍',
  neutral: '➖',
  negative: '👎',
};

const sentimentColors = {
  positive: 'border-green-500 bg-green-900 bg-opacity-20',
  neutral: 'border-yellow-500 bg-yellow-900 bg-opacity-20',
  negative: 'border-red-500 bg-red-900 bg-opacity-20',
};

export default function MediaFeed({ articles }: MediaFeedProps) {
  const [selectedArticle, setSelectedArticle] = useState<MediaArticle | null>(null);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-slate-800 border border-blue-500 rounded-lg p-6"
    >
      <h3 className="text-xl md:text-2xl font-bold mb-6">📺 MEDIÁLNA SÁLA</h3>

      {articles.length === 0 ? (
        <p className="text-slate-400 text-center py-8">Zatiaľ žiadne články...</p>
      ) : (
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {articles.map((article) => (
            <motion.button
              key={article.id}
              onClick={() => setSelectedArticle(article)}
              whileHover={{ x: 5 }}
              className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                sentimentColors[article.sentiment]
              } ${selectedArticle?.id === article.id ? 'ring-2 ring-blue-400' : ''}`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                  <p className="font-bold text-white mb-1">{article.title}</p>
                  <p className="text-xs text-slate-400">{article.outlet}</p>
                </div>
                <span className="text-2xl">{sentimentIcons[article.sentiment]}</span>
              </div>
            </motion.button>
          ))}
        </div>
      )}

      {selectedArticle && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 p-6 bg-slate-700 border border-blue-500 rounded-lg"
        >
          <button
            onClick={() => setSelectedArticle(null)}
            className="float-right text-slate-400 hover:text-white text-2xl"
          >
            ✕
          </button>
          <h4 className="text-2xl font-bold mb-2">{selectedArticle.title}</h4>
          <p className="text-sm text-slate-400 mb-4">{selectedArticle.outlet}</p>
          <p className="text-white leading-relaxed mb-4">{selectedArticle.content}</p>
          <div className="flex gap-4 text-sm">
            <span>👍 {selectedArticle.reactions}</span>
            <span>💬 {selectedArticle.comments.length}</span>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
