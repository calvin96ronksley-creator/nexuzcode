export type NavTab = 'home' | 'news' | 'board' | 'downloads' | 'mirrors';

export type ThemeMode = 'dark' | 'light';

export interface NewsArticle {
  id: string;
  title: string;
  date: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  readTime: string;
  tags: string[];
}

export interface DownloadItem {
  id: string;
  name: string;
  version: string;
  description: string;
  category: 'tool' | 'framework' | 'client' | 'utility' | 'config';
  size: string;
  releaseDate: string;
  downloadsCount: number;
  platforms: string[];
  filename: string;
  sha256: string;
}

export interface ApkMirrorItem {
  id: string;
  appName: string;
  packageName: string;
  version: string;
  versionCode: number;
  arch: string;
  minAndroid: string;
  releaseDate: string;
  fileSize: string;
  sha256: string;
  verified: boolean;
  downloads: number;
  mirrors: {
    nodeId: string;
    name: string;
    region: string;
    latency: string;
    status: 'online' | 'busy' | 'syncing';
    directUrl: string;
  }[];
}

export interface BoardTopic {
  id: string;
  title: string;
  category: string;
  replies: number;
  views: number;
  lastActivity: string;
  author: string;
  authorBadge: string;
  pinned?: boolean;
}

export interface SearchResultItem {
  id: string;
  title: string;
  description: string;
  category: string;
  tab: NavTab;
  badge?: string;
  url?: string;
}
