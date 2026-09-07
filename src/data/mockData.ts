import { NewsArticle, DownloadItem, ApkMirrorItem, BoardTopic } from '../types';

export const getFormattedCurrentDate = (): string => {
  const date = new Date();
  return date.toLocaleDateString('de-DE', {
    weekday: 'long',
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  });
};

export const getIsoCurrentDate = (): string => {
  const date = new Date();
  return date.toISOString().split('T')[0];
};

export const SITE_INFO = {
  domain: 'nexuzcode.de',
  tagline: 'Hier entsteht eine Internetpräsenz.',
  subline: 'Cyber-gestützte Entwicklungsplattform, Software-Archiv & Community-Nexus.',
  established: '2026',
  boardUrl: 'https://board.nexuzcode.de',
  mirrorUrl: 'https://mirror.nexuzcode.de',
  systemStatus: 'ONLINE / ALL NODES OPERATIONAL',
  serverCluster: 'Frankfurt Core (DE-FRA-01)',
  latency: '14ms',
  encryption: 'TLS 1.3 / AES-256-GCM',
};

export const MOCK_NEWS: NewsArticle[] = [
  {
    id: 'news-1',
    title: 'NexuzCode Netzwerk-Upgrade & Start der neuen Plattform',
    date: getFormattedCurrentDate(),
    category: 'System Core',
    author: 'RootAdmin',
    readTime: '3 Min.',
    excerpt: 'Hier entsteht eine Internetpräsenz: Die grundlegende Infrastruktur von nexuzcode.de wurde erfolgreich auf das neue Hochgeschwindigkeits-Cluster umgestellt.',
    content: 'Willkommen bei nexuzcode.de. Heute, am ' + getFormattedCurrentDate() + ', wurde die Basis unserer Plattform fertiggestellt. Hier entsteht eine moderne Internetpräsenz mit integriertem APK-Mirror (mirror.nexuzcode.de), Entwickler-Downloads und direktem Anschluss an unser Community-Board (board.nexuzcode.de). Sämtliche Knotenpunkte operieren mit minimaler Latenz und höchster Verschlüsselung.',
    tags: ['Announcement', 'Release', 'nexuzcode.de', 'Core']
  },
  {
    id: 'news-2',
    title: 'Neues Mirror-Storage Node für APK-Verteilung aktiv',
    date: 'Gestern',
    category: 'Infrastruktur',
    author: 'DevOps Unit',
    readTime: '2 Min.',
    excerpt: 'Unter mirror.nexuzcode.de steht ab sofort eine verbesserte Bandbreiten-Anbindung für mobile Pakete und Android-Builds bereit.',
    content: 'Um kontinuierlich schnelle Downloads sicherzustellen, haben wir unser Mirror-Subsystem erweitert. mirror.nexuzcode.de liefert verifizierte APKs mit kryptografischen SHA-256 Signaturen und automatischem Hash-Vergleich aus.',
    tags: ['Mirror', 'APK', 'CDN', 'Storage']
  },
  {
    id: 'news-3',
    title: 'Community Board Migration auf board.nexuzcode.de',
    date: 'Vor 3 Tagen',
    category: 'Community',
    author: 'Moderation',
    readTime: '4 Min.',
    excerpt: 'Das Board-Portal wurde modernisiert. Diskussionen, Dev-Logs und technischer Support laufen ab sofort über board.nexuzcode.de.',
    content: 'Unser Forum unter board.nexuzcode.de bietet Kanäle für Softwareentwicklung, Reverse Engineering, Android Toolchains und allgemeinen Tech-Austausch. Ein nahtloser Zugang ist nun direkt über die obere Menüleiste verfügbar.',
    tags: ['Board', 'Community', 'Forum']
  }
];

