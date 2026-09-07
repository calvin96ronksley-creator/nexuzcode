import React, { useState } from 'react';
import { 
  Smartphone, 
  ExternalLink, 
  Download, 
  ShieldCheck, 
  HardDrive, 
  Copy, 
  Check, 
  Calendar, 
  QrCode, 
  Server, 
  Cpu, 
  Wifi, 
  Search,
  ArrowUpRight
} from 'lucide-react';
import { MOCK_APK_MIRRORS, SITE_INFO, getFormattedCurrentDate } from '../data/mockData';
import { ApkMirrorItem } from '../types';

interface MirrorsPageProps {
  isDark: boolean;
}

export const MirrorsPage: React.FC<MirrorsPageProps> = ({ isDark }) => {
  const [copiedHash, setCopiedHash] = useState<string | null>(null);
  const [selectedApkForQr, setSelectedApkForQr] = useState<ApkMirrorItem | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [downloadProgress, setDownloadProgress] = useState<{ [id: string]: number }>({});
  const [selectedMirrorNode, setSelectedMirrorNode] = useState('node-fra');

  const copyHash = (hash: string) => {
    navigator.clipboard.writeText(hash);
    setCopiedHash(hash);
    setTimeout(() => setCopiedHash(null), 2000);
  };

  const handleApkDownload = (apk: ApkMirrorItem) => {
    // Animate download simulation and trigger download
    setDownloadProgress(prev => ({ ...prev, [apk.id]: 20 }));
    const timer = setInterval(() => {
      setDownloadProgress(prev => {
        const current = prev[apk.id] || 0;
        if (current >= 100) {
          clearInterval(timer);
          // Trigger file download
          const blob = new Blob([`APK Binary Header for ${apk.appName} (${apk.version})\nPackage: ${apk.packageName}\nMirror: mirror.nexuzcode.de\nSHA-256: ${apk.sha256}`], { type: 'application/vnd.android.package-archive' });
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = `${apk.packageName}-${apk.version}.apk`;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          URL.revokeObjectURL(url);
          return { ...prev, [apk.id]: 0 };
        }
        return { ...prev, [apk.id]: current + 30 };
      });
    }, 180);
  };

  const filteredApks = MOCK_APK_MIRRORS.filter(apk => 
    apk.appName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    apk.packageName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    apk.arch.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-8 pb-16">
      
      {/* Page Header */}
      <div className={`p-6 sm:p-8 rounded-2xl border transition-all ${
        isDark 
          ? 'bg-gradient-to-b from-[#091024] to-[#070b16] border-cyan-500/30 neon-border-cyan' 
          : 'bg-gradient-to-b from-cyan-50 to-white border-cyan-200 shadow-md'
      }`}>
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/40 bg-cyan-950/30 text-cyan-300 text-xs font-mono">
              <Calendar className="w-3.5 h-3.5 text-cyan-400" />
              <span>HEUTIGES DATUM: {getFormattedCurrentDate()}</span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-cyber font-black tracking-wider uppercase">
              APK MIRROR HUB
            </h1>

            {/* Mandatory text: Hier entsteht eine Internetpräsenz. */}
            <div className="py-1.5 px-3 rounded-lg border border-cyan-500/20 bg-cyan-950/30 inline-block">
              <p className="text-sm font-bold text-cyan-300 font-cyber">
                + Hier entsteht eine Internetpräsenz auf mirror.nexuzcode.de
              </p>
            </div>

            <p className="text-xs sm:text-sm text-slate-400 max-w-xl">
              Offizieller Hochgeschwindigkeits-Spiegelserver für mobile Android-Pakete (APKs). Alle Downloads stammen direkt aus verifizierten Quellen auf <strong className="text-cyan-300 font-mono">mirror.nexuzcode.de</strong>.
            </p>
          </div>

          {/* Primary Action Button to mirror.nexuzcode.de */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto">
            <a
              id="open-mirror-subdomain-btn"
              href={SITE_INFO.mirrorUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-cyber font-bold text-sm tracking-wider flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(0,243,255,0.5)] hover:shadow-[0_0_35px_rgba(0,243,255,0.8)] transition-all transform hover:-translate-y-0.5 cursor-pointer text-center"
            >
              <span>mirror.nexuzcode.de öffnen</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Server Nodes & Live Status */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-6 pt-6 border-t border-slate-800/80 text-xs font-mono">
          <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800 flex items-center justify-between">
            <div>
              <span className="text-slate-500 block">Primärer CDN-Knoten</span>
              <span className="text-cyan-300 font-bold">mirror.nexuzcode.de</span>
            </div>
            <span className="flex items-center gap-1 text-emerald-400 font-bold">
              <Wifi className="w-3.5 h-3.5" /> 12ms
            </span>
          </div>

          <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800 flex items-center justify-between">
            <div>
              <span className="text-slate-500 block">Signatur-Verifikation</span>
              <span className="text-slate-200 font-bold">SHA-256 & V2/V3 Sign</span>
            </div>
            <ShieldCheck className="w-4 h-4 text-cyan-400" />
          </div>

          <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800 flex items-center justify-between">
            <div>
              <span className="text-slate-500 block">Bandbreiten-Kapazität</span>
              <span className="text-slate-200 font-bold">10 GBit/s Unmetered</span>
            </div>
            <HardDrive className="w-4 h-4 text-fuchsia-400" />
          </div>
        </div>
      </div>

      {/* APK Search & Filter Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-cyan-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            id="apk-search-input"
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Pakete oder Versionen filtern..."
            className={`w-full pl-9 pr-4 py-2 rounded-xl text-xs font-mono border outline-none transition-colors ${
              isDark 
                ? 'bg-[#080d1a] border-slate-800 text-slate-100 focus:border-cyan-400' 
                : 'bg-white border-slate-300 text-slate-900 focus:border-cyan-500'
            }`}
          />
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-slate-400 self-end sm:self-auto">
          <span>Mirror Node:</span>
          <select 
            id="mirror-node-select"
            value={selectedMirrorNode} 
            onChange={(e) => setSelectedMirrorNode(e.target.value)}
            className="bg-slate-900 border border-slate-800 text-cyan-300 rounded px-2.5 py-1 text-xs outline-none"
          >
            <option value="node-fra">Frankfurt Central (mirror.nexuzcode.de)</option>
            <option value="node-ams">Amsterdam Node (ams.mirror.nexuzcode.de)</option>
            <option value="node-hel">Helsinki FastCache</option>
          </select>
        </div>
      </div>

      {/* APK Cards List */}
      <div className="space-y-4">
        {filteredApks.map((apk) => {
          const isDownloading = (downloadProgress[apk.id] || 0) > 0;
          const progress = downloadProgress[apk.id] || 0;

          return (
            <div
              id={`apk-card-${apk.id}`}
              key={apk.id}
              className={`p-6 rounded-2xl border transition-all duration-200 ${
                isDark 
                  ? 'bg-[#080d1a] border-slate-800 hover:border-cyan-500/60 hover:shadow-[0_0_20px_rgba(0,243,255,0.15)]' 
                  : 'bg-white border-slate-200 hover:border-cyan-500/50 hover:shadow-md'
              }`}
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                
                {/* APK Information */}
                <div className="space-y-3 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <div className="p-2 rounded-lg bg-cyan-950/40 border border-cyan-500/30 text-cyan-400">
                      <Smartphone className="w-5 h-5" />
                    </div>
                    <h3 className="text-xl font-cyber font-bold text-slate-100 dark:text-white">
                      {apk.appName}
                    </h3>
                    <span className="px-2 py-0.5 text-xs font-mono rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                      {apk.version}
                    </span>
                    <span className="px-2 py-0.5 text-xs font-mono rounded bg-slate-800 text-slate-300 border border-slate-700">
                      {apk.fileSize}
                    </span>
                  </div>

                  {/* Metadata Chips */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px] font-mono text-slate-400">
                    <div className="p-2 rounded bg-slate-900/50 border border-slate-800">
                      <span className="text-slate-500 block">Package ID</span>
                      <span className="text-slate-200 truncate block">{apk.packageName}</span>
                    </div>

                    <div className="p-2 rounded bg-slate-900/50 border border-slate-800">
                      <span className="text-slate-500 block">Architektur</span>
                      <span className="text-cyan-400 truncate block">{apk.arch}</span>
                    </div>

                    <div className="p-2 rounded bg-slate-900/50 border border-slate-800">
                      <span className="text-slate-500 block">Min. Android</span>
                      <span className="text-slate-200 truncate block">{apk.minAndroid}</span>
                    </div>

                    <div className="p-2 rounded bg-slate-900/50 border border-slate-800">
                      <span className="text-slate-500 block">Downloads</span>
                      <span className="text-emerald-400 truncate block">{apk.downloads.toLocaleString('de-DE')}</span>
                    </div>
                  </div>

                  {/* Checksum SHA256 */}
                  <div className="flex items-center gap-2 p-2 rounded-lg bg-slate-900/70 border border-slate-800/80 font-mono text-[11px] text-slate-400 max-w-xl">
                    <span className="text-cyan-400 font-semibold shrink-0">SHA256:</span>
                    <span className="truncate">{apk.sha256}</span>
                    <button
                      id={`copy-hash-btn-${apk.id}`}
                      onClick={() => copyHash(apk.sha256)}
                      className="ml-auto shrink-0 p-1 hover:text-cyan-300 transition-colors cursor-pointer"
                      title="SHA-256 Prüfsumme kopieren"
                    >
                      {copiedHash === apk.sha256 ? (
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Actions & QR Trigger */}
                <div className="shrink-0 flex flex-col sm:flex-row lg:flex-col items-stretch sm:items-center lg:items-end justify-center gap-2.5">
                  <button
                    id={`download-apk-btn-${apk.id}`}
                    onClick={() => handleApkDownload(apk)}
                    disabled={isDownloading}
                    className={`px-6 py-3 rounded-xl font-cyber font-bold text-xs tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer ${
                      isDownloading
                        ? 'bg-cyan-950 text-cyan-300 border border-cyan-400/50'
                        : 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 shadow-[0_0_20px_rgba(0,243,255,0.4)] hover:shadow-[0_0_30px_rgba(0,243,255,0.7)]'
                    }`}
                  >
                    <Download className="w-4 h-4" />
                    <span>
                      {isDownloading ? `Wird geladen (${progress}%)...` : 'APK Herunterladen'}
                    </span>
                  </button>

                  <div className="flex items-center gap-2">
                    <button
                      id={`qr-apk-btn-${apk.id}`}
                      onClick={() => setSelectedApkForQr(apk)}
                      className="flex-1 sm:flex-none px-3 py-1.5 rounded-lg border border-slate-700 bg-slate-900/60 hover:border-cyan-400 hover:text-cyan-300 text-xs font-mono text-slate-300 flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <QrCode className="w-3.5 h-3.5" />
                      <span>QR-Code</span>
                    </button>

                    <a
                      href={`${SITE_INFO.mirrorUrl}/apks/${apk.packageName}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 rounded-lg border border-slate-700 hover:border-cyan-400 text-xs font-mono text-slate-400 hover:text-cyan-300 flex items-center gap-1"
                      title="Direkt auf mirror.nexuzcode.de öffnen"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>

                  <div className="text-[10px] font-mono text-slate-500 text-right">
                    Server: mirror.nexuzcode.de
                  </div>
                </div>

              </div>
            </div>
          );
        })}
      </div>

      {/* QR Code Modal for Direct Mobile Scanning */}
      {selectedApkForQr && (
        <div 
          id="apk-qr-modal"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={() => setSelectedApkForQr(null)}
        >
          <div 
            className={`w-full max-w-sm p-6 rounded-2xl border text-center space-y-4 ${
              isDark 
                ? 'bg-[#080d1a] border-cyan-500/40 text-slate-100 neon-border-cyan' 
                : 'bg-white border-slate-300 text-slate-900'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-lg font-cyber font-bold text-cyan-400">
              {selectedApkForQr.appName}
            </h3>
            <p className="text-xs text-slate-400">
              Scanne den Code mit deinem Smartphone für einen Direkt-Download von <strong>mirror.nexuzcode.de</strong>
            </p>

            {/* Generated Cyber QR Visual */}
            <div className="p-4 bg-white rounded-xl inline-block shadow-inner mx-auto">
              <img 
                src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=https://mirror.nexuzcode.de/apks/${encodeURIComponent(selectedApkForQr.packageName)}`}
                alt="QR Code für Download"
                className="w-44 h-44 mx-auto"
              />
            </div>

            <div className="text-xs font-mono text-slate-400">
              <div>Version: {selectedApkForQr.version} ({selectedApkForQr.fileSize})</div>
              <div className="truncate mt-1 text-cyan-400">mirror.nexuzcode.de</div>
            </div>

            <button
              id="close-qr-modal-btn"
              onClick={() => setSelectedApkForQr(null)}
              className="w-full py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-mono font-bold text-slate-200 cursor-pointer"
            >
              Schließen
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
