import React from 'react';
import { ExternalLink, Terminal, Shield, Wifi, Heart, Layers } from 'lucide-react';
import { SITE_INFO, getFormattedCurrentDate } from '../data/mockData';
import { NavTab } from '../types';

interface FooterProps {
  onNavigate: (tab: NavTab) => void;
  isDark: boolean;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, isDark }) => {
  const currentDate = getFormattedCurrentDate();

  return (
    <footer 
      id="main-footer"
      className={`border-t transition-colors duration-300 relative z-10 ${
        isDark
          ? 'bg-[#04060d] border-slate-800/80 text-slate-400'
          : 'bg-slate-100 border-slate-300 text-slate-600'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand & Slogan */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded bg-cyan-950/40 border border-cyan-500/40 text-cyan-400">
                <Terminal className="w-4 h-4" />
              </div>
              <span className="font-cyber font-bold text-lg text-slate-100 dark:text-white">
                NEXUZCODE.DE
              </span>
            </div>
            
            {/* Required prominent slogan */}
            <p className="text-sm font-semibold text-cyan-400 dark:text-cyan-300 tracking-wide">
              + Hier entsteht eine Internetpräsenz.
            </p>
            
            <p className="text-xs text-slate-400 max-w-md leading-relaxed">
              Zentrale Plattform für Software-Downloads, verifizierte APK-Spiegelungen auf{' '}
              <a href={SITE_INFO.mirrorUrl} target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline">
                mirror.nexuzcode.de
              </a>{' '}
              und Entwickler-Austausch im Community-Board auf{' '}
              <a href={SITE_INFO.boardUrl} target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline">
                board.nexuzcode.de
              </a>.
            </p>

            {/* Current Date & System Time Banner */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-cyan-500/20 bg-cyan-950/20 text-xs font-mono text-cyan-300">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              <span>System-Datum: {currentDate}</span>
            </div>
          </div>

          {/* Direct Navigation Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-200">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button 
                  id="footer-nav-home"
                  onClick={() => onNavigate('home')} 
                  className="hover:text-cyan-400 transition-colors cursor-pointer"
                >
                  Home / Status
                </button>
              </li>
              <li>
                <button 
                  id="footer-nav-news"
                  onClick={() => onNavigate('news')} 
                  className="hover:text-cyan-400 transition-colors cursor-pointer"
                >
                  News & Changelogs
                </button>
              </li>
              <li>
                <button 
                  id="footer-nav-downloads"
                  onClick={() => onNavigate('downloads')} 
                  className="hover:text-cyan-400 transition-colors cursor-pointer"
                >
                  Download-Center
                </button>
              </li>
              <li>
                <button 
                  id="footer-nav-mirrors"
                  onClick={() => onNavigate('mirrors')} 
                  className="text-fuchsia-400 hover:text-fuchsia-300 transition-colors cursor-pointer flex items-center gap-1"
                >
                  <span>APK Mirror Hub</span>
                  <span className="text-[10px] px-1 py-0.2 rounded bg-fuchsia-500/20">Aktiv</span>
                </button>
              </li>
            </ul>
          </div>

          {/* External Cluster Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-200">
              Nexus-Netzwerk
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a 
                  id="footer-link-board"
                  href={SITE_INFO.boardUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-cyan-400 hover:text-cyan-300 transition-colors flex items-center gap-1.5"
                >
                  <span>board.nexuzcode.de</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a 
                  id="footer-link-mirror"
                  href={SITE_INFO.mirrorUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-cyan-400 hover:text-cyan-300 transition-colors flex items-center gap-1.5"
                >
                  <span>mirror.nexuzcode.de</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <div className="flex items-center gap-2 pt-2 text-[11px] font-mono text-slate-400">
                  <Wifi className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Latenz: {SITE_INFO.latency}</span>
                </div>
              </li>
              <li>
                <div className="flex items-center gap-2 text-[11px] font-mono text-slate-400">
                  <Shield className="w-3.5 h-3.5 text-cyan-400" />
                  <span>{SITE_INFO.encryption}</span>
                </div>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="mt-10 pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-400">
          <div>
            &copy; {new Date().getFullYear()} nexuzcode.de &bull; Alle Rechte vorbehalten.
          </div>
          <div className="flex items-center gap-4">
            <span className="text-slate-400 hover:text-cyan-400 cursor-pointer">Datenschutz</span>
            <span>&bull;</span>
            <span className="text-slate-400 hover:text-cyan-400 cursor-pointer">Impressum</span>
            <span>&bull;</span>
            <span className="text-slate-400 hover:text-cyan-400 cursor-pointer">Status-Monitor</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