export const MOCK_DOWNLOADS: DownloadItem[] = [
  {
    id: 'dl-1',
    name: 'Nexuz CLI Toolchain',
    version: 'v2.4.1',
    description: 'Kommandozeilen-Suite zur schnellen Verwaltung, Hash-Prüfung und Bereitstellung von Repositories auf nexuzcode.de.',
    category: 'tool',
    size: '18.4 MB',
    releaseDate: getFormattedCurrentDate(),
    downloadsCount: 1420,
    platforms: ['Linux (x64)', 'Windows (x64)', 'macOS (Apple Silicon)'],
    filename: 'nexuz-cli-2.4.1-amd64.tar.gz',
    sha256: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855'
  },
  {
    id: 'dl-2',
    name: 'Nexuz Cyber Terminal Theme Pack',
    version: 'v1.0.8',
    description: 'Hochwertige Cyberpunk- und Neon-Farbprofile für Windows Terminal, Alacritty, Kitty und iTerm2.',
    category: 'utility',
    size: '2.1 MB',
    releaseDate: 'Vor 4 Tagen',
    downloadsCount: 3890,
    platforms: ['Cross-Platform'],
    filename: 'nexuz-neon-themes.zip',
    sha256: '9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08'
  },
  {
    id: 'dl-3',
    name: 'HashVerifier & Integrity Daemon',
    version: 'v3.1.0',
    description: 'Leichtgewichtiger Daemon zur schnellen Integritätsprüfung heruntergeladener APKs und Software-Pakete.',
    category: 'tool',
    size: '8.7 MB',
    releaseDate: 'Vor 1 Woche',
    downloadsCount: 820,
    platforms: ['Linux', 'Windows', 'Android (Termux)'],
    filename: 'nexuz-verifier-v3.1.0.exe',
    sha256: '5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8'
  },
  {
    id: 'dl-4',
    name: 'Nexuz FastSync Client',
    version: 'v1.3.0',
    description: 'Multi-threaded Download-Manager mit automatischer Umschaltung auf den schnellsten nexuzcode.de Mirror-Node.',
    category: 'client',
    size: '24.6 MB',
    releaseDate: 'Vor 2 Wochen',
    downloadsCount: 5120,
    platforms: ['Windows', 'Linux', 'macOS'],
    filename: 'nexuz-fastsync-desktop-setup.exe',
    sha256: '4b227777d4dd1fc61c6f884f48641d02b4d121d3fd328cb08b5531fcacdabf8a'
  }
];

export const MOCK_APK_MIRRORS: ApkMirrorItem[] = [
  {
    id: 'apk-1',
    appName: 'Nexuz Mobile Hub',
    packageName: 'de.nexuzcode.mobilehub',
    version: 'v3.8.2-release',
    versionCode: 382,
    arch: 'arm64-v8a, armeabi-v7a',
    minAndroid: 'Android 10.0+ (API 29)',
    releaseDate: getFormattedCurrentDate(),
    fileSize: '42.8 MB',
    sha256: '7d793037a0760186574b0282f2f435e7',
    verified: true,
    downloads: 12940,
    mirrors: [
      {
        nodeId: 'node-fra',
        name: 'Frankfurt Central (mirror.nexuzcode.de)',
        region: 'Germany / EU-West',
        latency: '12ms',
        status: 'online',
        directUrl: 'https://mirror.nexuzcode.de/apks/nexuz-mobile-hub-3.8.2.apk'
      },
      {
        nodeId: 'node-ams',
        name: 'Amsterdam Node (ams.mirror.nexuzcode.de)',
        region: 'Netherlands / EU-Central',
        latency: '18ms',
        status: 'online',
        directUrl: 'https://mirror.nexuzcode.de/node2/nexuz-mobile-hub-3.8.2.apk'
      },
      {
        nodeId: 'node-hel',
        name: 'Helsinki FastCache',
        region: 'Finland / EU-North',
        latency: '26ms',
        status: 'online',
        directUrl: 'https://mirror.nexuzcode.de/node3/nexuz-mobile-hub-3.8.2.apk'
      }
    ]
  },
  {
    id: 'apk-2',
    appName: 'CyberTools Android Suite',
    packageName: 'de.nexuzcode.cybertools',
    version: 'v2.1.0',
    versionCode: 210,
    arch: 'universal (arm64, x86_64)',
    minAndroid: 'Android 9.0+ (API 28)',
    releaseDate: 'Vor 3 Tagen',
    fileSize: '19.4 MB',
    sha256: '9b8769a4a742959a2d0298c36fb7064e',
    verified: true,
    downloads: 8730,
    mirrors: [
      {
        nodeId: 'node-fra',
        name: 'Frankfurt Central (mirror.nexuzcode.de)',
        region: 'Germany / EU-West',
        latency: '12ms',
        status: 'online',
        directUrl: 'https://mirror.nexuzcode.de/apks/cybertools-2.1.0.apk'
      },
      {
        nodeId: 'node-backup',
        name: 'Nürnberg Backup Mirror',
        region: 'Germany / South',
        latency: '15ms',
        status: 'online',
        directUrl: 'https://mirror.nexuzcode.de/backup/cybertools-2.1.0.apk'
      }
    ]
  },
  {
    id: 'apk-3',
    appName: 'Nexuz Board Companion',
    packageName: 'de.nexuzcode.boardapp',
    version: 'v1.5.4',
    versionCode: 154,
    arch: 'arm64-v8a',
    minAndroid: 'Android 11.0+ (API 30)',
    releaseDate: 'Vor 1 Woche',
    fileSize: '14.2 MB',
    sha256: '4f53cda18c2baa0c0354bb5f9a3ecbe5',
    verified: true,
    downloads: 4520,
    mirrors: [
      {
        nodeId: 'node-fra',
        name: 'Frankfurt Primary (mirror.nexuzcode.de)',
        region: 'Germany / EU-West',
        latency: '12ms',
        status: 'online',
        directUrl: 'https://mirror.nexuzcode.de/apks/board-companion-1.5.4.apk'
      }
    ]
  },
  {
    id: 'apk-4',
    appName: 'CryptKey Authenticator',
    packageName: 'de.nexuzcode.authenticator',
    version: 'v1.1.2',
    versionCode: 112,
    arch: 'universal',
    minAndroid: 'Android 8.0+ (API 26)',
    releaseDate: 'Vor 2 Wochen',
    fileSize: '7.8 MB',
    sha256: '2c624232cdd221771294dfbb310aca00',
    verified: true,
    downloads: 16800,
    mirrors: [
      {
        nodeId: 'node-fra',
        name: 'Frankfurt Primary (mirror.nexuzcode.de)',
        region: 'Germany / EU-West',
        latency: '14ms',
        status: 'online',
        directUrl: 'https://mirror.nexuzcode.de/apks/authenticator-1.1.2.apk'
      }
    ]
  }
];

