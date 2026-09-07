import React, { useState, useEffect, useRef } from 'react';
import { Search, X, ExternalLink, ArrowRight, FileText, Download, Smartphone, MessageSquare, Terminal } from 'lucide-react';
import { NavTab, SearchResultItem } from '../types';
import { MOCK_NEWS, MOCK_DOWNLOADS, MOCK_APK_MIRRORS, MOCK_BOARD_TOPICS, SITE_INFO } from '../data/mockData';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (tab: NavTab) => void;
  isDark: boolean;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose, onNavigate, isDark }) => {
  const [query, setQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<'all' | 'news' | 'downloads' | 'mirrors' | 'board'>('all');
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Build searchable items
  const allItems: SearchResultItem[] = [
    // Pages / Hubs
    {
      id: 'nav-home',
      title: 'Home / Terminal Hub',
      description: 'Zentrale Übersicht, Systemstatus und Informationen zu nexuzcode.de',
      category: 'Navigation',
      tab: 'home',
      badge: 'Hauptseite'
    },
    {
      id: 'nav-board',
      title: 'Community Board (board.nexuzcode.de)',
      description: 'Diskussionsforum, Entwickler-Logs & Support auf board.nexuzcode.de',
      category: 'Board',
      tab: 'board',
      badge: 'board.nexuzcode.de',
      url: SITE_INFO.boardUrl
    },
    {
      id: 'nav-mirrors',
      title: 'APK Mirror Service (mirror.nexuzcode.de)',
      description: 'Direkter APK-Download-Mirror für mobile Pakete und Android Builds',
      category: 'Mirrors',
      tab: 'mirrors',
      badge: 'mirror.nexuzcode.de',
      url: SITE_INFO.mirrorUrl
    },
    // News
    ...MOCK_NEWS.map((n) => ({
      id: n.id,
      title: n.title,
      description: n.excerpt,
      category: 'News',
      tab: 'news' as NavTab,
      badge: n.date
    })),
    // Downloads
    ...MOCK_DOWNLOADS.map((d) => ({
      id: d.id,
      title: `${d.name} (${d.version})`,
      description: d.description,
      category: 'Downloads',
      tab: 'downloads' as NavTab,
      badge: d.size
    })),
    // APK Mirrors
    ...MOCK_APK_MIRRORS.map((m) => ({
      id: m.id,
      title: `${m.appName} APK (${m.version})`,
      description: `Package: ${m.packageName} | Arch: ${m.arch} | SHA256 verified`,
      category: 'Mirrors',
      tab: 'mirrors' as NavTab,
      badge: 'APK'
    })),
    // Board
    ...MOCK_BOARD_TOPICS.map((b) => ({
      id: b.id,
      title: b.title,
      description: `Bereich: ${b.category} • ${b.replies} Antworten • Autor: ${b.author}`,
      category: 'Board',
      tab: 'board' as NavTab,
      badge: 'board.nexuzcode.de'
    }))
  ];

  const filteredItems = allItems.filter((item) => {
    const matchesFilter =
      activeFilter === 'all' ||
      (activeFilter === 'news' && item.category === 'News') ||
      (activeFilter === 'downloads' && item.category === 'Downloads') ||
      (activeFilter === 'mirrors' && item.category === 'Mirrors') ||
      (activeFilter === 'board' && item.category === 'Board');

    const matchesQuery =
      query.trim() === '' ||
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.description.toLowerCase().includes(query.toLowerCase()) ||
      item.category.toLowerCase().includes(query.toLowerCase()) ||
      (item.badge && item.badge.toLowerCase().includes(query.toLowerCase()));

    return matchesFilter && matchesQuery;
  });

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'News':
        return <FileText className="w-4 h-4 text-cyan-400" />;
      case 'Downloads':
        return <Download className="w-4 h-4 text-emerald-400" />;
      case 'Mirrors':
        return <Smartphone className="w-4 h-4 text-fuchsia-400" />;
      case 'Board':
        return <MessageSquare className="w-4 h-4 text-amber-400" />;
      default:
        return <Terminal className="w-4 h-4 text-cyan-400" />;
    }
  };

  return (
    <div 
      id="search-modal-backdrop" 
      className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        id="search-modal-container"
        className={`w-full max-w-2xl rounded-xl border p-5 shadow-2xl transition-all ${
          isDark 
            ? 'bg-[#080d1a]/95 border-cyan-500/40 text-slate-100 neon-border-cyan' 
            : 'bg-white/95 border-slate-300 text-slate-900 shadow-cyan-900/10'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header & Input */}
        <div className="flex items-center gap-3 border-b pb-4 border-cyan-500/20">
          <Search className="w-6 h-6 text-cyan-400 shrink-0" />
          <input
            id="search-input-field"
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Suche nach News, APKs, Downloads, Board-Themen..."
            className="w-full bg-transparent text-lg font-medium outline-none placeholder:text-slate-500"
          />
          {query && (
            <button
              id="search-clear-btn"
              onClick={() => setQuery('')}
              className="p-1 rounded hover:bg-slate-700/50 text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            id="search-close-btn"
            onClick={onClose}
            className="px-2 py-1 text-xs uppercase tracking-wider font-mono border border-slate-700 rounded text-slate-400 hover:border-cyan-400 hover:text-cyan-400 transition-colors"
          >
            ESC
          </button>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap gap-2 pt-3 pb-2 text-xs">
          {[
            { id: 'all', label: 'Alle' },
            { id: 'mirrors', label: 'APK Mirrors (mirror.nexuzcode.de)' },
            { id: 'board', label: 'Board (board.nexuzcode.de)' },
            { id: 'downloads', label: 'Downloads' },
            { id: 'news', label: 'News' }
          ].map((tab) => (
            <button
              id={`search-filter-${tab.id}`}
              key={tab.id}
              onClick={() => setActiveFilter(tab.id as any)}
              className={`px-3 py-1 rounded-full border transition-all cursor-pointer whitespace-nowrap ${
                activeFilter === tab.id
                  ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 font-semibold shadow-[0_0_10px_rgba(0,243,255,0.3)]'
                  : 'border-slate-700/60 text-slate-400 hover:border-slate-500 hover:text-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Results List */}
        <div className="max-h-[380px] overflow-y-auto mt-2 pr-1 space-y-2">
          {filteredItems.length === 0 ? (
            <div className="py-12 text-center text-slate-500">
              <p className="text-base font-semibold">Keine Übereinstimmungen gefunden</p>
              <p className="text-xs mt-1">Versuche Begriffe wie &apos;APK&apos;, &apos;Mirror&apos;, &apos;Board&apos;, &apos;Tools&apos; oder &apos;Nexuz&apos;</p>
            </div>
          ) : (
            filteredItems.map((item) => (
              <div
                id={`search-result-${item.id}`}
                key={item.id}
                onClick={() => {
                  onNavigate(item.tab);
                  onClose();
                }}
                className={`group flex items-start justify-between gap-3 p-3 rounded-lg border transition-all cursor-pointer ${
                  isDark
                    ? 'border-slate-800/80 hover:border-cyan-400/60 hover:bg-cyan-950/20 hover:shadow-[0_0_15px_rgba(0,243,255,0.15)]'
                    : 'border-slate-200 hover:border-cyan-500/60 hover:bg-cyan-50/60'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded bg-slate-800/50 border border-slate-700/50 mt-0.5 group-hover:border-cyan-400/50 transition-colors">
                    {getCategoryIcon(item.category)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-sm group-hover:text-cyan-400 transition-colors">
                        {item.title}
                      </span>
                      {item.badge && (
                        <span className="px-1.5 py-0.5 text-[10px] uppercase font-mono rounded bg-slate-800 text-cyan-300 border border-cyan-500/30">
                          {item.badge}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                      {item.description}
                    </p>
                  </div>
                </div>

                <div className="shrink-0 flex items-center gap-1 text-slate-500 group-hover:text-cyan-400 transition-colors text-xs font-mono">
                  <span>Öffnen</span>
                  {item.url ? <ExternalLink className="w-3.5 h-3.5" /> : <ArrowRight className="w-3.5 h-3.5" />}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer info */}
        <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-500 font-mono">
          <span>Tipp: Drücke <kbd className="px-1.5 py-0.5 bg-slate-800 rounded text-slate-300 border border-slate-700">/</kbd> überall um zu suchen</span>
          <span>nexuzcode.de Engine</span>
        </div>
      </div>
    </div>
  );
};
