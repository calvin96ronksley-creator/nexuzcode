import React, { useState } from 'react';
import { 
  Download, 
  Terminal, 
  Check, 
  Copy, 
  Calendar, 
  ShieldCheck, 
  HardDrive, 
  FileCheck, 
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { MOCK_DOWNLOADS, getFormattedCurrentDate } from '../data/mockData';
import { DownloadItem } from '../types';

interface DownloadsPageProps {
  isDark: boolean;
}

export const DownloadsPage: React.FC<DownloadsPageProps> = ({ isDark }) => {
  const [copiedSha, setCopiedSha] = useState<string | null>(null);
  const [downloadingId, setDownloadingId] = useState<string | null>(null);
  const [filterCategory, setFilterCategory] = useState<string>('all');

  const copySha = (sha: string) => {
    navigator.clipboard.writeText(sha);
    setCopiedSha(sha);
    setTimeout(() => setCopiedSha(null), 2000);
  };

  const handleDownload = (item: DownloadItem) => {
    setDownloadingId(item.id);
    // Simulate real download handshake / prompt
    setTimeout(() => {
      setDownloadingId(null);
      // Trigger a simulated file download or alert
      const blob = new Blob([`NexuzCode Binary stub for ${item.name} (${item.version})\nSHA256: ${item.sha256}\nGenerated on: ${new Date().toISOString()}`], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = item.filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }, 900);
  };

  const filteredDownloads = filterCategory === 'all'
    ? MOCK_DOWNLOADS
    : MOCK_DOWNLOADS.filter(d => d.category === filterCategory);

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-8 pb-16">
      
      {/* Page Title & Slogan Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/30 bg-emerald-950/20 text-emerald-400 text-xs font-mono">
          <Calendar className="w-3.5 h-3.5" />
          <span>STAND VOM: {getFormattedCurrentDate()}</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-cyber font-black tracking-wider uppercase">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-cyan-300 to-blue-500">
            DOWNLOADS & TOOLS
          </span>
        </h1>

        {/* Required slogan */}
        <div className="p-3 rounded-xl border border-emerald-500/30 bg-emerald-950/10 max-w-xl mx-auto">
          <p className="text-base font-bold text-emerald-300 font-cyber">
            + Hier entsteht eine Internetpräsenz.
          </p>
          <p className="text-xs text-slate-400 mt-0.5">
            Offizielles Software-Repository von nexuzcode.de mit signierten Binaries und Prüfsummen.
          </p>
        </div>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
        {[
          { id: 'all', label: 'Alle Tools' },
          { id: 'tool', label: 'CLI & Werkzeuge' },
          { id: 'client', label: 'Clients & Synchronisation' },
          { id: 'utility', label: 'Themes & Utilities' }
        ].map((cat) => (
          <button
            id={`filter-dl-${cat.id}`}
            key={cat.id}
            onClick={() => setFilterCategory(cat.id)}
            className={`px-4 py-1.5 rounded-full text-xs font-mono transition-all cursor-pointer ${
              filterCategory === cat.id
                ? 'bg-emerald-500/20 border border-emerald-400 text-emerald-300 font-bold shadow-[0_0_12px_rgba(16,185,129,0.3)]'
                : 'border border-slate-800 text-slate-400 hover:border-slate-600 hover:text-slate-200'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Downloads List */}
      <div className="space-y-4">
        {filteredDownloads.map((item) => (
          <div
            id={`download-item-${item.id}`}
            key={item.id}
            className={`p-6 rounded-2xl border transition-all duration-200 ${
              isDark 
                ? 'bg-[#080d1a] border-slate-800 hover:border-emerald-500/60 hover:shadow-[0_0_20px_rgba(16,185,129,0.15)]' 
                : 'bg-white border-slate-200 hover:border-emerald-500/50 hover:shadow-md'
            }`}
          >
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              
              {/* Info Column */}
              <div className="space-y-3 flex-1">
                <div className="flex flex-wrap items-center gap-2.5">
                  <h3 className="text-xl font-cyber font-bold text-slate-100 dark:text-white">
                    {item.name}
                  </h3>
                  <span className="px-2 py-0.5 text-xs font-mono rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    {item.version}
                  </span>
                  <span className="px-2 py-0.5 text-xs font-mono rounded bg-slate-800 text-slate-300 border border-slate-700">
                    {item.size}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-2xl">
                  {item.description}
                </p>

                {/* Platforms & metadata */}
                <div className="flex flex-wrap items-center gap-2 pt-1">
                  {item.platforms.map((p) => (
                    <span key={p} className="px-2 py-0.5 rounded text-[11px] font-mono bg-slate-900 border border-slate-800 text-slate-400">
                      {p}
                    </span>
                  ))}
                  <span className="text-slate-600 text-xs">&bull;</span>
                  <span className="text-[11px] font-mono text-slate-500">
                    {item.downloadsCount.toLocaleString('de-DE')} Downloads
                  </span>
                </div>

                {/* SHA256 Checksum block */}
                <div className="pt-2">
                  <div className="flex items-center gap-2 p-2 rounded-lg bg-slate-900/70 border border-slate-800/80 font-mono text-[11px] text-slate-400 max-w-xl">
                    <span className="text-emerald-400 font-semibold shrink-0">SHA256:</span>
                    <span className="truncate">{item.sha256}</span>
                    <button
                      id={`copy-sha-${item.id}`}
                      onClick={() => copySha(item.sha256)}
                      className="ml-auto shrink-0 p-1 hover:text-emerald-300 transition-colors"
                      title="SHA-256 Prüfsumme kopieren"
                    >
                      {copiedSha === item.sha256 ? (
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* Action Column */}
              <div className="shrink-0 flex flex-col sm:flex-row lg:flex-col items-stretch sm:items-center lg:items-end justify-center gap-2">
                <button
                  id={`download-btn-${item.id}`}
                  onClick={() => handleDownload(item)}
                  disabled={downloadingId === item.id}
                  className={`px-6 py-3 rounded-xl font-cyber font-bold text-xs tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer ${
                    downloadingId === item.id
                      ? 'bg-emerald-950 text-emerald-400 border border-emerald-400/50'
                      : 'bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 shadow-[0_0_20px_rgba(16,185,129,0.4)] hover:shadow-[0_0_25px_rgba(16,185,129,0.7)]'
                  }`}
                >
                  <Download className="w-4 h-4" />
                  <span>
                    {downloadingId === item.id ? 'Download startet...' : 'Herunterladen'}
                  </span>
                </button>

                <div className="text-[11px] font-mono text-slate-500 text-center lg:text-right">
                  <span>Datei: {item.filename}</span>
                </div>
              </div>

            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
