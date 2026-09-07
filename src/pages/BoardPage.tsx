import React, { useState } from 'react';
import { ExternalLink, ShieldCheck, Loader2, AlertCircle } from 'lucide-react';
import { SITE_INFO } from '../data/mockData';

interface BoardPageProps {
  isDark: boolean;
}

export const BoardPage: React.FC<BoardPageProps> = ({ isDark }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  // Fallback timeout in case the iframe refuses connection silently
  React.useEffect(() => {
    const timer = setTimeout(() => {
      if (isLoading) {
        // Just in case it's taking too long, we don't assume error, but we can stop spinning
        // or just let it spin. We'll leave it as is, but it's good practice.
      }
    }, 5000);
    return () => clearTimeout(timer);
  }, [isLoading]);

  return (
    <div className="w-full max-w-[1600px] mx-auto px-2 sm:px-4 py-4 flex flex-col min-h-[calc(100vh-160px)]">
      
      {/* Iframe Header / Toolbar */}
      <div className={`flex items-center justify-between p-3 sm:px-5 rounded-t-xl border-x border-t transition-colors ${
        isDark 
          ? 'bg-[#0e1428] border-purple-500/30' 
          : 'bg-purple-50 border-purple-200'
      }`}>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 text-xs font-mono">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span className={isDark ? 'text-slate-300' : 'text-slate-700'}>
              Sichere Verbindung zu <strong className="text-fuchsia-400">board.nexuzcode.de</strong>
            </span>
          </div>
        </div>

        <a 
          href={SITE_INFO.boardUrl} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="text-xs font-mono text-cyan-500 hover:text-cyan-400 flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 transition-colors"
          title="In neuem Tab öffnen"
        >
          <span className="hidden sm:inline">In neuem Tab öffnen</span>
          <span className="sm:hidden">Öffnen</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>

      {/* Iframe Container */}
      <div className={`relative flex-1 min-h-[70vh] border rounded-b-xl overflow-hidden shadow-xl ${
        isDark 
          ? 'border-purple-500/30 bg-[#060a14]' 
          : 'border-purple-200 bg-white'
      }`}>
        
        {/* Loading Overlay */}
        {isLoading && !hasError && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-inherit z-10">
            <Loader2 className="w-10 h-10 text-fuchsia-500 animate-spin" />
            <div className="text-sm font-mono text-slate-400 text-center px-4">
              <p>Lade phpBB3 Forum...</p>
              <p className="text-xs mt-2 text-slate-500">
                Falls das Board nicht lädt, wird es möglicherweise vom Browser blockiert.
              </p>
            </div>
          </div>
        )}

        {/* Error State Overlay */}
        {hasError && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-inherit z-10 px-4 text-center">
            <AlertCircle className="w-12 h-12 text-rose-500" />
            <h3 className="font-cyber text-lg text-slate-200">Verbindung fehlgeschlagen</h3>
            <p className="text-sm font-mono text-slate-400 max-w-md">
              Das Forum kann nicht direkt im Fenster angezeigt werden. Dies passiert, wenn der Server <code>X-Frame-Options</code> gesetzt hat.
            </p>
            <a 
              href={SITE_INFO.boardUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="mt-4 px-6 py-2.5 rounded-lg bg-fuchsia-600 hover:bg-fuchsia-500 text-white font-mono text-sm transition-colors flex items-center gap-2"
            >
              Im neuen Fenster öffnen <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        )}

        {/* The actual iframe */}
        <iframe
          src={SITE_INFO.boardUrl}
          title="NexuzCode phpBB3 Board"
          className="w-full h-full border-none relative z-20"
          onLoad={() => setIsLoading(false)}
          onError={() => {
            setIsLoading(false);
            setHasError(true);
          }}
          sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
        />
      </div>
    </div>
  );
};
