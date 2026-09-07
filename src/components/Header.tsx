import React, { useState } from 'react';
import { NavTab, ThemeMode } from '../types';
import { 
  Sun, 
  Moon, 
  Search, 
  Menu, 
  X, 
  ExternalLink, 
  Terminal, 
  Radio, 
  Cpu, 
  ShieldCheck,
  Flame
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { SITE_INFO } from '../data/mockData';

interface HeaderProps {
  currentTab: NavTab;
  onTabChange: (tab: NavTab) => void;
  theme: ThemeMode;
  onToggleTheme: () => void;
  onOpenSearch: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  onTabChange,
  theme,
  onToggleTheme,
  onOpenSearch,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { id: NavTab; label: string; badge?: string; externalHint?: string }[] = [
    { id: 'home', label: 'Home' },
    { id: 'news', label: 'News', badge: 'Live' },
    { id: 'board', label: 'Board', externalHint: 'board.nexuzcode.de' },
    { id: 'downloads', label: 'Downloads' },
    { id: 'mirrors', label: 'Mirrors', badge: 'APK' },
  ];

  const handleNavClick = (tabId: NavTab) => {
    onTabChange(tabId);
    setMobileMenuOpen(false);
  };

  const isDark = theme === 'dark';

  return (
    <header 
      id="main-header"
      className={`sticky top-0 z-40 w-full backdrop-blur-xl border-b transition-colors duration-300 ${
        isDark
          ? 'bg-[#050811]/90 border-cyan-500/20 text-slate-100 shadow-[0_4px_30px_rgba(0,243,255,0.05)]'
          : 'bg-white/90 border-slate-200 text-slate-900 shadow-sm'
      }`}
    >
      {/* Top micro status bar */}
      <div 
        id="header-ticker-bar"
        className={`hidden md:flex items-center justify-between px-6 py-1 text-[11px] font-mono tracking-wider border-b ${
          isDark 
            ? 'bg-[#03050a]/80 border-slate-800/80 text-cyan-400/80' 
            : 'bg-slate-100 border-slate-200 text-slate-600'
        }`}
      >
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
            </span>
            <span className="text-[10px] uppercase font-semibold">nexuzcode.de Network</span>
          </div>
          <span className="text-slate-600 dark:text-slate-500">|</span>
          <span className="text-slate-400">Node: FRA-01 (Online)</span>
          <span className="text-slate-600 dark:text-slate-500">|</span>
          <span className="text-emerald-400 flex items-center gap-1">
            <ShieldCheck className="w-3 h-3" /> SSL / TLS Verified
          </span>
        </div>

        <div className="flex items-center gap-4">
          <a 
            href={SITE_INFO.boardUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:text-cyan-300 transition-colors flex items-center gap-1"
          >
            <span>board.nexuzcode.de</span>
            <ExternalLink className="w-3 h-3" />
          </a>
          <span className="text-slate-600 dark:text-slate-500">|</span>
          <a 
            href={SITE_INFO.mirrorUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:text-cyan-300 transition-colors flex items-center gap-1 text-fuchsia-400 hover:text-fuchsia-300"
          >
            <span>mirror.nexuzcode.de (APK)</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>

      {/* Main navigation container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        
        {/* Logo / Brand */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            id="brand-logo-btn"
            onClick={() => handleNavClick('home')}
            className="group flex items-center gap-2.5 focus:outline-none cursor-pointer"
          >
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center border transition-all duration-300 ${
              isDark 
                ? 'bg-cyan-950/40 border-cyan-500/50 group-hover:border-cyan-400 group-hover:shadow-[0_0_15px_rgba(0,243,255,0.6)]' 
                : 'bg-cyan-50 border-cyan-300 group-hover:border-cyan-500 group-hover:shadow-md'
            }`}>
              <Terminal className="w-5 h-5 text-cyan-400 group-hover:scale-110 transition-transform" />
            </div>

            <div className="text-left">
              <div className="flex items-center gap-1.5">
                <span className="font-cyber font-black tracking-widest text-lg sm:text-xl text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-fuchsia-400">
                  NEXUZ
                </span>
                <span className="font-cyber font-bold text-lg sm:text-xl text-slate-100 dark:text-white">
                  CODE
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#00f3ff] animate-pulse" />
              </div>
              <span className="block text-[10px] font-mono tracking-wider text-slate-400 -mt-1 group-hover:text-cyan-400 transition-colors">
                nexuzcode.de
              </span>
            </div>
          </button>
        </div>

        {/* Center Horizontal Menu Bar (Requirement: Oben zentriert horizontal angeordnet) */}
        <nav 
          id="centered-navbar"
          aria-label="Hauptnavigation"
          className="hidden md:flex items-center justify-center absolute left-1/2 -translate-x-1/2"
        >
          <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border transition-all duration-300 ${
            isDark 
              ? 'bg-[#0a0f1d]/90 border-slate-800 shadow-[0_0_20px_rgba(0,0,0,0.5)]' 
              : 'bg-slate-100/90 border-slate-300/80 shadow-inner'
          }`}>
            {navItems.map((item) => {
              const isActive = currentTab === item.id;
              return (
                <button
                  id={`nav-item-${item.id}`}
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`relative px-4 py-2 rounded-full font-medium text-sm tracking-wide transition-all duration-200 cursor-pointer flex items-center gap-1.5 ${
                    isActive
                      ? isDark
                        ? 'text-cyan-300 font-semibold shadow-[0_0_15px_rgba(0,243,255,0.4)]'
                        : 'text-cyan-700 font-semibold'
                      : isDark
                        ? 'text-slate-400 hover:text-cyan-300 hover:bg-slate-800/40'
                        : 'text-slate-600 hover:text-cyan-600 hover:bg-white/60'
                  }`}
                >
                  {/* Animated Active Pill Indicator */}
                  {isActive && (
                    <motion.div
                      layoutId="activePill"
                      className={`absolute inset-0 rounded-full -z-10 ${
                        isDark 
                          ? 'bg-gradient-to-r from-cyan-950/80 via-cyan-900/60 to-purple-950/80 border border-cyan-400/60' 
                          : 'bg-white border border-cyan-400/40 shadow-sm'
                      }`}
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}

                  <span>{item.label}</span>

                  {item.badge && (
                    <span className={`px-1.5 py-0.2 text-[9px] font-mono rounded-full font-bold uppercase ${
                      item.badge === 'Live'
                        ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/40'
                        : 'bg-fuchsia-500/20 text-fuchsia-300 border border-fuchsia-400/40'
                    }`}>
                      {item.badge}
                    </span>
                  )}

                  {item.externalHint && (
                    <ExternalLink className="w-3 h-3 opacity-60 ml-0.5" />
                  )}
                </button>
              );
            })}
          </div>
        </nav>

        {/* Right Header Actions: Search Button & Dark Mode Switch */}
        <div className="flex items-center gap-2.5">
          {/* Intuitively designed Search Bar Trigger in Header */}
          <button
            id="header-search-btn"
            onClick={onOpenSearch}
            className={`flex items-center gap-2.5 px-3 py-1.5 rounded-full border transition-all duration-200 cursor-pointer ${
              isDark
                ? 'bg-slate-900/80 border-slate-700/80 hover:border-cyan-400/70 hover:shadow-[0_0_12px_rgba(0,243,255,0.3)] text-slate-300'
                : 'bg-slate-100 border-slate-300 hover:border-cyan-500 hover:bg-white text-slate-700'
            }`}
            title="Suche öffnen (Taste / oder Strg+K)"
          >
            <Search className="w-4 h-4 text-cyan-400" />
            <span className="hidden sm:inline text-xs font-mono text-slate-400">
              Suchen...
            </span>
            <kbd className={`hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-mono rounded border ${
              isDark ? 'bg-slate-800 border-slate-700 text-slate-400' : 'bg-white border-slate-300 text-slate-500'
            }`}>
              Ctrl+K
            </kbd>
          </button>

          {/* Global Dark-Mode-Switch */}
          <button
            id="theme-toggle-btn"
            onClick={onToggleTheme}
            aria-label="Design umschalten (Dark / Light)"
            className={`p-2 rounded-full border transition-all duration-300 cursor-pointer relative overflow-hidden group ${
              isDark
                ? 'bg-slate-900/90 border-cyan-500/40 text-amber-300 hover:border-cyan-300 hover:shadow-[0_0_15px_rgba(0,243,255,0.5)]'
                : 'bg-slate-100 border-slate-300 text-slate-700 hover:border-cyan-500 hover:bg-white shadow-sm'
            }`}
          >
            {isDark ? (
              <Sun className="w-5 h-5 transition-transform duration-300 group-hover:rotate-90 text-amber-400" />
            ) : (
              <Moon className="w-5 h-5 transition-transform duration-300 group-hover:-rotate-45 text-cyan-600" />
            )}
            <span className="sr-only">Toggle dark mode</span>
          </button>

          {/* Mobile menu toggle button */}
          <button
            id="mobile-menu-toggle-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`md:hidden p-2 rounded-lg border transition-colors ${
              isDark
                ? 'border-slate-800 text-slate-300 hover:text-cyan-400 hover:border-cyan-500'
                : 'border-slate-300 text-slate-700 hover:text-cyan-600 hover:border-cyan-400'
            }`}
            aria-label="Navigation öffnen"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id="mobile-nav-drawer"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className={`md:hidden border-b px-4 py-4 space-y-2 transition-colors ${
              isDark ? 'bg-[#070b16] border-cyan-500/30' : 'bg-slate-50 border-slate-200'
            }`}
          >
            <div className="pb-2">
              <button
                id="mobile-search-trigger"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenSearch();
                }}
                className={`w-full flex items-center justify-between px-4 py-2.5 rounded-lg border text-sm font-mono ${
                  isDark ? 'bg-slate-900 border-slate-800 text-slate-300' : 'bg-white border-slate-300 text-slate-700'
                }`}
              >
                <span className="flex items-center gap-2">
                  <Search className="w-4 h-4 text-cyan-400" />
                  Suchen in nexuzcode.de...
                </span>
                <kbd className="text-[10px] px-1.5 py-0.5 bg-slate-800 rounded text-slate-400 border border-slate-700">ESC</kbd>
              </button>
            </div>

            {navItems.map((item) => {
              const isActive = currentTab === item.id;
              return (
                <button
                  id={`mobile-nav-${item.id}`}
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-base font-medium transition-all ${
                    isActive
                      ? isDark
                        ? 'bg-cyan-950/60 border border-cyan-400/50 text-cyan-300 shadow-[0_0_10px_rgba(0,243,255,0.3)]'
                        : 'bg-cyan-100/70 border border-cyan-400 text-cyan-800'
                      : isDark
                        ? 'text-slate-300 hover:bg-slate-900/60 hover:text-cyan-300'
                        : 'text-slate-700 hover:bg-white hover:text-cyan-600'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    {item.label}
                    {item.externalHint && (
                      <span className="text-[11px] font-mono text-slate-400">({item.externalHint})</span>
                    )}
                  </span>
                  {item.badge && (
                    <span className="px-2 py-0.5 text-xs font-mono rounded bg-cyan-500/20 text-cyan-300 border border-cyan-400/30">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}

            <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs font-mono text-slate-400">
              <span>Dark-Mode aktiv: {isDark ? 'Ja' : 'Nein'}</span>
              <button
                id="mobile-dark-mode-switch"
                onClick={onToggleTheme}
                className="px-3 py-1 rounded bg-slate-800 text-cyan-300 border border-cyan-500/30 hover:bg-slate-700"
              >
                Umschalten
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
