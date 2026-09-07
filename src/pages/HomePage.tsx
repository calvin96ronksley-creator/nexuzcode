import React, { useState, useEffect } from 'react';
import { 
  Terminal as TerminalIcon, 
  ExternalLink, 
  Download, 
  Smartphone, 
  MessageSquare, 
  Cpu, 
  Activity, 
  ShieldCheck, 
  Zap, 
  ArrowRight,
  Server,
  Code2,
  Copy,
  Check
} from 'lucide-react';
import { NavTab } from '../types';
import { SITE_INFO, getFormattedCurrentDate } from '../data/mockData';

interface HomePageProps {
  onNavigate: (tab: NavTab) => void;
  isDark: boolean;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate, isDark }) => {
  const [currentDate, setCurrentDate] = useState(getFormattedCurrentDate());
  const [currentTime, setCurrentTime] = useState('');
  const [terminalInput, setTerminalInput] = useState('');
  const [copiedDomain, setCopiedDomain] = useState(false);
  const [terminalLogs, setTerminalLogs] = useState<Array<{ text: string; type: 'info' | 'success' | 'warn' | 'cyan' }>>([
    { text: '[INIT] NEXUZ-OS v4.9.2 Boot sequence complete', type: 'info' },
    { text: '[SYSTEM] Host: nexuzcode.de | SSL: Active', type: 'cyan' },
    { text: '[CLUSTER] Subsystems online: mirror.nexuzcode.de & board.nexuzcode.de', type: 'success' },
    { text: '[NOTICE] + Hier entsteht eine Internetpräsenz.', type: 'warn' },
    { text: 'Tippe "help" für verfügbare Befehle ein.', type: 'info' },
  ]);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString('de-DE', { hour12: false }));
      setCurrentDate(getFormattedCurrentDate());
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleTerminalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = terminalInput.trim().toLowerCase();
    if (!cmd) return;

    const newLogs = [...terminalLogs, { text: `> ${terminalInput}`, type: 'cyan' as const }];

    switch (cmd) {
      case 'help':
        newLogs.push(
          { text: 'Verfügbare Befehle:', type: 'info' },
          { text: '  date       - Zeigt das heutige Datum und Systemzeit', type: 'info' },
          { text: '  status     - Status aller nexuzcode.de Dienste', type: 'info' },
          { text: '  mirror     - Zeigt Details zu mirror.nexuzcode.de (APK Mirror)', type: 'info' },
          { text: '  board      - Zeigt Details zu board.nexuzcode.de', type: 'info' },
          { text: '  downloads  - Listet verfügbare Downloads auf', type: 'info' },
          { text: '  clear      - Terminal-Ausgabe leeren', type: 'info' }
        );
        break;
      case 'date':
        newLogs.push({ text: `Aktuelles Datum: ${currentDate} | Zeit: ${currentTime} UTC+2`, type: 'success' });
        break;
      case 'status':
        newLogs.push(
          { text: 'nexuzcode.de: ONLINE [100% OK]', type: 'success' },
          { text: 'mirror.nexuzcode.de: ONLINE (APKs bereit)', type: 'success' },
          { text: 'board.nexuzcode.de: ONLINE (Community aktiv)', type: 'success' },
          { text: 'Latenz: 12ms | Cluster: Frankfurt Core', type: 'info' }
        );
        break;
      case 'mirror':
        newLogs.push(
          { text: 'APK Mirror: https://mirror.nexuzcode.de', type: 'cyan' },
          { text: 'Verfügbar: Android Hub, CyberTools, Companion APKs', type: 'info' }
        );
        break;
      case 'board':
        newLogs.push(
          { text: 'Community Board: https://board.nexuzcode.de', type: 'cyan' },
          { text: 'Forensoftware & Support-Kanäle online', type: 'info' }
        );
        break;
      case 'downloads':
        newLogs.push(
          { text: 'Download-Sektion: CLI Toolchain, Theme Packs, FastSync', type: 'info' }
        );
        break;
      case 'clear':
        setTerminalLogs([]);
        setTerminalInput('');
        return;
      default:
        newLogs.push({ text: `Unbekannter Befehl: "${cmd}". Tippe "help" ein.`, type: 'warn' });
        break;
    }

    setTerminalLogs(newLogs);
    setTerminalInput('');
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText('https://nexuzcode.de');
    setCopiedDomain(true);
    setTimeout(() => setCopiedDomain(false), 2000);
  };

  return (
    <div className="space-y-12 pb-16">
      
      {/* Hero Section */}
      <section className="relative pt-6 sm:pt-12 text-center max-w-4xl mx-auto px-4">
        
        {/* Neon Badge with Live Date */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-cyan-500/40 bg-cyan-950/30 text-cyan-300 text-xs font-mono mb-6 shadow-[0_0_15px_rgba(0,243,255,0.2)]">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
          </span>
          <span>HEUTIGES DATUM: {currentDate} &bull; {currentTime || 'LÄUFT'}</span>
        </div>

        {/* Main Display Headline */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-cyber font-black tracking-wider uppercase mb-4">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-200 to-fuchsia-400 neon-glow-cyan">
            NEXUZCODE.DE
          </span>
        </h1>

        {/* Highlighted mandatory slogan */}
        <div className="py-2.5 px-6 rounded-xl border border-cyan-500/30 bg-cyan-950/20 backdrop-blur-md max-w-2xl mx-auto mb-6 shadow-[0_0_25px_rgba(0,243,255,0.15)]">
          <p className="text-xl sm:text-2xl font-bold font-cyber text-cyan-300 tracking-wide">
            + Hier entsteht eine Internetpräsenz.
          </p>
          <p className="text-sm text-slate-300 dark:text-slate-400 mt-1">
            Moderne Entwicklerplattform &bull; Verifizierter APK-Mirror &bull; Community Hub
          </p>
        </div>

        {/* Quick action buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          
          <button
            id="hero-apk-mirror-btn"
            onClick={() => onNavigate('mirrors')}
            className="px-5 py-2.5 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-cyber font-bold text-sm tracking-wider flex items-center gap-2 shadow-[0_0_20px_rgba(0,243,255,0.5)] hover:shadow-[0_0_30px_rgba(0,243,255,0.8)] transition-all transform hover:-translate-y-0.5 cursor-pointer"
          >
            <Smartphone className="w-4 h-4" />
            <span>APK Mirror öffnen</span>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-black/30 text-white font-mono">mirror.nexuzcode.de</span>
          </button>

          <a
            id="hero-board-direct-btn"
            href={SITE_INFO.boardUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 rounded-lg border border-fuchsia-500/60 bg-fuchsia-950/30 hover:bg-fuchsia-900/40 text-fuchsia-300 font-cyber font-semibold text-sm tracking-wider flex items-center gap-2 hover:shadow-[0_0_20px_rgba(217,70,239,0.5)] transition-all transform hover:-translate-y-0.5 cursor-pointer"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Board betreten</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>

          <button
            id="hero-copy-domain-btn"
            onClick={copyToClipboard}
            className="px-4 py-2.5 rounded-lg border border-slate-700 bg-slate-900/60 hover:border-slate-500 text-slate-300 font-mono text-xs flex items-center gap-2 transition-all cursor-pointer"
          >
            {copiedDomain ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-slate-400" />}
            <span>{copiedDomain ? 'Kopiert!' : 'nexuzcode.de'}</span>
          </button>
        </div>
      </section>

      {/* Futuristic Telemetry / Cluster Grid */}
      <section className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          <div className={`p-4 rounded-xl border transition-all ${
            isDark 
              ? 'bg-[#090e1c]/80 border-slate-800 hover:border-cyan-500/50 hover:shadow-[0_0_15px_rgba(0,243,255,0.2)]' 
              : 'bg-white border-slate-200 hover:border-cyan-400'
          }`}>
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase text-slate-400">Hauptdomain</span>
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
            </div>
            <p className="text-lg font-cyber font-bold text-slate-100 dark:text-white mt-1">nexuzcode.de</p>
            <p className="text-xs text-emerald-400 mt-1 font-mono flex items-center gap-1">
              <Check className="w-3 h-3" /> Im Aufbau / Online
            </p>
          </div>

          <div className={`p-4 rounded-xl border transition-all ${
            isDark 
              ? 'bg-[#090e1c]/80 border-slate-800 hover:border-cyan-500/50 hover:shadow-[0_0_15px_rgba(0,243,255,0.2)]' 
              : 'bg-white border-slate-200 hover:border-cyan-400'
          }`}>
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase text-slate-400">APK Mirror</span>
              <span className="px-1.5 py-0.5 text-[10px] font-mono rounded bg-fuchsia-500/20 text-fuchsia-300">CDN</span>
            </div>
            <p className="text-lg font-cyber font-bold text-slate-100 dark:text-white mt-1">mirror.nexuzcode.de</p>
            <p className="text-xs text-cyan-400 mt-1 font-mono flex items-center gap-1">
              <Smartphone className="w-3 h-3" /> Mobile Builds Sync
            </p>
          </div>

          <div className={`p-4 rounded-xl border transition-all ${
            isDark 
              ? 'bg-[#090e1c]/80 border-slate-800 hover:border-cyan-500/50 hover:shadow-[0_0_15px_rgba(0,243,255,0.2)]' 
              : 'bg-white border-slate-200 hover:border-cyan-400'
          }`}>
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase text-slate-400">Community Board</span>
              <span className="px-1.5 py-0.5 text-[10px] font-mono rounded bg-amber-500/20 text-amber-300">Forum</span>
            </div>
            <p className="text-lg font-cyber font-bold text-slate-100 dark:text-white mt-1">board.nexuzcode.de</p>
            <p className="text-xs text-amber-400 mt-1 font-mono flex items-center gap-1">
              <MessageSquare className="w-3 h-3" /> Diskussionsportal
            </p>
          </div>

          <div className={`p-4 rounded-xl border transition-all ${
            isDark 
              ? 'bg-[#090e1c]/80 border-slate-800 hover:border-cyan-500/50 hover:shadow-[0_0_15px_rgba(0,243,255,0.2)]' 
              : 'bg-white border-slate-200 hover:border-cyan-400'
          }`}>
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase text-slate-400">Integrität & Latenz</span>
              <Activity className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
            </div>
            <p className="text-lg font-cyber font-bold text-slate-100 dark:text-white mt-1">{SITE_INFO.latency}</p>
            <p className="text-xs text-slate-400 mt-1 font-mono">
              Cluster: {SITE_INFO.serverCluster}
            </p>
          </div>

        </div>
      </section>

      {/* Feature Showcase Grid */}
      <section className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg sm:text-xl font-cyber font-bold flex items-center gap-2">
            <Zap className="w-5 h-5 text-cyan-400" />
            <span>Bereiche & Services</span>
          </h2>
          <span className="text-xs font-mono text-cyan-400">Systemstatus: Optimal</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card 1: APK Mirror */}
          <div 
            onClick={() => onNavigate('mirrors')}
            className={`group p-6 rounded-2xl border transition-all cursor-pointer relative overflow-hidden ${
              isDark 
                ? 'bg-[#080d1a] border-cyan-500/30 hover:border-cyan-400 hover:shadow-[0_0_25px_rgba(0,243,255,0.25)]' 
                : 'bg-white border-slate-200 hover:border-cyan-400 hover:shadow-lg'
            }`}
          >
            <div className="w-12 h-12 rounded-xl bg-cyan-950/50 border border-cyan-400/40 flex items-center justify-center text-cyan-400 mb-4 group-hover:scale-110 transition-transform">
              <Smartphone className="w-6 h-6" />
            </div>
            <div className="flex items-center gap-2 mb-2">
              <h3 className="text-lg font-cyber font-bold group-hover:text-cyan-400 transition-colors">
                APK Mirror
              </h3>
              <span className="px-2 py-0.5 text-[10px] font-mono rounded bg-cyan-500/20 text-cyan-300">
                mirror.nexuzcode.de
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed mb-4">
              Dedizierter APK-Spiegelserver für mobile Anwendungen, Werkzeuge und Updates. Mit SHA-256 Prüfsummen und Direktdownloads.
            </p>
            <div className="flex items-center text-xs font-mono font-semibold text-cyan-400 group-hover:translate-x-1 transition-transform">
              <span>Mirror durchsuchen</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </div>
          </div>

          {/* Card 2: Community Board */}
          <div 
            onClick={() => onNavigate('board')}
            className={`group p-6 rounded-2xl border transition-all cursor-pointer relative overflow-hidden ${
              isDark 
                ? 'bg-[#080d1a] border-purple-500/30 hover:border-fuchsia-400 hover:shadow-[0_0_25px_rgba(217,70,239,0.25)]' 
                : 'bg-white border-slate-200 hover:border-fuchsia-400 hover:shadow-lg'
            }`}
          >
            <div className="w-12 h-12 rounded-xl bg-purple-950/50 border border-purple-400/40 flex items-center justify-center text-fuchsia-400 mb-4 group-hover:scale-110 transition-transform">
              <MessageSquare className="w-6 h-6" />
            </div>
            <div className="flex items-center gap-2 mb-2">
              <h3 className="text-lg font-cyber font-bold group-hover:text-fuchsia-400 transition-colors">
                Community Board
              </h3>
              <span className="px-2 py-0.5 text-[10px] font-mono rounded bg-fuchsia-500/20 text-fuchsia-300">
                board.nexuzcode.de
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed mb-4">
              Diskussionsforum für Software, Entwicklung, Scripting und Mirror-Support. Direkte Anbindung an das offizielle Forum.
            </p>
            <div className="flex items-center text-xs font-mono font-semibold text-fuchsia-400 group-hover:translate-x-1 transition-transform">
              <span>Zum Board-Portal</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </div>
          </div>

          {/* Card 3: Downloads & Tools */}
          <div 
            onClick={() => onNavigate('downloads')}
            className={`group p-6 rounded-2xl border transition-all cursor-pointer relative overflow-hidden ${
              isDark 
                ? 'bg-[#080d1a] border-emerald-500/30 hover:border-emerald-400 hover:shadow-[0_0_25px_rgba(16,185,129,0.25)]' 
                : 'bg-white border-slate-200 hover:border-emerald-400 hover:shadow-lg'
            }`}
          >
            <div className="w-12 h-12 rounded-xl bg-emerald-950/50 border border-emerald-400/40 flex items-center justify-center text-emerald-400 mb-4 group-hover:scale-110 transition-transform">
              <Download className="w-6 h-6" />
            </div>
            <div className="flex items-center gap-2 mb-2">
              <h3 className="text-lg font-cyber font-bold group-hover:text-emerald-400 transition-colors">
                Download-Center
              </h3>
              <span className="px-2 py-0.5 text-[10px] font-mono rounded bg-emerald-500/20 text-emerald-300">
                Tools & CLI
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed mb-4">
              Offizielle CLI-Utilities, Desktop-Clients, Terminal-Themes und Hash-Prüfprogramme für Entwickler und Power-User.
            </p>
            <div className="flex items-center text-xs font-mono font-semibold text-emerald-400 group-hover:translate-x-1 transition-transform">
              <span>Pakete ansehen</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </div>
          </div>

        </div>
      </section>

      {/* Interactive Cyber Terminal Widget */}
      <section className="max-w-4xl mx-auto px-4">
        <div className={`rounded-xl border overflow-hidden shadow-2xl transition-all ${
          isDark 
            ? 'bg-[#060a14] border-cyan-500/40 neon-border-cyan' 
            : 'bg-slate-900 border-slate-700 text-slate-100'
        }`}>
          {/* Terminal Window Header */}
          <div className="flex items-center justify-between px-4 py-2.5 bg-black/60 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-rose-500" />
              <div className="w-3 h-3 rounded-full bg-amber-500" />
              <div className="w-3 h-3 rounded-full bg-emerald-500" />
              <span className="ml-2 text-xs font-mono text-slate-400 flex items-center gap-1.5">
                <TerminalIcon className="w-3.5 h-3.5 text-cyan-400" />
                nexuz-console@nexuzcode.de:~
              </span>
            </div>
            <div className="text-[11px] font-mono text-slate-500">
              Bash 5.2 &bull; Interactive
            </div>
          </div>

          {/* Terminal Log Screen */}
          <div className="p-4 font-mono text-xs space-y-1.5 max-h-56 overflow-y-auto">
            {terminalLogs.map((log, index) => {
              let color = 'text-slate-300';
              if (log.type === 'cyan') color = 'text-cyan-400';
              if (log.type === 'success') color = 'text-emerald-400';
              if (log.type === 'warn') color = 'text-amber-400';
              return (
                <div key={index} className={`leading-relaxed ${color}`}>
                  {log.text}
                </div>
              );
            })}
          </div>

          {/* Terminal Command Input */}
          <form 
            onSubmit={handleTerminalSubmit}
            className="flex items-center gap-2 px-4 py-2.5 bg-black/40 border-t border-slate-800 font-mono text-xs"
          >
            <span className="text-cyan-400 font-bold">root@nexuzcode.de:~$</span>
            <input
              id="terminal-interactive-input"
              type="text"
              value={terminalInput}
              onChange={(e) => setTerminalInput(e.target.value)}
              placeholder="Befehl eingeben (z.B. help, status, mirror, board)..."
              className="w-full bg-transparent text-slate-100 outline-none placeholder:text-slate-600"
            />
            <button 
              id="terminal-execute-btn"
              type="submit" 
              className="px-2 py-0.5 text-[11px] rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 hover:bg-cyan-500/40"
            >
              RUN
            </button>
          </form>
        </div>
      </section>

    </div>
  );
};