export const MOCK_BOARD_TOPICS: BoardTopic[] = [
  {
    id: 'board-1',
    title: '📌 Willkommen auf board.nexuzcode.de – Forenregeln & Leitfaden',
    category: 'Ankündigungen',
    replies: 128,
    views: 8940,
    lastActivity: 'Vor 12 Min.',
    author: 'Administrator',
    authorBadge: 'Root Staff',
    pinned: true
  },
  {
    id: 'board-2',
    title: 'APK-Mirror Release Diskussion: Neue Uploads & Feature-Wünsche',
    category: 'Mirror Feedback',
    replies: 45,
    views: 2410,
    lastActivity: 'Vor 35 Min.',
    author: 'CyberAndroid',
    authorBadge: 'Power User'
  },
  {
    id: 'board-3',
    title: 'nexuzcode.de Serverinfrastruktur & Latenz-Optimierung',
    category: 'Entwicklung',
    replies: 73,
    views: 3820,
    lastActivity: 'Vor 1 Stunde',
    author: 'ZeroCool',
    authorBadge: 'Dev Unit'
  },
  {
    id: 'board-4',
    title: 'Dark-Mode Theme Engine & CSS Glow Styling Showroom',
    category: 'Design & Frontend',
    replies: 89,
    views: 4500,
    lastActivity: 'Vor 2 Stunden',
    author: 'NeonCoder',
    authorBadge: 'Designer'
  },
  {
    id: 'board-5',
    title: 'Sicherheitsprüfungen & Signaturverifikation unter mirror.nexuzcode.de',
    category: 'Security',
    replies: 32,
    views: 1980,
    lastActivity: 'Vor 4 Stunden',
    author: 'CryptoSec',
    authorBadge: 'Sec Researcher'
  }
];

export const BOARD_CATEGORIES = [
  { name: 'Ankündigungen & Neuigkeiten', count: 18, desc: 'Offizielle Mitteilungen von nexuzcode.de' },
  { name: 'APK-Mirror & Downloads', count: 142, desc: 'Support und Updates zu mirror.nexuzcode.de' },
  { name: 'Entwicklung & Tools', count: 87, desc: 'Quellcode, APIs und Werkzeuge' },
  { name: 'Community & Off-Topic', count: 320, desc: 'Freier Austausch der Community' }
];
