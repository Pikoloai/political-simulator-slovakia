'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useGameStore } from '@/stores/gameStore';

export default function MediaSystem() {
  const mediaArticles = useGameStore((state) => state.mediaArticles);
  const addMediaArticle = useGameStore((state) => state.addMediaArticle);
  const [selectedArticle, setSelectedArticle] = useState<string | null>(null);

  const outlets = ['TA3', 'TASR', 'RTVS', 'Pravda', 'Sme', 'Plus 7 dní'];
  const headlines = [
    'Vláda predstavila nový reformný balík',
    'Opozícia kritizuje ekonomickú politiku',
    'Schválené zmeny v zdravotníctve',
    'Koalícia vyjadrila jednotný postoj',
    'EU schválila investičný plán pre Slovensko',
  ];

  const handleCreateArticle = () => {
    const sentiment = ['positive', 'neutral', 'negative'][Math.floor(Math.random() * 3)] as any;
    const article = {
      id: Math.random().toString(36).substr(2, 9),
      title: headlines[Math.floor(Math.random() * headlines.length)],
      content: 'Úplný text článku by sa zobrazil tu. Novinárom sa podarilo zistiť ďalšie detaily...',
      outlet: outlets[Math.floor(Math.random() * outlets.length)],
      sentiment,
      impact: Math.floor(Math.random() * 30) - 15,
      createdDate: new Date(),
      reactions: Math.floor(Math.random() * 5000),
      comments: [],
    };
    addMediaArticle(article);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white p-4 md:p-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6 bg-slate-800 border border-blue-500 rounded-lg p-6"
      >
        <h1 className="text-3xl md:text-4xl font-bold mb-2">📺 MEDIÁLNY MONITOROVACÍ SYSTÉM</h1>
        <p className="text-blue-300">Sledovanie správ a mediálneho pokrytia</p>
      </motion.div>

      {/* Control Buttons */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="mb-6 flex gap-3 flex-wrap"
      >
        <button
          onClick={handleCreateArticle}
          className="bg-green-600 hover:bg-green-700 px-6 py-3 rounded-lg font-bold transition-all"
        >
          ➕ Nový článok
        </button>
        <button className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-bold transition-all">
          📺 TV Debata
        </button>
        <button className="bg-orange-600 hover:bg-orange-700 px-6 py-3 rounded-lg font-bold transition-all">
          📢 Tlačová správa
        </button>
      </motion.div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Articles List */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-2xl font-bold mb-4">📰 Najnovšie správy</h2>
          {mediaArticles.slice(0, 10).map((article) => (
            <motion.button
              key={article.id}
              onClick={() => setSelectedArticle(article.id)}
              whileHover={{ x: 5 }}
              className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                article.sentiment === 'positive'
                  ? 'border-green-500 bg-green-900 bg-opacity-20 hover:bg-opacity-30'
                  : article.sentiment === 'negative'
                    ? 'border-red-500 bg-red-900 bg-opacity-20 hover:bg-opacity-30'
                    : 'border-yellow-500 bg-yellow-900 bg-opacity-20 hover:bg-opacity-30'
              } ${selectedArticle === article.id ? 'ring-2 ring-blue-400' : ''}`}
            >
              <div className="flex justify-between items-start gap-3">
                <div className="flex-1">
                  <h3 className="font-bold text-white mb-1">{article.title}</h3>
                  <p className="text-sm text-slate-400">{article.outlet}</p>
                </div>
                <span className="text-2xl">
                  {article.sentiment === 'positive' ? '👍' : article.sentiment === 'negative' ? '👎' : '📰'}
                </span>
              </div>
            </motion.button>
          ))}
        </div>

        {/* Article Detail */}
        {selectedArticle && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-slate-800 border border-blue-500 rounded-lg p-6 sticky top-4 h-fit"
          >
            {mediaArticles.find((a) => a.id === selectedArticle) && (
              <>
                <button
                  onClick={() => setSelectedArticle(null)}
                  className="float-right text-slate-400 hover:text-white text-2xl"
                >
                  ✕
                </button>
                <h3 className="text-xl font-bold mb-2">
                  {mediaArticles.find((a) => a.id === selectedArticle)?.title}
                </h3>
                <p className="text-sm text-slate-400 mb-4">
                  {mediaArticles.find((a) => a.id === selectedArticle)?.outlet}
                </p>
                <p className="text-white mb-4 leading-relaxed">
                  {mediaArticles.find((a) => a.id === selectedArticle)?.content}
                </p>
                <div className="bg-slate-700 p-3 rounded text-sm">
                  <p className="mb-2">
                    Vplyv na popularitu:{' '}
                    <span
                      className={mediaArticles.find((a) => a.id === selectedArticle)?.impact! > 0 ? 'text-green-400' : 'text-red-400'}
                    >
                      {mediaArticles.find((a) => a.id === selectedArticle)?.impact}%
                    </span>
                  </p>
                  <p>👍 {mediaArticles.find((a) => a.id === selectedArticle)?.reactions}</p>
                </div>
              </>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
}
