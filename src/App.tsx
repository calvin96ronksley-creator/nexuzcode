/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { NavTab, ThemeMode } from './types';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { CyberBackground } from './components/CyberBackground';
import { SearchModal } from './components/SearchModal';
import { HomePage } from './pages/HomePage';
import { NewsPage } from './pages/NewsPage';
import { BoardPage } from './pages/BoardPage';
import { DownloadsPage } from './pages/DownloadsPage';
import { MirrorsPage } from './pages/MirrorsPage';

export default function App() {
  const [currentTab, setCurrentTab] = useState<NavTab>('home');
  const [theme, setTheme] = useState<ThemeMode>(() => {
    const saved = localStorage.getItem('nexuz_theme');
    return (saved === 'light' || saved === 'dark') ? saved : 'dark';
  });
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);

  // Sync theme with DOM and localStorage
  useEffect(() => {
    localStorage.setItem('nexuz_theme', theme);
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  // Global Keyboard Shortcuts (Ctrl+K or / to open search)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      } else if (e.key === '/' && !['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const isDark = theme === 'dark';

  return (
    <div 
      id="app-root-wrapper"
      className={`min-h-screen flex flex-col transition-colors duration-500 relative selection:bg-cyan-500 selection:text-black ${
        isDark 
          ? 'bg-[#030712] text-slate-100' 
          : 'bg-slate-50 text-slate-900'
      }`}
    >
      {/* Futuristic Background with animated cyber nodes & scanlines */}
      <CyberBackground theme={theme} />

      {/* Top Header with Centered Horizontal Navigation */}
      <Header
        currentTab={currentTab}
        onTabChange={setCurrentTab}
        theme={theme}
        onToggleTheme={toggleTheme}
        onOpenSearch={() => setIsSearchOpen(true)}
      />

      {/* Main Dynamic View with Smooth Menu Transitions */}
      <main className="flex-1 relative z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentTab}
            initial={{ opacity: 0, y: 12, scale: 0.99 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.99 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="w-full"
          >
            {currentTab === 'home' && (
              <HomePage onNavigate={setCurrentTab} isDark={isDark} />
            )}
            {currentTab === 'news' && (
              <NewsPage isDark={isDark} />
            )}
            {currentTab === 'board' && (
              <BoardPage isDark={isDark} />
            )}
            {currentTab === 'downloads' && (
              <DownloadsPage isDark={isDark} />
            )}
            {currentTab === 'mirrors' && (
              <MirrorsPage isDark={isDark} />
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Intuitive Search Palette Dialog */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onNavigate={setCurrentTab}
        isDark={isDark}
      />

      {/* Bottom Footer */}
      <Footer onNavigate={setCurrentTab} isDark={isDark} />
    </div>
  );
}
