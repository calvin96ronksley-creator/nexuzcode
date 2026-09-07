import React, { useState } from 'react';
import { Newspaper, Calendar, Clock, User, Tag, ArrowRight, Share2, Sparkles, Check } from 'lucide-react';
import { MOCK_NEWS, getFormattedCurrentDate } from '../data/mockData';
import { NewsArticle } from '../types';

interface NewsPageProps {
  isDark: boolean;
}

export const NewsPage: React.FC<NewsPageProps> = ({ isDark }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Alle');
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);

  const categories = ['Alle', 'System Core', 'Infrastruktur', 'Community'];

  const filteredNews = selectedCategory === 'Alle'
    ? MOCK_NEWS
    : MOCK_NEWS.filter((n) => n.category === selectedCategory);

  const copyArticleLink = (title: string) => {
    navigator.clipboard.writeText(`https://nexuzcode.de/news/${encodeURIComponent(title)}`);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-8 pb-16">
      
      {/* Header Banner */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-950/20 text-cyan-400 text-xs font-mono">
          <Calendar className="w-3.5 h-3.5" />
          <span>DATUM: {getFormattedCurrentDate()}</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-cyber font-black tracking-wider uppercase">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-fuchsia-400">
            NEXUZ NEWS & LOGS
          </span>
        </h1>

        {/* Required phrase */}
        <div className="p-3 rounded-xl border border-cyan-500/20 bg-cyan-950/10 max-w-xl mx-auto">
          <p className="text-base font-bold text-cyan-300 font-cyber">
            + Hier entsteht eine Internetpräsenz.
          </p>
          <p className="text-xs text-slate-400 mt-0.5">
            Aktuelle Neuigkeiten, Server-Upgrades und Updates rund um nexuzcode.de
          </p>
        </div>
      </div>

      {/* Category Filter Chips */}
      <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
        {categories.map((cat) => (
          <button
            id={`news-category-${cat.toLowerCase().replace(/\s+/g, '-')}`}
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-1.5 rounded-full text-xs font-mono transition-all cursor-pointer ${
              selectedCategory === cat
                ? 'bg-cyan-500/20 border border-cyan-400 text-cyan-300 font-bold shadow-[0_0_12px_rgba(0,243,255,0.3)]'
                : 'border border-slate-800 text-slate-400 hover:border-slate-600 hover:text-slate-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* News Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filteredNews.map((article) => (
          <article
            id={`news-card-${article.id}`}
            key={article.id}
            className={`flex flex-col justify-between p-6 rounded-2xl border transition-all duration-300 group ${
              isDark 
                ? 'bg-[#080d1a] border-slate-800 hover:border-cyan-500/60 hover:shadow-[0_0_20px_rgba(0,243,255,0.2)]' 
                : 'bg-white border-slate-200 hover:border-cyan-400 hover:shadow-lg'
            }`}
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                <span className="px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                  {article.category}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {article.readTime}
                </span>
              </div>

              <h3 className="text-lg font-cyber font-bold text-slate-100 dark:text-white group-hover:text-cyan-400 transition-colors leading-snug">
                {article.title}
              </h3>

              <p className="text-xs text-slate-400 leading-relaxed line-clamp-3">
                {article.excerpt}
              </p>
            </div>

            <div className="pt-5 border-t border-slate-800/80 mt-5 flex items-center justify-between">
              <div className="text-[11px] font-mono text-slate-500">
                <span>{article.date}</span> &bull; <span>{article.author}</span>
              </div>

              <button
                id={`read-article-btn-${article.id}`}
                onClick={() => setSelectedArticle(article)}
                className="text-xs font-mono font-bold text-cyan-400 hover:text-cyan-300 flex items-center gap-1 cursor-pointer"
              >
                <span>Lesen</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </article>
        ))}
      </div>

      {/* Article Detail Modal */}
      {selectedArticle && (
        <div 
          id="article-detail-modal"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={() => setSelectedArticle(null)}
        >
          <div 
            className={`w-full max-w-2xl p-6 sm:p-8 rounded-2xl border transition-all ${
              isDark 
                ? 'bg-[#090f20] border-cyan-500/40 text-slate-100 neon-border-cyan' 
                : 'bg-white border-slate-300 text-slate-900'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b pb-4 border-slate-800">
              <span className="px-2.5 py-1 text-xs font-mono rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                {selectedArticle.category}
              </span>
              <button
                id="close-article-modal-btn"
                onClick={() => setSelectedArticle(null)}
                className="text-xs font-mono px-2 py-1 rounded border border-slate-700 hover:border-cyan-400 text-slate-400 hover:text-white"
              >
                SCHLIEßEN [ESC]
              </button>
            </div>

            <div className="mt-4 space-y-4">
              <h2 className="text-2xl font-cyber font-bold text-cyan-400">
                {selectedArticle.title}
              </h2>

              <div className="flex items-center gap-4 text-xs font-mono text-slate-400">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  {selectedArticle.date}
                </span>
                <span className="flex items-center gap-1">
                  <User className="w-3.5 h-3.5" />
                  {selectedArticle.author}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {selectedArticle.readTime}
                </span>
              </div>

              <div className="p-4 rounded-xl bg-cyan-950/20 border border-cyan-500/20 text-xs font-mono text-cyan-300">
                + Hier entsteht eine Internetpräsenz: Veröffentlichung vom {selectedArticle.date}
              </div>

              <p className="text-sm text-slate-300 dark:text-slate-300 leading-relaxed whitespace-pre-line">
                {selectedArticle.content}
              </p>

              <div className="flex flex-wrap gap-2 pt-2">
                {selectedArticle.tags.map((tag) => (
                  <span key={tag} className="px-2 py-0.5 rounded text-[11px] font-mono bg-slate-800 text-slate-400 border border-slate-700">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between">
              <button
                id="share-article-btn"
                onClick={() => copyArticleLink(selectedArticle.title)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-700 text-xs font-mono text-slate-300 hover:border-cyan-400 hover:text-cyan-300 cursor-pointer"
              >
                {copiedLink ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
                <span>{copiedLink ? 'Link kopiert!' : 'Beitrag teilen'}</span>
              </button>

              <button
                onClick={() => setSelectedArticle(null)}
                className="px-4 py-1.5 rounded-lg bg-cyan-500 text-slate-950 font-mono font-bold text-xs hover:bg-cyan-400 cursor-pointer"
              >
                Fertig
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
