import React, { useState } from 'react';
import { 
  MessageSquare, 
  ExternalLink, 
  Users, 
  MessageCircle, 
  Pin, 
  Radio, 
  ShieldCheck, 
  Copy, 
  Check, 
  ArrowUpRight,
  Lock,
  Sparkles
} from 'lucide-react';
import { MOCK_BOARD_TOPICS, BOARD_CATEGORIES, SITE_INFO } from '../data/mockData';

interface BoardPageProps {
  isDark: boolean;
}

export const BoardPage: React.FC<BoardPageProps> = ({ isDark }) => {
  const [copiedUrl, setCopiedUrl] = useState(false);
  const [activeTab, setActiveTab] = useState<'topics' | 'categories'>('topics');

  const copyBoardUrl = () => {
    navigator.clipboard.writeText(SITE_INFO.boardUrl);
    setCopiedUrl(true);
    setTimeout(() => setCopiedUrl(false), 2000);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-8 pb-16">
      
      {/* Board Hub Header */}
      <div className={`p-6 sm:p-8 rounded-2xl border transition-all ${
        isDark 
          ? 'bg-gradient-to-b from-[#0e1428] to-[#080d1a] border-purple-500/30 neon-border-purple' 
          : 'bg-gradient-to-b from-purple-50 to-white border-purple-200 shadow-md'
      }`}>
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-purple-500/40 bg-purple-950/30 text-fuchsia-300 text-xs font-mono">
              <Radio className="w-3.5 h-3.5 text-fuchsia-400 animate-pulse" />
              <span>COMMUNITY GATEWAY &bull; BOARD.NEXUZCODE.DE</span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-cyber font-black tracking-wider uppercase text-slate-100 dark:text-white">
              NEXUZCODE BOARD
            </h1>

            <p className="text-sm text-slate-400 max-w-xl">
              Das offizielle Diskussionsforum unter <strong className="text-fuchsia-300 font-mono">board.nexuzcode.de</strong> für Entwickler, Reverse-Engineering, APK-Verteilung und Support.
            </p>
          </div>

          {/* Primary CTA: Launch board.nexuzcode.de */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto">
            <a
              id="launch-board-external-btn"
              href={SITE_INFO.boardUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-fuchsia-600 via-purple-600 to-indigo-600 hover:from-fuchsia-500 hover:to-indigo-500 text-white font-cyber font-bold text-sm tracking-wider flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(217,70,239,0.5)] hover:shadow-[0_0_35px_rgba(217,70,239,0.8)] transition-all transform hover:-translate-y-0.5 cursor-pointer text-center"
            >
              <span>board.nexuzcode.de öffnen</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>

            <button
              id="copy-board-url-btn"
              onClick={copyBoardUrl}
              className="px-4 py-3 rounded-xl border border-slate-700 bg-slate-900/60 hover:border-slate-500 text-slate-300 font-mono text-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
              title="Link kopieren"
            >
              {copiedUrl ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-slate-400" />}
              <span>{copiedUrl ? 'Kopiert!' : 'Link kopieren'}</span>
            </button>
          </div>
        </div>

        {/* Live Forum Stats Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-slate-800/80 text-xs font-mono">
          <div className="p-2.5 rounded-lg bg-slate-900/50 border border-slate-800">
            <span className="text-slate-500 block">Host-Status</span>
            <span className="text-emerald-400 font-semibold flex items-center gap-1 mt-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              ONLINE [HTTP 200]
            </span>
          </div>

          <div className="p-2.5 rounded-lg bg-slate-900/50 border border-slate-800">
            <span className="text-slate-500 block">Mitglieder</span>
            <span className="text-slate-200 font-semibold mt-0.5 block">2.840 Registriert</span>
          </div>

          <div className="p-2.5 rounded-lg bg-slate-900/50 border border-slate-800">
            <span className="text-slate-500 block">Beiträge gesamt</span>
            <span className="text-slate-200 font-semibold mt-0.5 block">19.420 Posts</span>
          </div>

          <div className="p-2.5 rounded-lg bg-slate-900/50 border border-slate-800">
            <span className="text-slate-500 block">Verschlüsselung</span>
            <span className="text-cyan-400 font-semibold flex items-center gap-1 mt-0.5">
              <ShieldCheck className="w-3 h-3" /> TLS 1.3 Aktiv
            </span>
          </div>
        </div>
      </div>

      {/* Tabs: Latest Topics vs Categories */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <button
            id="board-tab-topics"
            onClick={() => setActiveTab('topics')}
            className={`px-4 py-2 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
              activeTab === 'topics'
                ? 'bg-purple-500/20 text-fuchsia-300 border border-purple-500/40 shadow-[0_0_10px_rgba(217,70,239,0.3)]'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Aktuelle Themen & Threads
          </button>
          <button
            id="board-tab-categories"
            onClick={() => setActiveTab('categories')}
            className={`px-4 py-2 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
              activeTab === 'categories'
                ? 'bg-purple-500/20 text-fuchsia-300 border border-purple-500/40 shadow-[0_0_10px_rgba(217,70,239,0.3)]'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Foren-Kategorien
          </button>
        </div>

        <a
          id="direct-board-link-tag"
          href={SITE_INFO.boardUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs font-mono text-fuchsia-400 hover:underline flex items-center gap-1"
        >
          <span>board.nexuzcode.de</span>
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>

      {/* Topics List */}
      {activeTab === 'topics' && (
        <div className="space-y-3">
          {MOCK_BOARD_TOPICS.map((topic) => (
            <div
              id={`board-topic-${topic.id}`}
              key={topic.id}
              className={`p-4 sm:p-5 rounded-xl border transition-all duration-200 group flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                isDark 
                  ? 'bg-[#080d1a] border-slate-800/90 hover:border-purple-500/60 hover:bg-[#0c1326]' 
                  : 'bg-white border-slate-200 hover:border-purple-400 hover:shadow-md'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className={`p-2 rounded-lg border mt-0.5 ${
                  topic.pinned
                    ? 'bg-amber-500/10 border-amber-500/30 text-amber-400'
                    : 'bg-purple-950/40 border-purple-500/30 text-fuchsia-400'
                }`}>
                  {topic.pinned ? <Pin className="w-4 h-4" /> : <MessageCircle className="w-4 h-4" />}
                </div>

                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-sm sm:text-base font-semibold text-slate-100 dark:text-white group-hover:text-fuchsia-300 transition-colors">
                      {topic.title}
                    </h3>
                    <span className="px-2 py-0.5 text-[10px] font-mono rounded bg-slate-800 text-slate-400 border border-slate-700">
                      {topic.category}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 mt-1.5 text-xs font-mono text-slate-500">
                    <span className="text-slate-400">{topic.author}</span>
                    <span className="text-[10px] px-1.5 py-0.2 rounded bg-purple-900/30 text-fuchsia-300 border border-purple-500/20">
                      {topic.authorBadge}
                    </span>
                    <span>&bull;</span>
                    <span>Letzte Aktivität: {topic.lastActivity}</span>
                  </div>
                </div>
              </div>

              {/* Counts & direct jump */}
              <div className="flex items-center justify-between sm:justify-end gap-6 text-xs font-mono text-slate-400 shrink-0 border-t sm:border-t-0 pt-2 sm:pt-0 border-slate-800">
                <div className="text-right">
                  <div className="text-slate-200 font-bold">{topic.replies} Antworten</div>
                  <div className="text-slate-500 text-[11px]">{topic.views} Klicks</div>
                </div>

                <a
                  href={SITE_INFO.boardUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-lg border border-purple-500/30 hover:bg-purple-500/20 text-fuchsia-300 transition-all flex items-center gap-1 cursor-pointer"
                >
                  <span>Ansehen</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Categories View */}
      {activeTab === 'categories' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {BOARD_CATEGORIES.map((cat, idx) => (
            <div
              key={idx}
              className={`p-5 rounded-xl border transition-all ${
                isDark 
                  ? 'bg-[#080d1a] border-slate-800 hover:border-purple-500/60' 
                  : 'bg-white border-slate-200 hover:border-purple-400 shadow-sm'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-cyber font-bold text-base text-slate-100 dark:text-white">
                  {cat.name}
                </h3>
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-purple-950/40 text-fuchsia-300 border border-purple-500/30">
                  {cat.count} Themen
                </span>
              </div>
              <p className="text-xs text-slate-400 mb-4">
                {cat.desc}
              </p>
              <a
                href={SITE_INFO.boardUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-mono text-fuchsia-400 hover:text-fuchsia-300 flex items-center gap-1"
              >
                <span>Kategorie auf board.nexuzcode.de öffnen</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          ))}
        </div>
      )}

      {/* Security & Access Notice */}
      <div className="p-4 rounded-xl border border-slate-800 bg-slate-900/40 text-xs font-mono text-slate-400 flex items-start gap-3">
        <Lock className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
        <div>
          <span className="text-slate-200 font-semibold">Hinweis zur Board-Verbindung:</span> Die Community-Plattform wird direkt unter <a href={SITE_INFO.boardUrl} className="text-cyan-400 hover:underline">board.nexuzcode.de</a> bereitgestellt. Der Zugriff erfolgt mit verschlüsselter SSL/TLS-Sitzung.
        </div>
      </div>

    </div>
  );
};
